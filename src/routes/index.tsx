import { createFileRoute, Link } from '@tanstack/react-router'
import { IntakeForm } from '../components/IntakeForm'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div className="hero-art" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <span className="eyebrow reveal" style={{ letterSpacing: '.1em' }}>
                Operational Architect | Business Process Optimization &amp; Intelligent Workflow Systems
              </span>
              <h1 className="reveal">I build systems that eliminate the busywork.</h1>
              <p className="lead reveal">
                Custom automation that takes the manual load off your team and gives back hours every week. You get the
                whole system built, tested, and handed over clean, so it&rsquo;s yours to run.
              </p>
              <div className="hero-cta reveal">
                <a className="btn btn-primary btn-lg" href="#contact">Locate Operational Waste →</a>
                <a className="btn btn-ghost btn-lg" href="#work">See the work</a>
              </div>
              <div className="trust reveal">
                <span><b>Shipped</b> to production</span>
                <span><b>Built</b> end to end</span>
                <span><b>US</b>-based · remote</span>
              </div>
              <div className="scrollcue reveal"><span className="ln" /> Scroll to explore</div>
            </div>
            <IntakeForm
              card="intake"
              id="hero-form"
              heading="Where&rsquo;s your waste?"
              sub="Two lines. I&rsquo;ll reply with the one system that would recover the most hours."
              source="hub-hero"
              submitLabel="Send →"
              note="Prototype. On the live site this posts to your n8n intake webhook."
              fields={[
                { name: 'email', type: 'email', placeholder: 'you@company.com', required: true },
                { name: 'bottleneck', placeholder: 'Your biggest bottleneck', required: true },
              ]}
            />
          </div>
        </div>
      </div>

      {/* POSITIONING */}
      <section className="block" style={{ paddingBlock: 'clamp(3rem,7vw,6rem)' }}>
        <div className="wrap">
          <h2 className="reveal maxr" style={{ maxWidth: '22ch' }}>
            Every hour your team loses to admin is money you already earned but have not collected yet.
          </h2>
          <p className="lead muted reveal" style={{ marginTop: '1.4rem', maxWidth: '52ch' }}>
            ExoCore does not add another tool to your stack. It removes the wasted steps between the tools you already run.
          </p>
        </div>
      </section>

      {/* FUNCTIONAL NUCLEUS */}
      <section className="block" id="systems">
        <div className="medallion" aria-hidden="true" style={{ right: '-150px', top: '1rem' }} />
        <div className="wrap">
          <div className="shead reveal">
            <span className="eyebrow">The Functional Nucleus</span>
            <h2>Every system, built on three layers.</h2>
            <p className="lead muted">
              The same three layers sit under everything I build, so what you get is fast, easy to check, and ready to grow.
            </p>
          </div>
          <div className="grid-3">
            <div className="card reveal">
              <div className="icon"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10" /><circle cx="19" cy="17" r="2" /></svg></div>
              <span className="num">01</span>
              <h3>The Engine</h3>
              <p className="muted">
                The core of your business: the smallest set of steps that gets your product out the door. Taking requests,
                moving them along, and keeping records, all automated.
              </p>
            </div>
            <div className="card reveal">
              <div className="icon"><svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg></div>
              <span className="num">02</span>
              <h3>The Shield</h3>
              <p className="muted">
                Your safety net. Every action gets logged and cannot be changed, and approvals happen in clear steps.
                Nothing goes out without a record you can trust.
              </p>
            </div>
            <div className="card reveal">
              <div className="icon"><svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg></div>
              <span className="num">03</span>
              <h3>The Catalyst</h3>
              <p className="muted">
                Your edge. Smart tools that read documents, flag anything that looks off, and send work where it needs to
                go. They keep paying off as you grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section className="block" id="ventures">
        <div className="wrap">
          <div className="shead reveal">
            <span className="eyebrow">ExoCore Systems</span>
            <h2>Two tracks. One operating system.</h2>
            <p className="lead muted">One system, the Functional Nucleus, put to work two ways for two kinds of business.</p>
          </div>
          <div className="venture reveal">
            <div className="vmark">A</div>
            <div>
              <span className="vtag">Track A · Home Services</span>
              <h3>The 24/7 AI Employee</h3>
              <p className="muted">
                It answers every call, sizes up the lead, and books the estimate, so you are live within 48 hours. Made
                for contractors who lose work the second a call goes to voicemail.
              </p>
              <div className="vlinks"><Link to="/contractors">See the contractors page →</Link></div>
            </div>
            <div className="vside">Live in 48h</div>
          </div>
          <div className="venture reveal">
            <div className="vmark">B</div>
            <div>
              <span className="vtag">Track B · Internal Operations</span>
              <h3>The Auditable Ops Platform</h3>
              <p className="muted">
                Centralizes field, lab, warehouse, and back-office operations into one secure, role-based system with an
                immutable audit trail. Built for agri-procurement and complex supply chains.
              </p>
              <div className="vlinks"><Link to="/agri">See the agri-procurement page →</Link></div>
            </div>
            <div className="vside">Audit first</div>
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="block" id="work">
        <div className="wrap">
          <div className="shead reveal">
            <span className="eyebrow">Selected Work</span>
            <h2>Waste, located and removed.</h2>
            <p className="lead muted">
              A few recent builds, grouped by the Functional Nucleus. Happy to walk you through the live demos and the code.
            </p>
          </div>
          <div className="grid-3">
            <div className="metric reveal">
              <span className="sample-tag">The Catalyst</span>
              <div className="big"><em>96%</em> faster</div>
              <p>
                Leads that sort themselves. Every new inquiry gets scored, checked, and passed to sales around the clock,
                with nobody watching over it.<br />
                <span className="mono" style={{ color: 'var(--ink-38)', fontSize: '.78rem' }}>n8n · Claude · ZeroBounce · Supabase</span>
              </p>
            </div>
            <div className="metric reveal">
              <span className="sample-tag">The Shield</span>
              <div className="big">168 <em>hrs/mo</em></div>
              <p>
                Invoices that handle themselves. Bills get matched, approved, and sent to QuickBooks with zero errors, and
                a clean paper trail every time.<br />
                <span className="mono" style={{ color: 'var(--ink-38)', fontSize: '.78rem' }}>n8n · Claude · Supabase</span>
              </p>
            </div>
            <div className="metric reveal">
              <span className="sample-tag">The Engine</span>
              <div className="big">27 <em>hrs/wk</em></div>
              <p>
                AgriOps buying platform. Five teams working in one shared system, from the field inspection all the way to
                the warehouse.<br />
                <span className="mono" style={{ color: 'var(--ink-38)', fontSize: '.78rem' }}>Next.js · Supabase · Vercel</span>{' '}
                · <a href="https://github.com/CodedBiijay/upwork-agri-procurement" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sand-hi)' }}>Repo ↗</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="block" id="about">
        <div className="wrap">
          <div className="about-grid">
            <div className="portrait reveal">
              <img
                src="/headshot.webp"
                alt="Boye' Olufemi"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', display: 'block' }}
              />
            </div>
            <div className="about-body reveal">
              <span className="eyebrow">About</span>
              <h2 style={{ margin: '1rem 0 1.6rem' }}>Boye&rsquo; Olufemi</h2>
              <p className="big">
                I cannot stand watching good people fight broken systems, so I build the bridges that clear the waste out of
                the way.
              </p>
              <p>
                I started out as a Clinical Operations Specialist. That is where it hit me: the biggest thing slowing good
                work down is almost always wasted effort. So I taught myself to build systems that take that waste away. I
                work out of Chicago, building the software that keeps a business running smoothly behind the scenes.
              </p>
              <p>
                Most of my work is in farming and supply chains. The hard part there is connecting what happens out in the
                field to the back office, so a crop can be tracked from the ground all the way to the warehouse, with the
                data kept private and safe. Through ExoCore Systems I do the same for businesses of every size, from a
                contractor who cannot miss a single call to an office buried in spreadsheets.
              </p>
              <p>
                Whether I am setting up a database or putting an AI assistant to work, the goal never changes: build things
                that let a business run smoothly, safely, and without wasted effort.
              </p>
              <div className="role-row">
                <span className="chip">Founder · ExoCore Systems</span>
                <span className="chip">Agtech &amp; B2B Supply Chain</span>
                <span className="chip">Chicago · Remote</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="block" id="contact">
        <div className="medallion" aria-hidden="true" style={{ left: '-170px', bottom: '-40px', opacity: 0.4 }} />
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'clamp(2rem,5vw,4rem)' }}>
            <div className="reveal">
              <span className="eyebrow">Contact</span>
              <h2 style={{ margin: '1rem 0 1.2rem' }}>Locate your operational waste.</h2>
              <p className="lead muted">
                Tell me where your hours go. I will write back with the one system that would win the most of them back. No
                pitch deck, no pressure.
              </p>
              <p className="muted" style={{ marginTop: '1.6rem', fontFamily: 'var(--fm)', fontSize: '.85rem' }}>
                Direct:{' '}
                <a href="mailto:support@exocoresystems.com" style={{ color: 'var(--sand-hi)', borderBottom: '1px solid var(--line-2)' }}>
                  support@exocoresystems.com
                </a>
                <br />
                <span style={{ display: 'inline-block', marginTop: '.7rem' }}>
                  Prefer to book now?{' '}
                  <a href="https://cal.com/boye-exocoresystems/30min" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sand-hi)', borderBottom: '1px solid var(--line-2)' }}>
                    Grab a 30-minute call →
                  </a>
                </span>
              </p>
            </div>
            <IntakeForm
              card="contact-card"
              source="hub-contact"
              submitLabel="Send message →"
              submitFull
              note="Prototype. On the live site this posts to your n8n webhook and saves a lead record you can check later."
              fields={[
                { name: 'name', label: 'Name', placeholder: 'Full name', required: true },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com', required: true },
                { name: 'company', label: 'Company / Website', placeholder: 'acme.com' },
                { name: 'bottleneck', label: 'Your biggest bottleneck', placeholder: 'Where do the hours disappear?', textarea: true },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  )
}
