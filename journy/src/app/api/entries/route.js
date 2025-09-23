"use server";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";
import connectToDb from "../../../../lib/mongoose"; // <-- Import Mongoose connection
import JournalEntry from "../../../../models/JournalEntry"; // <-- Import Mongoose model

export async function POST(req) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const client = new OpenAI({
    baseURL: process.env.OPEN_AI_ENDPOINT,
    apiKey: process.env.OPEN_AI_API_KEY,
    defaultHeaders: { "api-key": process.env.OPEN_AI_API_KEY },
    defaultQuery: { "api-version": "2024-02-01" },
  });

  try {
    const { entryText } = await req.json();
    if (!entryText) {
      return new NextResponse(
        JSON.stringify({ error: "Entry text is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Connect to the database
    await connectToDb();

    // Save the initial entry using Mongoose
    const initialEntry = await JournalEntry.create({
      userId: userId,
      content: entryText,
      // status is set by default in the model
    });

    const prompt = `
        Analyze the following journal entry and return a JSON object with the following keys:

        1. "summary" – A concise summary of the journal entry, highlighting important events, emotions, and activities. Keep it under 5 sentences.

        2. "mood" – Identify the user's overall mood and emotional tone. Include:
        - main emotional state (e.g., anxious, content, frustrated, motivated),
        - contributing factors (events, habits, interactions),
        - intensity (low, medium, high).

        3. "habits_and_patterns" – Detect any recurring behaviors, lifestyle habits, or potential patterns that influence mental health. For example: 
        - poor sleep hygiene (late-night phone use, difficulty sleeping),
        - excessive screen time,
        - lack of social interaction,
        - irregular meals,
        - positive habits (exercise, journaling, gratitude, social connection).

        4. "concerns" – Highlight potential warning signs for wellbeing (e.g., prolonged sadness, signs of stress, difficulty focusing, isolation). Do not diagnose. Phrase concerns gently.

        5. "suggestions" – Give 2–3 personalized, actionable suggestions to improve wellbeing, build on positive habits, or address challenges. Keep them simple, practical, and encouraging.

        Always respond ONLY in a valid JSON format with these exact keys: "summary", "mood", "habits_and_patterns", "concerns", "suggestions".

        Journal Entry:
        ${entryText}
        `;

    const result = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a journaling analysis assistant. Always respond ONLY in a valid JSON object with the keys: summary, mood, and suggestions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "JOURNY-PT",
      response_format: { type: "json_object" },
    });

    const analysisText = result.choices[0]?.message?.content;

    if (!analysisText) {
      throw new Error("Received an empty analysis from the AI model.");
    }

    const analysisObject = JSON.parse(analysisText);

    // Update the record using Mongoose's findByIdAndUpdate
    const updatedEntry = await JournalEntry.findByIdAndUpdate(
      initialEntry._id, // Mongoose uses _id for the primary key
      {
        analysis: analysisObject,
        status: "COMPLETED",
      },
      { new: true } // This option returns the updated document
    );

    return NextResponse.json({
      report: updatedEntry.analysis,
      entryId: updatedEntry.id,
    });
  } catch (error) {
    console.error("Error during entry analysis:", error);
    const errorMessage = error.response ? error.response.data : error.message;
    const errorStatus = error.status || 500;

    return new NextResponse(
      JSON.stringify({
        error: "Failed to analyze entry.",
        details: errorMessage,
      }),
      {
        status: errorStatus,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

  export async function GET() {
    const { userId } = await auth();
  
    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    try {
      // Connect to the database
      await connectToDb();
  
      // Fetch all entries for the user. Sorting is done in the app layer
      // as a workaround for the Cosmos DB indexing error.
      const unsorted_entries = await JournalEntry.find({ userId: userId });
  
      // Manually sort the entries by date in descending order.
      const all_entries = unsorted_entries.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
  
      return NextResponse.json(all_entries);
    } catch (error) {
      console.error("Error fetching entries:", error);
      return new NextResponse(
        JSON.stringify({ error: "Failed to fetch entries." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
  



export async function DELETE(req) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { searchParams } = new URL(req.url);
    const entryId = searchParams.get("id");

    if (!entryId) {
      return new NextResponse(
        JSON.stringify({ error: "Entry ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await connectToDb();

    const deletedEntry = await JournalEntry.findOneAndDelete({
      _id: entryId,
      userId: userId,
    });

    if (!deletedEntry) {
      return new NextResponse(
        JSON.stringify({ error: "Entry not found or user not authorized" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return NextResponse.json({
      message: "Entry deleted successfully",
      id: deletedEntry._id,
    });
  } catch (error) {
    console.error("Error deleting entry:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete entry" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
