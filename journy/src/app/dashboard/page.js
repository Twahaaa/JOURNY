"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, RefreshCw, Copy, Download } from "lucide-react";

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

  // This effect handles autosaving and is correct.
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
                        // We don't need to manually clear the textarea. React does it.
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
                    <div className="badge badge-outline rounded-4xl badge-sm gap-1 py-[17px] px-3">
                      {entry.length} characters
                    </div>
                    <button
                      className="btn btn-secondary btn-outline py-4 flex rounded-4xl items-center gap-1 "
                      onClick={saveEntry}
                    >
                      <Check className="h-4 w-4" /> Submit
                    </button>
                  </div>
                </div>
                <textarea
                  // No ref is needed now for setting text
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  className="w-full h-96 resize-none text-base leading-7 border-none outline-none focus:outline-none focus:ring-0 text-gray-400 p-4 rounded-lg bg-gray-600/20"
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
                    <button
                      className="btn btn-outline btn-sm flex items-center gap-1"
                      onClick={() => window.location.reload()}
                    >
                      <RefreshCw className="h-4 w-4" /> Refresh
                    </button>
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
                    <button
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
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
