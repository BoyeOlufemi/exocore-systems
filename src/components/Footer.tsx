import { Link } from '@tanstack/react-router'
import { Mark } from './Mark'

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-in">
          <div>
            <div className="fbrand" style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
              <Mark className="mark" /> ExoCore Systems
            </div>
            <p className="muted" style={{ marginTop: '.6rem', maxWidth: '34ch', fontSize: '.92rem' }}>
              Automation that clears the busywork. Built by Boye&rsquo; Olufemi in Chicago.
            </p>
          </div>
          <div className="foot-links">
            <Link to="/" hash="systems">Systems</Link>
            <Link to="/" hash="ventures">Tracks</Link>
            <Link to="/" hash="work">Work</Link>
            <Link to="/" hash="contact">Contact</Link>
            <a href="https://github.com/CodedBiijay" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
        <div className="proto">
          <span style={{ marginLeft: 'auto' }}>© 2026 ExoCore Systems · ExoCoreSystems.com</span>
        </div>
      </div>
    </footer>
  )
}
