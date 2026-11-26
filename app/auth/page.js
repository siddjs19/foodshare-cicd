'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '../../components/Button'
import Input from '../../components/Input'

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [role, setRole] = useState('donor') // 'donor' | 'ngo'
  const [form, setForm] = useState({ name: '', email: '', password: '', org: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Navigate based on role (dummy auth)
    router.push(role === 'donor' ? '/donor' : '/ngo')
  }

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-100 opacity-40 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-alert-50 opacity-50 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-primary-500 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">FS</div>
            <span className="font-display font-bold text-2xl text-gray-900">Food<span className="text-primary-500">Share</span></span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-8 animate-fade-up">
          {/* Tab switcher */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${mode === 'login' ? 'bg-white shadow-soft text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Log In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${mode === 'signup' ? 'bg-white shadow-soft text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Sign Up
            </button>
          </div>

          {/* Role selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">I am a...</p>
            <div className="grid grid-cols-2 gap-3">
              <RoleCard
                emoji="🏪"
                label="Donor"
                desc="Restaurant, home, or business"
                selected={role === 'donor'}
                onClick={() => setRole('donor')}
              />
              <RoleCard
                emoji="🤝"
                label="NGO"
                desc="Charity or community org"
                selected={role === 'ngo'}
                onClick={() => setRole('ngo')}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <Input
                label="Full Name"
                id="name"
                placeholder="Arjun Sharma"
                value={form.name}
                onChange={update('name')}
                required
                icon="👤"
              />
            )}

            {mode === 'signup' && role === 'ngo' && (
              <Input
                label="Organization Name"
                id="org"
                placeholder="Hope Foundation"
                value={form.org}
                onChange={update('org')}
                required
                icon="🏢"
              />
            )}

            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={update('email')}
              required
              icon="✉️"
            />

            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={update('password')}
              required
              icon="🔒"
              hint={mode === 'signup' ? 'At least 8 characters' : ''}
            />

            {mode === 'login' && (
              <div className="text-right">
                <button type="button" className="text-xs text-primary-600 hover:underline">Forgot password?</button>
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
              {mode === 'login' ? 'Log In' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-primary-600 font-semibold hover:underline"
            >
              {mode === 'login' ? 'Sign up free' : 'Log in'}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to our{' '}
          <Link href="#" className="hover:text-gray-600 underline">Terms</Link> and{' '}
          <Link href="#" className="hover:text-gray-600 underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

function RoleCard({ emoji, label, desc, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-2xl border-2 text-left transition-all ${
        selected
          ? 'border-primary-500 bg-primary-50'
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      <div className="text-2xl mb-1">{emoji}</div>
      <div className={`text-sm font-semibold ${selected ? 'text-primary-700' : 'text-gray-800'}`}>{label}</div>
      <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
    </button>
  )
}
