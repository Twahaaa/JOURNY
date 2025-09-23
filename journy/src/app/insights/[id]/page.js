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
    async function fetchData() {
      try {
        const resEntry = await fetch(`/api/entries?id=${params.id}`)
        console.log(params.id)
        if (!resEntry.ok) throw new Error("Failed to fetch entry")
        const entryData = await resEntry.json()

        // Fetch AI insights for this entry
        const resInsights = await fetch(`/api/insights/${params.id}`)
        if (!resInsights.ok) throw new Error("Failed to fetch AI insights")
        const insightsData = await resInsights.json()

        setEntry(entryData)
        setAiInsights(insightsData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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
        {/* 👇 the rest of your UI stays exactly the same as you pasted */}
      </div>
    </main>
  )
}
