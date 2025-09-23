"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, Calendar, Clock, BookOpen, Filter, Search } from "lucide-react"

export default function HistoryPage() {
  const router = useRouter()
  const [entries, setEntries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch("/api/entries")
        if (!res.ok) throw new Error("Failed to fetch entries")
        const data = await res.json()
        setEntries(data)
      } catch (err) {
        console.error("Error fetching entries:", err)
      }
    }
    fetchEntries()
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

  const truncateContent = (content, maxLength = 120) =>
    content.length <= maxLength ? content : content.substring(0, maxLength) + "..."

  const handleCardClick = (entryId) => router.push(`/insights/${entryId}`)

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const totalWords = entries.reduce((sum, entry) => sum + (entry.wordCount || 0), 0)

  return (
    <main
      data-theme="luxury"
      className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 text-base-content"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
        <header className="mb-8 text-center">
          <h1 className="text-pretty text-2xl font-bold text-base-content md:text-3xl mb-2">
            Past Reflections
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
              <div className="stat-value">{entries.length > 0 ? Math.round(totalWords / entries.length) : 0}</div>
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
                
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text mb-3">Search entries</span>
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 text-white transform -translate-y-1/2 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search content..."
                      className="input input-bordered w-full pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
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
                    key={entry._id}
                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer group border border-base-300/60 hover:border-accent/30"
                    onClick={() => handleCardClick(entry._id)}
                  >
                    <div className="card-body p-6">
                      {/* Header */}
                      <div className="flex items-center gap-3 text-sm text-base-content/60 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{formatDate(entry.createdAt)}</span>
                        {entry.time && (
                          <>
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{entry.time}</span>
                          </>
                        )}
                      </div>

                      {/* Content */}
                      <p className="text-base-content/80 leading-relaxed">
                        {truncateContent(entry.content || "")}
                      </p>

                      <div className="flex items-center justify-end mt-6 pt-4 border-t border-base-300">
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
                      {searchTerm ? "No matching entries" : "No journal entries yet"}
                    </h3>
                    <p className="text-base-content/60">
                      {searchTerm 
                        ? "Try adjusting your search criteria"
                        : "Your thoughts and reflections will appear here once you start journaling"
                      }
                    </p>
                    {searchTerm && (
                      <button 
                        className="btn btn-outline btn-sm mt-4"
                        onClick={() => setSearchTerm("")}
                      >
                        Clear Search
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
