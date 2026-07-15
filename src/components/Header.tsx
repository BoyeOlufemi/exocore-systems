import { Link, useRouterState } from '@tanstack/react-router'
import { Mark } from './Mark'

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname })
  const spoke = path.startsWith('/contractors') ? 'contractors' : path.startsWith('/agri') ? 'agri' : null

  return (
    <header id="hdr">
      <div className="hdr-in">
        <Link to="/" className="brand">
          <Mark className="mark" />
          <span>ExoCore Systems</span>
        </Link>

        {!spoke ? (
          <nav className="navset">
            <a data-scroll="" href="#systems">Systems</a>
            <a data-scroll="" href="#ventures">Tracks</a>
            <a data-scroll="" href="#work">Work</a>
            <a data-scroll="" href="#contact">Contact</a>
            <a className="btn btn-primary" href="#contact">Locate Operational Waste →</a>
          </nav>
        ) : (
          <nav className="nav-spoke">
            <Link to="/" className="back">← Home</Link>
            <a className="btn btn-primary" href={spoke === 'contractors' ? '#contractors-form' : '#agri-form'}>
              {spoke === 'contractors' ? 'Book a call →' : 'Request an Audit →'}
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
