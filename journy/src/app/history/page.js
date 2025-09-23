"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, Calendar, Clock, BookOpen, Filter, Search } from "lucide-react"

export default function HistoryPage() {
  const router = useRouter()
  const [entries, setEntries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMood, setSelectedMood] = useState("all")

  useEffect(() => {
    const mockEntries = [
      {
        id: "1",
        date: "2024-01-15",
        time: "14:30",
        title: "Reflections on Growth",
        content:
          "Today I spent time thinking about my personal development journey. The challenges I've faced recently have taught me valuable lessons about resilience and patience. It's fascinating how obstacles can become stepping stones when we shift our perspective...",
        mood: "Thoughtful",
        tags: ["personal-growth", "reflection"],
        wordCount: 156,
      },
      {
        id: "2",
        date: "2024-01-14",
        time: "09:15",
        title: "Morning Gratitude",
        content:
          "Starting the day with appreciation for the small things. The sunrise was particularly beautiful today, and it reminded me to slow down and notice the world around me. Sometimes the most profound moments come in quiet simplicity...",
        mood: "Grateful",
        tags: ["gratitude", "mindfulness"],
        wordCount: 89,
      },
      {
        id: "3",
        date: "2024-01-13",
        time: "16:45",
        title: "Creative Inspiration",
        content:
          "Had an interesting conversation that sparked new ideas for my creative projects. Sometimes the best insights come from unexpected places and casual conversations. I'm excited to explore these new directions...",
        mood: "Inspired",
        tags: ["creativity", "inspiration"],
        wordCount: 124,
      },
      {
        id: "4",
        date: "2024-01-12",
        time: "11:20",
        title: "Learning Journey",
        content:
          "Discovered something new today that changed my perspective. It's amazing how continuous learning keeps life interesting and helps us grow as individuals. Every day brings opportunities to expand our understanding...",
        mood: "Curious",
        tags: ["learning", "growth"],
        wordCount: 98,
      },
      {
        id: "5",
        date: "2024-01-11",
        time: "13:55",
        title: "Daily Observations",
        content:
          "Noticed patterns in my daily routine that I want to change. Small adjustments can lead to significant improvements in overall well-being and productivity. It's time to be more intentional about my habits...",
        mood: "Contemplative",
        tags: ["habits", "self-improvement"],
        wordCount: 112,
      },
    ]
    setEntries(mockEntries)
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    })
  }

  const truncateContent = (content, maxLength = 180) =>
    content.length <= maxLength ? content : content.substring(0, maxLength) + "..."

  const handleCardClick = (entryId) => router.push(`/insights/${entryId}`)

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

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesMood = selectedMood === "all" || entry.mood === selectedMood
    return matchesSearch && matchesMood
  })

  const totalWords = entries.reduce((sum, entry) => sum + entry.wordCount, 0)
  const moods = ["all", ...new Set(entries.map(entry => entry.mood))]

  return (
    <main
      data-theme="sunset"
      className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 text-base-content"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="badge badge-accent badge-lg mb-2">Journal History</div>
          <h1 className="text-pretty text-2xl font-bold text-base-content md:text-3xl mb-2">
            My Reflections
          </h1>
          <p className="text-base-content/70">
            A collection of thoughts, insights, and daily observations
          </p>

          {/* Stats */}
          <div className="stats stats-vertical lg:stats-horizontal w-full shadow-xl bg-base-100/70 backdrop-blur border border-base-300/60 mt-6">
            <div className="stat place-items-center">
              <div className="stat-title">Total Entries</div>
              <div className="stat-value text-2xl text-base-content">{entries.length}</div>
              <div className="stat-desc">Captured moments</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Total Words</div>
              <div className="stat-value">{totalWords.toLocaleString()}</div>
              <div className="stat-desc">Words written</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Average Length</div>
              <div className="stat-value">{Math.round(totalWords / entries.length)}</div>
              <div className="stat-desc">Words per entry</div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="xl:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                
                {/* Search */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Search entries</span>
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/60" />
                    <input
                      type="text"
                      placeholder="Search titles, content, tags..."
                      className="input input-bordered w-full pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Mood Filter */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Filter by mood</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={selectedMood}
                    onChange={(e) => setSelectedMood(e.target.value)}
                  >
                    {moods.map(mood => (
                      <option key={mood} value={mood}>
                        {mood === "all" ? "All Moods" : mood}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="divider"></div>

                <div className="text-sm text-base-content/70">
                  <p className="mb-2">
                    <span className="font-semibold">{filteredEntries.length}</span> of {entries.length} entries shown
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="xl:col-span-3">
            <div className="space-y-4">
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer group border border-base-300/60 hover:border-accent/30"
                    onClick={() => handleCardClick(entry.id)}
                  >
                    <div className="card-body p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3 text-sm text-base-content/60">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{formatDate(entry.date)}</span>
                          <Clock className="w-4 h-4 ml-2" />
                          <span>{entry.time}</span>
                        </div>
                        <div className={`badge ${getMoodColor(entry.mood)}`}>
                          {entry.mood}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-base-content group-hover:text-accent transition-colors">
                          {entry.title}
                        </h3>
                        <p className="text-base-content/80 leading-relaxed">
                          {truncateContent(entry.content)}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-base-300">
                        <div className="flex items-center gap-2">
                          {entry.tags.map((tag, index) => (
                            <span key={index} className="badge badge-outline badge-sm">
                              #{tag}
                            </span>
                          ))}
                          <div className="badge badge-ghost badge-sm ml-2">
                            {entry.wordCount} words
                          </div>
                        </div>
                        <button className="btn btn-ghost btn-sm group-hover:btn-accent group-hover:text-accent-content transition-colors">
                          Read More 
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-base-200 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-base-content/40" />
                    </div>
                    <h3 className="text-lg font-semibold text-base-content mb-2">
                      {searchTerm || selectedMood !== "all" ? "No matching entries" : "No journal entries yet"}
                    </h3>
                    <p className="text-base-content/60">
                      {searchTerm || selectedMood !== "all" 
                        ? "Try adjusting your search or filter criteria"
                        : "Your thoughts and reflections will appear here once you start journaling"
                      }
                    </p>
                    {(searchTerm || selectedMood !== "all") && (
                      <button 
                        className="btn btn-outline btn-sm mt-4"
                        onClick={() => {
                          setSearchTerm("")
                          setSelectedMood("all")
                        }}
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}