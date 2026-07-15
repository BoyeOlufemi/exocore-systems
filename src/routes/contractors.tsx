import { createFileRoute } from '@tanstack/react-router'
import { IntakeForm } from '../components/IntakeForm'

export const Route = createFileRoute('/contractors')({
  head: () => ({
    meta: [
      { title: 'Home Services AI Employee | ExoCore Systems' },
      {
        name: 'description',
        content:
          'A 24/7 AI employee that answers, qualifies, and books estimates in 48 hours. Built for home-services contractors.',
      },
    ],
  }),
  component: Contractors,
})

function Contractors() {
  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div className="hero-art" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <span className="eyebrow reveal">For home-services pros</span>
              <h1 className="reveal">Stop losing jobs while you&rsquo;re on the job.</h1>
              <p className="lead reveal">
                Your AI employee works around the clock. It answers every call, sizes up the lead, and books the estimate.
                You are live in 48 hours, and you just show up to booked jobs.
              </p>
              <div className="hero-cta reveal">
                <a className="btn btn-primary btn-lg" href="#contractors-form">Worth a 15-minute look? →</a>
              </div>
              <div className="trust reveal">
                <span className="sample-tag" style={{ margin: 0 }}>The goal</span>
                <span>Every missed call is a booked job you never hear about. We make sure you catch it.</span>
              </div>
            </div>
            <IntakeForm
              card="intake"
              id="contractors-form"
              heading="See if it's worth 15 minutes."
              sub="Tell me your setup. If it's not a fit, I'll say so."
              source="contractors"
              submitLabel="Send →"
              note="Prototype. On the live site this books straight onto your calendar."
              fields={[
                { name: 'name', placeholder: 'Name + company', required: true },
                { name: 'phone', type: 'tel', placeholder: 'Best phone number', required: true },
                { name: 'bottleneck', placeholder: "What's slipping? (missed calls, follow-ups…)", required: true },
              ]}
            />
          </div>
        </div>
      </div>

      {/* PAIN */}
      <section className="block" style={{ paddingBlock: 'clamp(3rem,7vw,6rem)' }}>
        <div className="wrap">
          <div className="shead reveal"><span className="eyebrow">You know the drill</span><h2>The phone rings while your hands are full.</h2></div>
          <div className="pain">
            <div className="p reveal"><span className="x">01</span><span>Calls come in while you are up a ladder or under a sink, so they go to voicemail nobody checks until dark.</span></div>
            <div className="p reveal"><span className="x">02</span><span>By the time you call back, they have already booked the other guy who picked up first.</span></div>
            <div className="p reveal"><span className="x">03</span><span>Follow-ups and invoices eat your evenings instead of your family.</span></div>
            <div className="p reveal"><span className="x">04</span><span>A full-time receptionist costs more than the jobs you are losing, so you just eat the loss.</span></div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="block">
        <div className="wrap">
          <div className="shead reveal"><span className="eyebrow">How it works</span><h2>Live in 48 hours. No new software to learn.</h2></div>
          <div className="steps">
            <div className="step reveal"><div className="n">1</div><h4>Forward your number</h4><p>Keep your phone, your tools, everything. You just forward calls you would otherwise miss.</p></div>
            <div className="step reveal"><div className="n">2</div><h4>Your AI employee answers</h4><p>It picks up 24/7, sounds right for your trade, qualifies the lead, and books the estimate.</p></div>
            <div className="step reveal"><div className="n">3</div><h4>You show up to booked work</h4><p>Every call logged with a full transcript. You hear exactly what was said.</p></div>
          </div>
        </div>
      </section>

      {/* OBJECTIONS */}
      <section className="block">
        <div className="wrap">
          <div className="shead reveal"><span className="eyebrow">Straight answers</span><h2>The stuff you are already thinking.</h2></div>
          <div className="reveal">
            <div className="obj"><q>My spouse or office already answers.</q><p>Then think of it as their backup. It never sleeps, never eats, and never misses the 6pm call while dinner is on.</p></div>
            <div className="obj"><q>How do I know it won&rsquo;t mess up my leads?</q><p>You hear every call. Full transcript on each one. Nothing happens in the dark.</p></div>
            <div className="obj"><q>What if it doesn&rsquo;t work?</q><p>It is a 48-hour test on a forwarded number. Your current setup stays exactly as it is.</p></div>
            <div className="obj"><q>Is this really worth it?</q><p>One booked job usually covers the whole thing. After that, it pays you back every week.</p></div>
          </div>
        </div>
      </section>

      {/* BAND CTA */}
      <section className="block">
        <div className="wrap">
          <div className="band reveal">
            <div className="medallion" aria-hidden="true" style={{ right: '-140px', top: '-90px', opacity: 0.42 }} />
            <span className="eyebrow">Simple setup, live in 48 hours</span>
            <h2 style={{ margin: '1.1rem auto 1.6rem', maxWidth: '20ch' }}>Worth a 15-minute look?</h2>
            <a className="btn btn-primary btn-lg" href="#contractors-form">Book my 15-minute look →</a>
          </div>
        </div>
      </section>
    </>
  )
}
