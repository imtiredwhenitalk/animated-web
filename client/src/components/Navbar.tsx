import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getAdjacentPlanets } from '@shared/planets'

const btnBase: React.CSSProperties = {
  textDecoration: 'none',
  padding: '6px 16px',
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: '0.06em',
  transition: 'all 0.2s',
  cursor: 'pointer',
  border: '1px solid transparent',
  background: 'transparent',
  color: 'rgba(180,190,255,0.6)',
  fontFamily: 'system-ui, sans-serif',
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()

  const { current, previous, next } = getAdjacentPlanets(location.pathname)
  const isPlanetPage = current !== null

  const btnActive: React.CSSProperties = {
    ...btnBase,
    color: '#ffffff',
    background: 'rgba(100,120,255,0.18)',
    border: '1px solid rgba(100,120,255,0.4)',
  }

  const btnAccent: React.CSSProperties = {
    ...btnBase,
    color: 'rgba(160,200,255,0.8)',
    border: '1px solid rgba(100,150,255,0.2)',
    background: 'rgba(60,80,180,0.12)',
  }

  const navLinks = (
    <>
      <Link to="/solar-system" style={location.pathname === '/solar-system' ? btnActive : btnBase}>
        {t('nav.solarSystem')}
      </Link>

      <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: 18 }}>|</span>

      <Link
        to="/constellation"
        style={location.pathname === '/constellation' ? btnActive : btnBase}
      >
        {t('nav.constellation')}
      </Link>

      {isPlanetPage && (
        <>
          <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: 18 }}>|</span>
          <span style={{ ...btnActive, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'rgba(100,180,255,0.9)',
                boxShadow: '0 0 6px rgba(100,180,255,0.7)',
              }}
            />
            {t('nav.currentPlanet')}: {current.name}
          </span>
        </>
      )}

      {isPlanetPage && (
        <>
          <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: 18 }}>|</span>
          {next ? (
            <Link to={next.route} style={btnAccent}>
              {t('nav.moveTo')}: {next.name} →
            </Link>
          ) : (
            <span style={{ ...btnBase, opacity: 0.25, cursor: 'default' }}>
              {t('nav.moveTo')} →
            </span>
          )}
        </>
      )}

      {isPlanetPage && (
        <>
          <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: 18 }}>|</span>
          {previous ? (
            <Link to={previous.route} style={btnAccent}>
              ← {t('nav.backTo')}: {previous.name}
            </Link>
          ) : (
            <span style={{ ...btnBase, opacity: 0.25, cursor: 'default' }}>
              ← {t('nav.backTo')}
            </span>
          )}
        </>
      )}

      <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: 18 }}>|</span>

      <Link to="/settings" style={location.pathname === '/settings' ? btnActive : btnBase}>
        {t('nav.settings')}
      </Link>
    </>
  )

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <Link
        to="/solar-system"
        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #6688ff, #1122aa)',
            boxShadow: '0 0 12px rgba(100,130,255,0.5)',
          }}
        />
        <span
          style={{
            color: 'rgba(220,230,255,0.9)',
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: '0.05em',
          }}
        >
          COSMOS
        </span>
      </Link>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="desktop-nav">
        {navLinks}
      </div>

      <button
        onClick={() => setMobileMenuOpen((o) => !o)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'white',
          padding: 4,
        }}
        className="mobile-burger"
        aria-label="Toggle menu"
      >
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
          {mobileMenuOpen ? (
            <>
              <line x1="4" y1="4" x2="18" y2="18" />
              <line x1="18" y1="4" x2="4" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="7" x2="19" y2="7" />
              <line x1="3" y1="12" x2="19" y2="12" />
              <line x1="3" y1="17" x2="19" y2="17" />
            </>
          )}
        </svg>
      </button>

      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(5,8,20,0.95)',
            backdropFilter: 'blur(12px)',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Link
            to="/solar-system"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              textDecoration: 'none',
              padding: '10px 16px',
              borderRadius: 8,
              color: '#fff',
              fontSize: 14,
            }}
          >
            {t('nav.solarSystem')}
          </Link>
          <Link
            to="/constellation"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              textDecoration: 'none',
              padding: '10px 16px',
              borderRadius: 8,
              color: '#fff',
              fontSize: 14,
            }}
          >
            {t('nav.constellation')}
          </Link>
          {isPlanetPage && (
            <div style={{ padding: '10px 16px', color: '#fff', fontSize: 14, fontWeight: 600 }}>
              {t('nav.currentPlanet')}: {current.name}
            </div>
          )}
          {next && (
            <Link
              to={next.route}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                textDecoration: 'none',
                padding: '10px 16px',
                borderRadius: 8,
                color: 'rgba(160,200,255,0.8)',
                fontSize: 14,
              }}
            >
              {t('nav.moveTo')}: {next.name} →
            </Link>
          )}
          {previous && (
            <Link
              to={previous.route}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                textDecoration: 'none',
                padding: '10px 16px',
                borderRadius: 8,
                color: 'rgba(160,200,255,0.8)',
                fontSize: 14,
              }}
            >
              ← {t('nav.backTo')}: {previous.name}
            </Link>
          )}
          <Link
            to="/settings"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              textDecoration: 'none',
              padding: '10px 16px',
              borderRadius: 8,
              color: '#fff',
              fontSize: 14,
            }}
          >
            {t('nav.settings')}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
