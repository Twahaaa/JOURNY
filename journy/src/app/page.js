"use client";

export default function HomePage() {
  return (
    <main data-theme="sunset" className="min-h-dvh bg-base-100 text-base-content">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-base-100/80 border-b border-base-200">
        <nav className="navbar max-w-6xl mx-auto px-4">
          <div className="flex-1">
            <a href="#home" className="btn btn-ghost px-0 text-xl font-semibold text-balance">
              JOURNY
              <span className="sr-only">JOURNY</span>
            </a>
          </div>
          <div className="flex-none gap-2">
            <a href="#cta" className="btn btn-primary">
              Get started
            </a>
          </div>
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="hero-content max-w-6xl mx-auto px-4 py-16 md:py-24 grid gap-10 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-pretty">
              Your private, encrypted mental health journal
            </h1>
            <p className="opacity-80 leading-relaxed text-pretty">
              Capture thoughts, moods, and reflections with end‑to‑end encryption. Your entries are encrypted before
              they ever touch our database—only you hold the keys.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#cta" className="btn btn-primary">
                Start journaling
              </a>
              <a href="#security" className="btn btn-outline">
                How encryption works
              </a>
            </div>
            <ul className="mt-4 grid gap-2 text-sm opacity-80">
              <li className="flex items-center gap-2">
                <span className="badge badge-primary badge-sm" aria-hidden="true" />
                Zero‑knowledge storage
              </li>
              <li className="flex items-center gap-2">
                <span className="badge badge-secondary badge-sm" aria-hidden="true" />
                Local encryption keys
              </li>
              <li className="flex items-center gap-2">
                <span className="badge badge-accent badge-sm" aria-hidden="true" />
                Private by default
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="mockup-window border bg-base-200">
              <div className="bg-base-100 p-6">
                <div className="grid gap-4">
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text pr-2">Today I feel </span>
                    </div>
                    <input className="input input-bordered" placeholder="grounded, hopeful..." />
                  </label>
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text pr-2">Write your entry </span>
                    </div>
                    <textarea className="textarea textarea-bordered h-32" placeholder="Type your thoughts here..." />
                  </label>
                  <button className="btn btn-primary w-full">Save securely</button>
                  <div className="alert alert-info">
                    <span className="font-medium">On-device encryption:</span>
                    <span> your text is encrypted before saving.</span>
                  </div>
                </div>
              </div>
            </div>
            <span className="sr-only">Demo UI illustrating a private, encrypted journaling experience.</span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-200">
          <div className="stat">
            <div className="stat-title">Avg. daily check‑ins</div>
            <div className="stat-value">2.4</div>
            <div className="stat-desc">Consistency builds clarity</div>
          </div>
          <div className="stat">
            <div className="stat-title">Entries encrypted</div>
            <div className="stat-value">1.2M+</div>
            <div className="stat-desc">Zero breaches reported</div>
          </div>
          <div className="stat">
            <div className="stat-title">Uptime</div>
            <div className="stat-value">99.9%</div>
            <div className="stat-desc">Monitored & resilient</div>
          </div>
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Designed for peace of mind</h2>
          <p className="mt-3 opacity-80 leading-relaxed">
            Private by design, simple by choice, and helpful when it matters most.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h3 className="card-title">End‑to‑end encryption</h3>
              <p className="opacity-80">
                Entries are encrypted on your device with your key before they reach our servers.
              </p>
              <div className="mt-2 badge badge-primary">Zero‑knowledge</div>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h3 className="card-title">Mood & tags</h3>
              <p className="opacity-80">Track emotions and add tags to recognize patterns over time.</p>
              <div className="mt-2 badge badge-secondary">Clarity</div>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h3 className="card-title">Offline‑first</h3>
              <p className="opacity-80">Write anywhere. Syncs securely when you’re back online.</p>
              <div className="mt-2 badge badge-accent">Reliable</div>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h3 className="card-title">Search that respects privacy</h3>
              <p className="opacity-80">
                Search your entries without compromising privacy. Indexing respects encryption.
              </p>
              <div className="mt-2 badge">Private search</div>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h3 className="card-title">Daily nudges</h3>
              <p className="opacity-80">Gentle reminders to check in, never pushy. Your pace, your journey.</p>
              <div className="mt-2 badge">Mindful</div>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h3 className="card-title">Export anytime</h3>
              <p className="opacity-80">You own your data. Export encrypted or decrypted copies when you need them.</p>
              <div className="mt-2 badge">Portable</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-balance mb-8">How it works</h2>
        <ul className="steps steps-vertical lg:steps-horizontal w-full">
          <li className="step step-primary">Create a private key</li>
          <li className="step step-primary">Encrypt on-device</li>
          <li className="step">Sync to secure storage</li>
          <li className="step">Decrypt locally when reading</li>
        </ul>
      </section>

      <section id="security" className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="prose max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold">Security at the core</h2>
            <p className="leading-relaxed opacity-80">
              We use a client‑side encryption model: your entries are encrypted using a key derived from your passphrase
              before they’re sent to our database. This means we can’t read your content—only you can.
            </p>
            <ul className="list-disc pl-6 opacity-90">
              <li>Keys never leave your device</li>
              <li>Zero‑knowledge architecture</li>
              <li>Industry‑standard cryptography primitives</li>
            </ul>
          </div>
          <div className="mockup-code bg-base-200 border border-base-300">
            <pre data-prefix="$">
              <code>{"# encrypt before save (conceptual)"}</code>
            </pre>
            <pre data-prefix=">" className="text-success">
              <code>{"plaintext -> encrypt(key, nonce) -> ciphertext"}</code>
            </pre>
            <pre data-prefix=">" className="text-success">
              <code>{"ciphertext -> save(database)"}</code>
            </pre>
            <pre data-prefix=">" className="text-info">
              <code>{"read -> fetch(ciphertext) -> decrypt(key, nonce)"}</code>
            </pre>
            <pre data-prefix=">" className="text-info">
              <code>{"render -> your eyes only"}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">What people say</h2>
          <p className="opacity-80">Supportive, private, and calming—just what I needed.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <figure className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <blockquote className="opacity-90">
                {"'The privacy promise helped me finally start journaling again.'"}
              </blockquote>
              <figcaption className="mt-2 text-sm opacity-70">— A., teacher</figcaption>
            </div>
          </figure>
          <figure className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <blockquote className="opacity-90">
                {"'The daily check‑ins are gentle and keep me consistent.'"}
              </blockquote>
              <figcaption className="mt-2 text-sm opacity-70">— R., developer</figcaption>
            </div>
          </figure>
          <figure className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <blockquote className="opacity-90">{"'I love knowing my entries are mine—and only mine.'"}</blockquote>
              <figcaption className="mt-2 text-sm opacity-70">— S., designer</figcaption>
            </div>
          </figure>
        </div>
      </section>

      <section id="faq" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently asked questions</h2>
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border border-base-300 bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">Can you read my entries?</div>
            <div className="collapse-content opacity-80">
              <p>No. Entries are encrypted before they reach our servers. Only your device can decrypt them.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300 bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">Is there AI Suggestions?</div>
            <div className="collapse-content opacity-80">
              <p>Yes, AI suggests habits based on your daily basis. And can even check anytime.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300 bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">Is there a mobile experience?</div>
            <div className="collapse-content opacity-80">
              <p>Yes. The app is responsive in all the screen types.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="card bg-base-200 border border-base-300">
          <div className="card-body items-center text-center">
            <h3 className="card-title text-2xl md:text-3xl">Start your private journal today</h3>
            <p className="opacity-80">Create a space that’s truly yours—secure, calming, and always in your control.</p>
            <div className="card-actions">
              <a className="btn btn-primary">Create my account</a>
              <a className="btn btn-outline" href="#security">
                Learn about security
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-base-200">
        <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-semibold text-lg">MindLock Journal</div>
            <p className="opacity-80 mt-2">A private, end‑to‑end encrypted space for your mental health journey.</p>
          </div>
          <nav className="grid gap-2">
            <a className="link link-hover" href="#features">
              Features
            </a>
            <a className="link link-hover" href="#security">
              Security
            </a>
            <a className="link link-hover" href="#faq">
              FAQ
            </a>
          </nav>
          <div className="grid gap-2">
            <span className="opacity-70">© {new Date().getFullYear()} MindLock. All rights reserved.</span>
            <span className="opacity-70">Private by design.</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
