"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Brain, Lightbulb, TrendingUp, Heart, Target, BookOpen } from "lucide-react"

export default function InsightsPage() {
  const router = useRouter()
  const params = useParams()
  const [entry, setEntry] = useState(null)
  const [aiInsights, setAiInsights] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockEntries = {
      "1": {
        id: "1",
        date: "2024-01-15",
        time: "14:30",
        title: "Reflections on Growth",
        content: `Today I spent time thinking about my personal development journey. The challenges I've faced recently have taught me valuable lessons about resilience and patience. It's fascinating how obstacles can become stepping stones when we shift our perspective.

I've been reflecting on the setbacks I encountered last month and how they initially felt overwhelming. But now, looking back, I can see how each challenge forced me to develop new skills and discover inner strength I didn't know I possessed. The project that seemed impossible at first became a catalyst for learning new technologies and collaborating with amazing people.

What strikes me most is how my definition of success has evolved. It's no longer just about achieving specific outcomes, but about the person I become through the process. Every failure has taught me something valuable, and every small victory has built my confidence.

I'm grateful for the support system I have - friends who listen without judgment, mentors who offer wisdom, and family who believe in me even when I don't believe in myself. Their encouragement has been instrumental in helping me see challenges as opportunities rather than roadblocks.

Moving forward, I want to embrace uncertainty with more courage and approach difficulties with curiosity rather than fear. Growth happens in the uncomfortable spaces, and I'm learning to find peace in that discomfort.`,
        mood: "Thoughtful",
        tags: ["personal-growth", "reflection", "resilience"],
        wordCount: 234,
      }
    }

    const mockAiInsights = {
      "1": {
        overallSentiment: "Positive & Reflective",
        emotionalTone: "Optimistic with undertones of gratitude",
        keyThemes: [
          {
            theme: "Personal Growth",
            confidence: 95,
            description: "Strong focus on self-development and learning from challenges"
          },
          {
            theme: "Resilience",
            confidence: 88,
            description: "Emphasis on overcoming obstacles and building inner strength"
          },
          {
            theme: "Gratitude",
            confidence: 82,
            description: "Appreciation for support system and life experiences"
          },
          {
            theme: "Mindset Shift",
            confidence: 90,
            description: "Evolution in thinking about success and challenges"
          }
        ],
        insights: [
          {
            type: "strength",
            title: "Growth Mindset",
            description: "You demonstrate a strong growth mindset by viewing challenges as opportunities for development rather than obstacles."
          },
          {
            type: "pattern",
            title: "Reflective Processing",
            description: "Your writing shows a healthy pattern of processing experiences through reflection and finding meaning in difficulties."
          },
          {
            type: "recommendation",
            title: "Continue Building Support Networks",
            description: "Your acknowledgment of your support system's importance suggests continuing to nurture these relationships will benefit your growth journey."
          }
        ],
        emotionalJourney: [
          { emotion: "Overwhelmed", intensity: 75, phase: "Initial Challenge" },
          { emotion: "Determined", intensity: 85, phase: "Learning Phase" },
          { emotion: "Grateful", intensity: 90, phase: "Reflection Phase" },
          { emotion: "Optimistic", intensity: 88, phase: "Future Outlook" }
        ],
        suggestedActions: [
          "Continue journaling about challenges and growth",
          "Express gratitude to your support system",
          "Set new learning goals that push your comfort zone",
          "Document specific skills gained from recent challenges"
        ]
      }
    }

    // Simulate API loading
    setTimeout(() => {
      setEntry(mockEntries[params.id])
      setAiInsights(mockAiInsights[params.id])
      setLoading(false)
    }, 1000)
  }, [params.id])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    })
  }

  const getMoodColor = (mood) => {
    const moodColors = {
      Thoughtful: "badge-secondary",
      Grateful: "badge-success",
      Inspired: "badge-warning",
      Curious: "badge-info",
      Contemplative: "badge-primary",
    }
    return moodColors[mood] || "badge-neutral"
  }

  const getInsightIcon = (type) => {
    switch(type) {
      case "strength": return <TrendingUp className="w-5 h-5" />
      case "pattern": return <Brain className="w-5 h-5" />
      case "recommendation": return <Target className="w-5 h-5" />
      default: return <Lightbulb className="w-5 h-5" />
    }
  }

  const getInsightColor = (type) => {
    switch(type) {
      case "strength": return "border-success bg-success/10"
      case "pattern": return "border-info bg-info/10"
      case "recommendation": return "border-warning bg-warning/10"
      default: return "border-primary bg-primary/10"
    }
  }

  if (loading) {
    return (
      <main data-theme="sunset" className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
        <div className="mx-auto max-w-4xl px-4 py-6 md:py-10">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <span className="loading loading-spinner loading-lg text-accent"></span>
              <p className="mt-4 text-base-content/70">Loading insights...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!entry) {
    return (
      <main data-theme="sunset" className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
        <div className="mx-auto max-w-4xl px-4 py-6 md:py-10">
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-base-content/40" />
            <h2 className="text-2xl font-bold text-base-content mb-2">Entry Not Found</h2>
            <p className="text-base-content/70 mb-6">The journal entry you&apos;re looking for doesn&apos;t exist.</p>
            <button 
              className="btn btn-accent"
              onClick={() => router.push('/history')}
            >
              Back to History
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main data-theme="sunset" className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 text-base-content">
      <div className="mx-auto max-w-4xl px-4 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8">
          <button 
            className="btn btn-ghost btn-sm mb-4"
            onClick={() => router.push('/history')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to History
          </button>
          
          <div className="text-center">
            <div className="badge badge-accent badge-lg mb-2">Journal Insights</div>
            <h1 className="text-2xl font-bold text-base-content md:text-3xl mb-2">
              {entry.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-base-content/70 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(entry.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{entry.time}</span>
              </div>
              <div className={`badge ${getMoodColor(entry.mood)}`}>
                {entry.mood}
              </div>
            </div>
          </div>
        </header>

        {/* Original Entry */}
        <section className="mb-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between mb-6">
                <h2 className="card-title text-xl">
                  <BookOpen className="w-5 h-5" />
                  Original Entry
                </h2>
                <div className="flex items-center gap-2">
                  {entry.tags.map((tag, index) => (
                    <span key={index} className="badge badge-outline badge-sm">
                      #{tag}
                    </span>
                  ))}
                  <div className="badge badge-ghost badge-sm">
                    {entry.wordCount} words
                  </div>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none text-base-content/90">
                {entry.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI Insights */}
        {aiInsights && (
          <section>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl mb-6">
                  <Brain className="w-6 h-6 text-accent" />
                  AI-Generated Insights
                </h2>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title">Overall Sentiment</div>
                    <div className="stat-value text-lg text-accent">{aiInsights.overallSentiment}</div>
                    <div className="stat-desc">{aiInsights.emotionalTone}</div>
                  </div>
                  <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title">Key Themes Identified</div>
                    <div className="stat-value text-lg text-accent">{aiInsights.keyThemes.length}</div>
                    <div className="stat-desc">Major topics detected</div>
                  </div>
                </div>

                {/* Key Themes */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Key Themes
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiInsights.keyThemes.map((theme, index) => (
                      <div key={index} className="card bg-base-200 border border-base-300">
                        <div className="card-body p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{theme.theme}</h4>
                            <div className="badge badge-accent">{theme.confidence}%</div>
                          </div>
                          <p className="text-sm text-base-content/70">{theme.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insights */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Personal Insights
                  </h3>
                  <div className="space-y-4">
                    {aiInsights.insights.map((insight, index) => (
                      <div key={index} className={`card border-l-4 ${getInsightColor(insight.type)}`}>
                        <div className="card-body p-4">
                          <div className="flex items-start gap-3">
                            <div className="text-accent">
                              {getInsightIcon(insight.type)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-2">{insight.title}</h4>
                              <p className="text-base-content/80">{insight.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emotional Journey */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Emotional Journey</h3>
                  <div className="space-y-3">
                    {aiInsights.emotionalJourney.map((emotion, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium">{emotion.phase}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{emotion.emotion}</span>
                            <span className="text-xs text-base-content/60">{emotion.intensity}%</span>
                          </div>
                          <progress 
                            className="progress progress-accent w-full" 
                            value={emotion.intensity} 
                            max="100"
                          ></progress>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggested Actions */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Suggested Actions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {aiInsights.suggestedActions.map((action, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                        <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                        <span className="text-sm">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}