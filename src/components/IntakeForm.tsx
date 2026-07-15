import { useState } from 'react'

export type Field = {
  name: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  textarea?: boolean
}

// Reusable intake form. Posts to the n8n webhook set in VITE_N8N_WEBHOOK_URL.
export function IntakeForm({
  source,
  fields,
  submitLabel,
  note,
  card = 'intake',
  heading,
  sub,
  id,
  submitFull = false,
}: {
  source: string
  fields: Field[]
  submitLabel: string
  note?: string
  card?: 'intake' | 'contact-card'
  heading?: string
  sub?: string
  id?: string
  submitFull?: boolean
}) {
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setSending(true)
    try {
      const url = import.meta.env.VITE_N8N_WEBHOOK_URL
      if (url) {
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source, submittedAt: new Date().toISOString(), ...data }),
        })
      }
      form.reset()
      setDone(true)
    } catch {
      setDone(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className={card} id={id}>
      {heading && <div className="ttl">{heading}</div>}
      {sub && <p className="sub">{sub}</p>}
      <form onSubmit={onSubmit}>
        <div className="field-row">
          {fields.map((f) => (
            <div key={f.name}>
              {f.label && <label className="lab">{f.label}</label>}
              {f.textarea ? (
                <textarea className="field" name={f.name} placeholder={f.placeholder} required={f.required} />
              ) : (
                <input
                  className="field"
                  type={f.type || 'text'}
                  name={f.name}
                  placeholder={f.placeholder}
                  required={f.required}
                />
              )}
            </div>
          ))}
          <button
            className={submitFull ? 'btn btn-primary btn-lg' : 'btn btn-primary'}
            type="submit"
            disabled={sending}
            style={submitFull ? { width: '100%', justifyContent: 'center' } : undefined}
          >
            {sending ? 'Sending…' : submitLabel}
          </button>
        </div>
        {note && <p className="form-note">{note}</p>}
        {done && <div className="form-ok show">Thanks — got it. In production this posts to your n8n webhook.</div>}
      </form>
    </div>
  )
}
