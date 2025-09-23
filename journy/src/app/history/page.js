"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ChevronRight, Calendar, Clock, BookOpen } from "lucide-react"

export default function HistoryPage() {
  const router = useRouter()
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const mockEntries = [
      {
        id: "1",
        date: "2024-01-15",
        time: "14:30",
        title: "Reflections on Growth",
        content:
          "Today I spent time thinking about my personal development journey. The challenges I've faced recently have taught me valuable lessons about resilience and patience...",
        mood: "Thoughtful",
        tags: ["personal-growth", "reflection"],
      },
      {
        id: "2",
        date: "2024-01-14",
        time: "09:15",
        title: "Morning Gratitude",
        content:
          "Starting the day with appreciation for the small things. The sunrise was particularly beautiful today, and it reminded me to slow down and notice the world around me...",
        mood: "Grateful",
        tags: ["gratitude", "mindfulness"],
      },
      {
        id: "3",
        date: "2024-01-13",
        time: "16:45",
        title: "Creative Inspiration",
        content:
          "Had an interesting conversation that sparked new ideas for my creative projects. Sometimes the best insights come from unexpected places and casual conversations...",
        mood: "Inspired",
        tags: ["creativity", "inspiration"],
      },
      {
        id: "4",
        date: "2024-01-12",
        time: "11:20",
        title: "Learning Journey",
        content:
          "Discovered something new today that changed my perspective. It's amazing how continuous learning keeps life interesting and helps us grow as individuals...",
        mood: "Curious",
        tags: ["learning", "growth"],
      },
      {
        id: "5",
        date: "2024-01-11",
        time: "13:55",
        title: "Daily Observations",
        content:
          "Noticed patterns in my daily routine that I want to change. Small adjustments can lead to significant improvements in overall well-being and productivity...",
        mood: "Contemplative",
        tags: ["habits", "self-improvement"],
      },
    ]
    setEntries(mockEntries)
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  }

  const truncateContent = (content, maxLength = 150) =>
    content.length <= maxLength ? content : content.substring(0, maxLength) + "..."

  const handleCardClick = (entryId) => router.push(`/insights/${entryId}`)

  const getMoodColor = (mood) => {
    const moodColors = {
      Thoughtful: "bg-purple-600",
      Grateful: "bg-green-600",
      Inspired: "bg-yellow-600",
      Curious: "bg-orange-600",
      Contemplative: "bg-indigo-600",
    }
    return moodColors[mood] || "bg-gray-600"
  }

  return (
    <div className="lg:pt-0 pt-8 min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
            <h1 className="text-4xl font-bold text-white">My Journal</h1>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed">
            A collection of thoughts, reflections, and daily observations. Click on any entry to explore deeper
            insights.
          </p>
        </div>

        <div className="space-y-6">
          {entries.map((entry) => (
            <Card
              key={entry.id}
              className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/20 border border-gray-600/20 bg-gray-600/20 hover:bg-gray-500/20"
              onClick={() => handleCardClick(entry.id)}
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{formatDate(entry.date)}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{entry.time}</span>
                  <div className="ml-auto flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full ${getMoodColor(entry.mood)} text-white text-xs font-medium`}
                    >
                      {entry.mood}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-gray-300 transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{truncateContent(entry.content)}</p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    {entry.tags.map((tag, index) => (
                      <span key={index} className="text-xs text-gray-500 bg-gray-400/20 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-gray-600/20 group-hover:text-white transition-colors text-gray-400"
                  >
                    Read More <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-600/20 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No journal entries yet</h3>
            <p className="text-gray-400">Your thoughts and reflections will appear here once you start journaling.</p>
          </div>
        )}
      </div>
    </div>
  )
}