import { createFileRoute } from '@tanstack/react-router'
import { IntakeForm } from '../components/IntakeForm'

export const Route = createFileRoute('/agri')({
  head: () => ({
    meta: [
      { title: 'Agri-Procurement Ops Platform | ExoCore Systems' },
      {
        name: 'description',
        content:
          'Bring procurement operations into one secure system with a full audit trail. Request an Operations Audit.',
      },
    ],
  }),
  component: Agri,
})

function Agri() {
  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div className="hero-art" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <span className="eyebrow reveal">For agricultural procurement operations</span>
              <h1 className="reveal">One auditable platform across fields, labs, and vendors.</h1>
              <p className="lead reveal">
                Cut out the spreadsheet handoffs, the delays between the lab and the buyers, and the approvals that stall
                for days. Every step gets logged and cannot be changed, so your leadership can finally trust the numbers.
              </p>
              <div className="hero-cta reveal">
                <a className="btn btn-primary btn-lg" href="#agri-form">Request an Operations Audit →</a>
              </div>
              <div className="trust reveal">
                <span className="sample-tag" style={{ margin: 0 }}>Documented</span>
                <span>~<b>27 hours</b> a week of manual coordination, gone.</span>
              </div>
            </div>
            <IntakeForm
              card="intake"
              id="agri-form"
              heading="Request an Operations Audit"
              sub="A fixed-scope audit that maps your waste before we write a single line of code."
              source="agri"
              submitLabel="Send details →"
              note="Prototype. On the live site this posts to your n8n webhook and saves a record you can check later."
              fields={[
                { name: 'name', placeholder: 'Name', required: true },
                { name: 'email', type: 'email', placeholder: 'Work email', required: true },
                { name: 'company', placeholder: 'Company + website', required: true },
                { name: 'team', placeholder: 'Team size' },
                { name: 'compliance', placeholder: 'Compliance / audit needs' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* PAIN */}
      <section className="block" style={{ paddingBlock: 'clamp(3rem,7vw,6rem)' }}>
        <div className="wrap">
          <div className="shead reveal"><span className="eyebrow">The pattern we see</span><h2>Your operation runs on ten spreadsheets and three inboxes.</h2></div>
          <div className="pain">
            <div className="p reveal"><span className="x">01</span><span>Your data is scattered across the field, the lab, the warehouse, and the office, with no single place to trust.</span></div>
            <div className="p reveal"><span className="x">02</span><span>Certificates and PDFs are hand-keyed into master spreadsheets, slowly and with errors.</span></div>
            <div className="p reveal"><span className="x">03</span><span>No immutable audit trail for compliance or procurement approvals.</span></div>
            <div className="p reveal"><span className="x">04</span><span>Multi-stage approvals crawl through email and WhatsApp.</span></div>
            <div className="p reveal"><span className="x">05</span><span>Leadership has no real-time operational dashboard.</span></div>
            <div className="p reveal"><span className="x">06</span><span>Out-of-spec lab results surface too late to act on.</span></div>
          </div>
        </div>
      </section>

      {/* THE PLATFORM */}
      <section className="block">
        <div className="wrap">
          <div className="shead reveal"><span className="eyebrow">The platform</span><h2>The Functional Nucleus, applied to procurement.</h2></div>
          <div className="grid-3">
            <div className="card reveal"><span className="num">Engine</span><h3>One source of truth</h3><p className="muted">Vendor info, certificates, and stock get entered once and shared with every team, from the field to the front office.</p></div>
            <div className="card reveal"><span className="num">Shield</span><h3>Audit-ready by design</h3><p className="muted">Every action gets logged for good, approvals move in clear steps, and each person sees only what their job needs.</p></div>
            <div className="card reveal"><span className="num">Catalyst</span><h3>Catches what people miss</h3><p className="muted">It reads your certificates and PDFs on its own, flags any result that is out of spec, and sends each task to the right person.</p></div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT */}
      <section className="block">
        <div className="wrap">
          <div className="shead reveal"><span className="eyebrow">Engagement</span><h2>Audit first. Build second. You own it.</h2></div>
          <div className="steps">
            <div className="step reveal"><div className="n">1</div><h4>Operations Audit</h4><p>A fixed-scope audit that maps every handoff, delay, and slow spot, with clear before and after workflow maps.</p></div>
            <div className="step reveal"><div className="n">2</div><h4>Platform build</h4><p>A step-by-step build on a secure setup, planned straight from the audit. No surprises and no creeping scope.</p></div>
            <div className="step reveal"><div className="n">3</div><h4>Handover &amp; upkeep</h4><p>I keep an eye on the connections, the logs, and the dashboards, and I write clear guides so your team can run it without me.</p></div>
          </div>
        </div>
      </section>

      {/* OBJECTIONS */}
      <section className="block">
        <div className="wrap">
          <div className="shead reveal"><span className="eyebrow">Straight answers</span><h2>What operators ask before an audit.</h2></div>
          <div className="reveal">
            <div className="obj"><q>We already have an ERP.</q><p>Good. This sits on top of what you already have and fills the gaps between your tools. It is not a rip-and-replace.</p></div>
            <div className="obj"><q>Our data is too sensitive for cloud AI.</q><p>Role-based access, immutable audit logs, and your controls. Sensitive stages stay under your governance.</p></div>
            <div className="obj"><q>Will the field team actually use it?</q><p>Built field-first: fewer taps than the spreadsheet it replaces, or it does not ship.</p></div>
            <div className="obj"><q>What happens when you&rsquo;re gone?</q><p>Documented runbooks and a clean handover. You own the platform and the logic.</p></div>
          </div>
        </div>
      </section>

      {/* BAND CTA */}
      <section className="block">
        <div className="wrap">
          <div className="band reveal">
            <div className="medallion" aria-hidden="true" style={{ right: '-140px', top: '-90px', opacity: 0.42 }} />
            <span className="eyebrow">Start with a fixed-scope audit</span>
            <h2 style={{ margin: '1.1rem auto 1.6rem', maxWidth: '24ch' }}>See exactly where your hours are going.</h2>
            <a className="btn btn-primary btn-lg" href="#agri-form">Request an Operations Audit →</a>
          </div>
        </div>
      </section>
    </>
  )
}
