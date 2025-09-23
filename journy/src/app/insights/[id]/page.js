"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, BookOpen, Smile, TrendingUp, Brain, AlertTriangle, Lightbulb, Calendar, Clock, Sparkles, FileText } from "lucide-react"

export default function InsightsPage() {
  const router = useRouter()
  const params = useParams()
  const [entry, setEntry] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {

        const res = await fetch(`/api/entries?id=${params.id}`)
        if (!res.ok) throw new Error("Failed to fetch entry")
        const entryData = await res.json()
        console.log(res);
        console.log(entryData);
        setEntry(entryData)
        setAnalysis(entryData.analysis) 
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

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getAnalysisIcon = (type) => {
    const iconClass = "w-5 h-5"
    switch(type) {
      case "summary": return <FileText className={iconClass} />
      case "mood": return <Smile className={iconClass} />
      case "habits_and_patterns": return <Brain className={iconClass} />
      case "concerns": return <AlertTriangle className={iconClass} />
      case "suggestions": return <Lightbulb className={iconClass} />
      default: return <Sparkles className={iconClass} />
    }
  }

  const getAnalysisColor = (type) => {
    switch(type) {
      case "summary": return "border-secondary/20 bg-warning/5"
      case "mood": return "border-secondary/20 bg-secondary/5"
      case "habits_and_patterns": return "border-info/20 bg-info/5"  
      case "concerns": return "border-warning/20 bg-warning/5"
      case "suggestions": return "border-success/20 bg-success/5"
      default: return "border-neutral/20 bg-neutral/5"
    }
  }

  const getAnalysisTitle = (type) => {
    switch(type) {
      case "summary": return "Summary"
      case "mood": return "Mood"
      case "habits_and_patterns": return "Habits & Patterns"
      case "concerns": return "Concerns"
      case "suggestions": return "Suggestions"
      default: return type
    }
  }

  if (loading) {
    return (
      <main data-theme="sunset" className="min-h-screen bg-base-100">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="mt-4 text-base-content/70">Loading insights...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!entry) {
    return (
      <main data-theme="sunset" className="min-h-screen bg-base-100">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="text-center py-20">
            <BookOpen className="w-20 h-20 mx-auto mb-6 text-base-content/30" />
            <h2 className="text-3xl font-bold text-base-content mb-4">Entry Not Found</h2>
            <p className="text-base-content/70 mb-8 text-lg">The journal entry you&apos;re looking for doesn&apos;t exist.</p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => router.push('/history')}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to History
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main data-theme="sunset" className="min-h-screen bg-base-100">
      <div className="border-b border-base-300">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <button
            className="btn btn-ghost btn-sm mb-4 text-base-content/70 hover:text-base-content"
            onClick={() => router.push('/history')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to History
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-base-content mb-2">
                Journal Analysis
              </h1>
              <p className="text-base-content/70 text-lg">
                AI-powered analysis of your journal entry
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-base-content/60">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{formatDate(entry.createdAt || entry.created_at)}</span>
              </div>
              <div className="flex items-center gap-2 text-base-content/60">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{formatTime(entry.createdAt || entry.created_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-12">
          <div className="card bg-info/10 shadow-lg">
            <div className="card-body p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-base-content">
                  Your Journal Entry
                </h2>
              </div>
              
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"></div>
                <div className="pl-6">
                  <blockquote className="text-base-content/90 leading-relaxed text-lg font-medium">
                    {entry.content}
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Section */}
        {analysis && (
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-base-content mb-4">
                AI Analysis
              </h2>
              <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                Here&apos;s what our AI discovered about your journal entry
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(analysis).map(([key, value], index) => (
                <div
                  key={key}
                  className={`card border-2 ${getAnalysisColor(key)} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="card-body p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-base-100 ${
                          key === 'summary' ? 'text-gray-300' :
                          key === 'mood' ? 'text-secondary' :
                          key === 'habits_and_patterns' ? 'text-info' :
                          key === 'concerns' ? 'text-warning' :
                          key === 'suggestions' ? 'text-success' :
                          'text-neutral'
                        }`}>
                          {getAnalysisIcon(key)}
                        </div>
                        <h3 className="text-lg font-semibold text-base-content">
                          {getAnalysisTitle(key)}
                        </h3>
                      </div>
                      <div className="badge badge-outline badge-sm">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <p className="text-base-content/80 leading-relaxed">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action Section - Made Smaller */}
        <div className="mt-12">
          <div className="card  border border-primary/10">
            <div className="card-body text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-gray-300" />
              </div>
              
              <h3 className="text-xl font-bold text-base-content mb-3">
                Continue Your Journey
              </h3>
              <p className="text-base-content/70 mb-6 max-w-md mx-auto">
                Ready to write your next entry?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  className="btn btn-primary rounded-4xl"
                  onClick={() => router.push('/dashboard')}
                >
                  Write New Entry
                </button>
                <button 
                  className="btn btn-outline rounded-4xl"
                  onClick={() => router.push('/history')}
                >
                  View All Entries
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}