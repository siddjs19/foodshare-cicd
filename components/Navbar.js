'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar({ role = null }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:scale-105 transition-transform">
              FS
            </div>
            <span className="font-display font-700 text-gray-900 text-lg tracking-tight">
              Food<span className="text-primary-500">Share</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {role === 'donor' && (
              <>
                <NavLink href="/donor">Dashboard</NavLink>
                <NavLink href="/donate">Donate Food</NavLink>
              </>
            )}
            {role === 'ngo' && (
              <>
                <NavLink href="/ngo">Dashboard</NavLink>
              </>
            )}
            {!role && (
              <>
                <NavLink href="/#features">How it Works</NavLink>
                <NavLink href="/#about">About</NavLink>
              </>
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {role ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 capitalize">
                  {role === 'donor' ? '🏪 Donor' : '🤝 NGO'}
                </span>
                <Link href="/auth" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  Sign Out
                </Link>
              </div>
            ) : (
              <>
                <Link href="/auth" className="text-sm text-gray-600 hover:text-primary-600 font-medium transition-colors">
                  Log In
                </Link>
                <Link href="/auth" className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-md hover:scale-[1.02]">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-gray-700 transition-all mb-1 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-gray-700 transition-all mb-1 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-1 animate-fade-in">
            {role === 'donor' && (
              <>
                <MobileNavLink href="/donor" onClick={() => setMenuOpen(false)}>Dashboard</MobileNavLink>
                <MobileNavLink href="/donate" onClick={() => setMenuOpen(false)}>Donate Food</MobileNavLink>
              </>
            )}
            {role === 'ngo' && (
              <MobileNavLink href="/ngo" onClick={() => setMenuOpen(false)}>Dashboard</MobileNavLink>
            )}
            {!role && (
              <>
                <MobileNavLink href="/#features" onClick={() => setMenuOpen(false)}>How it Works</MobileNavLink>
                <MobileNavLink href="/auth" onClick={() => setMenuOpen(false)}>Log In</MobileNavLink>
                <MobileNavLink href="/auth" onClick={() => setMenuOpen(false)}>Get Started</MobileNavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

function NavLink({ href, children }) {
  return (
    <Link href={href} className="text-sm text-gray-600 hover:text-primary-600 font-medium transition-colors relative group">
      {children}
      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-200 rounded-full" />
    </Link>
  )
}

function MobileNavLink({ href, children, onClick }) {
  return (
    <Link href={href} onClick={onClick} className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-colors">
      {children}
    </Link>
  )
}
