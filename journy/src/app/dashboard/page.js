"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, RefreshCw, Copy, Download, Brain, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const today = useMemo(() => new Date(), []);
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayKey = `journal:${yyyy}-${mm}-${dd}`;

  const formattedDate = useMemo(() => {
    const weekday = today.toLocaleDateString(undefined, { weekday: "long" });
    const month = today.toLocaleDateString(undefined, { month: "short" });
    const day = today.toLocaleDateString(undefined, { day: "numeric" });
    const year = today.toLocaleDateString(undefined, { year: "numeric" });
    return `${weekday}, ${month} ${day}, ${year}`;
  }, [today]);

  const [entry, setEntry] = useState("");
  const [savedAt, setSavedAt] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  const containerRef = useRef(null);

  // This effect now runs only ONCE when the component mounts to load initial data.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(todayKey);
      if (saved) {
        setEntry(saved);
      }
    } catch {}
    // We compute stats once on load.
    computeStats();
  }, [todayKey]); // Depends only on todayKey, which is stable.

  const computeStats = () => {
    try {
      const keys = Object.keys(localStorage).filter((k) =>
        k.startsWith("journal:")
      );
      setTotalEntries(keys.length);
      let streak = 0;
      const d = new Date();
      for (;;) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const k = `journal:${y}-${m}-${day}`;
        if (localStorage.getItem(k)) {
          streak += 1;
          d.setDate(d.getDate() - 1);
        } else break;
      }
      setCurrentStreak(streak);
    } catch {}
  };

  const saveEntry = () => {
    try {
      localStorage.setItem(todayKey, entry);
      setSavedAt(new Date());
      computeStats();
    } catch {}
  };


  const analyzeEntry = async () => {
    if (!entry.trim()) {
      alert("Please write something before analyzing!");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisError(null);

    try {
      console.log('Sending request with entry:', entry.trim());
      
      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entryText: entry.trim()
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Get the raw response text first
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      // Check if response is empty
      if (!responseText) {
        throw new Error('Empty response from server');
      }

      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Response text that failed to parse:', responseText);
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
      }

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      console.log('Parsed data:', data);

      if (!data.report) {
        throw new Error('No report data in response');
      }

      setAnalysisResult(data.report);
      setShowAnalysis(true);
      
      // Save to localStorage as well
      saveEntry();
      
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisError(error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      // Avoid saving an empty string unnecessarily on initial load
      if (entry) {
        try {
          localStorage.setItem(todayKey, entry);
          setSavedAt(new Date());
        } catch {}
      }
    }, 600);
    return () => clearTimeout(id);
  }, [entry, todayKey]);

  return (
    <main
      data-theme="sunset"
      className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 text-base-content"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
        <header className="mb-8 text-center">
          <div className="badge badge-accent badge-lg mb-2">Daily Journal</div>
          <h1 className="text-pretty text-2xl font-bold text-base-content md:text-3xl mb-2">
            {formattedDate}
          </h1>
          <p className="text-base-content/70">
            Capture your thoughts and reflections
          </p>

          <div className="stats stats-vertical lg:stats-horizontal w-full shadow-xl bg-base-100/70 backdrop-blur border border-base-300/60 mt-6">
            <div className="stat place-items-center">
              <div className="stat-title">Today</div>
              <div className="stat-value text-2xl text-base-content">
                {entry?.trim().length > 0 ? "Written" : "Pending"}
              </div>
              <div className="stat-desc">
                {savedAt
                  ? `Saved ${savedAt.toLocaleTimeString()}`
                  : "Autosaves while typing"}
              </div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Current Streak</div>
              <div className="stat-value">{currentStreak}d</div>
              <div className="stat-desc">Consecutive days with entries</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Total Entries</div>
              <div className="stat-value">{totalEntries}</div>
              <div className="stat-desc">All-time on this device</div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <aside className="xl:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl">Writing Tips</h2>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span> Write about your
                    day&apos;s highlights
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span> Express your feelings
                    freely
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span> Set tomorrow&apos;s
                    intentions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span> Practice gratitude
                  </li>
                </ul>

                <div className="divider"></div>

                <div className="flex flex-col gap-2">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      if (confirm("Clear today's entry?")) {
                        setEntry("");

                        setAnalysisResult(null);
                        setShowAnalysis(false);
                        setAnalysisError(null);
                        if (containerRef.current)
                          containerRef.current.innerText = "";
                        try {
                          localStorage.removeItem(todayKey);
                          computeStats();
                        } catch {}
                      }
                    }}
                  >
                    <span>Clear today</span>
                  </button>
                  <div className="text-xs text-base-content/60 text-center">
                    Word count:{" "}
                    {entry
                      .trim()
                      .split(/\s+/)
                      .filter((w) => w.length > 0).length}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section className="xl:col-span-3">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="card-title text-xl font-extrabold">
                    Your daily reflection
                  </h2>
                  <div className="flex items-center gap-2">
                    {/* <div className="badge badge-outline rounded-4xl badge-sm gap-1 py-[17px] px-3">
                      {entry.length} characters
                    </div>
                    <button
                      className="btn btn-secondary btn-outline py-4 flex rounded-4xl items-center gap-1"
                      onClick={saveEntry}
                    >
                      <Check className="h-4 w-4" /> Save
                    </button> */}
                    <button
                      className="btn btn-accent py-4 flex rounded-4xl items-center gap-1"
                      onClick={analyzeEntry}
                      disabled={isAnalyzing || !entry.trim()}
                    >
                      {isAnalyzing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Brain className="h-4 w-4" />
                      )}
                      {isAnalyzing ? "Analyzing..." : "Analyze"}
                    </button>
                  </div>
                </div>
                <textarea
                  // No ref is needed now for setting text
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  className="w-full h-96 resize-none text-base leading-7 border-none outline-none focus:outline-none focus:ring-0 text-base-content p-4 rounded-lg bg-base-200/50"
                  placeholder="Start writing your thoughts... What made today special? How are you feeling? What are you grateful for?"
                  aria-label="Daily journal entry"
                  style={{
                    lineHeight: '1.75rem',
                    backgroundAttachment: 'local',
                  }}
                />

                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-base-content/60 flex items-center gap-1">
                    <span className="loading loading-dots loading-xs opacity-60"></span>
                    Autosaving locally as you type. Private to this device.
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <button
                      className="btn btn-outline btn-sm flex items-center gap-1"
                      onClick={() => window.location.reload()}
                    >
                      <RefreshCw className="h-4 w-4" /> Refresh
                    </button> */}
                    <button
                      className="btn btn-outline btn-sm flex items-center gap-1"
                      onClick={() => {
                        navigator.clipboard
                          .writeText(entry)
                          .then(() => alert("Copied!"))
                          .catch(() => alert("Failed"));
                      }}
                    >
                      <Copy className="w-4 h-4" /> Copy
                    </button>
                    {/* <button
                      className="btn btn-outline btn-sm flex items-center gap-1"
                      onClick={() => {
                        const element = document.createElement("a");
                        const file = new Blob(
                          [`Journal Entry - ${formattedDate}\n\n${entry}`],
                          { type: "text/plain" }
                        );
                        element.href = URL.createObjectURL(file);
                        element.download = `journal-${yyyy}-${mm}-${dd}.txt`;
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                      }}
                    >
                      <Download className="h-4 w-4" /> Download
                    </button> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {analysisError && (
              <div className="alert alert-error mt-6">
                <div>
                  <h3 className="font-bold">Analysis Failed</h3>
                  <div className="text-xs">{analysisError}</div>
                </div>
                <button 
                  className="btn btn-sm btn-ghost"
                  onClick={() => setAnalysisError(null)}
                >
                  ✕
                </button>
              </div>
            )}

            {/* Analysis Results */}
            {showAnalysis && analysisResult && (
              <div className="card bg-base-100 shadow-xl mt-6">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="card-title text-xl">
                      <Brain className="w-6 h-6 text-accent" />
                      AI Analysis
                    </h2>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => setShowAnalysis(false)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Summary */}
                    {analysisResult.summary && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-accent">Summary</h3>
                        <p className="text-base-content/80 leading-relaxed">
                          {analysisResult.summary}
                        </p>
                      </div>
                    )}

                    {/* Mood */}
                    {analysisResult.mood && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-accent">Mood Analysis</h3>
                        <div className="badge badge-secondary badge-lg">
                          {analysisResult.mood}
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {analysisResult.suggestions && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-accent">Suggestions</h3>
                        <div className="space-y-2">
                          {Array.isArray(analysisResult.suggestions) ? (
                            analysisResult.suggestions.map((suggestion, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 bg-base-200 rounded-lg">
                                <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                                <span className="text-sm">{suggestion}</span>
                              </div>
                            ))
                          ) : (
                            <div className="p-3 bg-base-200 rounded-lg">
                              <span className="text-sm">{analysisResult.suggestions}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}