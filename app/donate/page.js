'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Button from '../../components/Button'
import Input, { Select, Textarea } from '../../components/Input'
import { categories } from '../../lib/data'

export default function DonatePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const [form, setForm] = useState({
    foodName: '',
    category: '',
    quantity: '',
    unit: 'kg',
    expiryDate: '',
    expiryTime: '',
    location: '',
    description: '',
    contactName: '',
    contactPhone: '',
    pickupInstructions: '',
  })

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleImage = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target.result)
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => router.push('/donor'), 2500)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center animate-fade-up">
          <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-5xl mx-auto mb-6">
            🎉
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Donation Listed!</h2>
          <p className="text-gray-500 mb-2">Your food donation has been posted successfully.</p>
          <p className="text-sm text-gray-400">Nearby NGOs are being notified. Redirecting to dashboard...</p>
          <div className="mt-6 flex justify-center">
            <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary-500 rounded-full animate-[grow_2.5s_ease_forwards]" style={{ width: '100%', animation: 'grow 2.5s linear forwards' }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const steps = ['Food Details', 'Pickup Info', 'Review']

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="donor" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-display font-bold text-gray-900">Create Donation</h1>
          <p className="text-gray-500 mt-1">List your surplus food — it takes less than 2 minutes.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => {
            const idx = i + 1
            const done = step > idx
            const active = step === idx
            return (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-2 shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    done ? 'bg-primary-500 text-white' : active ? 'bg-primary-500 text-white ring-4 ring-primary-100' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {done ? '✓' : idx}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${active ? 'text-gray-900' : 'text-gray-400'}`}>{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 rounded-full transition-all ${step > idx ? 'bg-primary-500' : 'bg-gray-200'}`} />
                )}
              </div>
            )
          })}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Food Details */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 space-y-5 animate-fade-in">
              <h2 className="font-display font-bold text-lg text-gray-900">Food Information</h2>

              <Input
                label="Food Name"
                id="foodName"
                placeholder="e.g. Cooked Rice, Fresh Vegetables, Bakery Items"
                value={form.foodName}
                onChange={update('foodName')}
                required
                icon="🍽️"
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Category"
                  id="category"
                  value={form.category}
                  onChange={update('category')}
                  options={categories}
                  placeholder="Select category"
                  required
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Quantity <span className="text-alert-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="10"
                      value={form.quantity}
                      onChange={update('quantity')}
                      required
                      min="1"
                      className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
                    />
                    <select
                      value={form.unit}
                      onChange={update('unit')}
                      className="px-3 py-2.5 text-sm rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
                    >
                      {['kg', 'g', 'litres', 'pieces', 'boxes', 'portions'].map(u => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Best Before Date"
                  id="expiryDate"
                  type="date"
                  value={form.expiryDate}
                  onChange={update('expiryDate')}
                  required
                />
                <Input
                  label="Best Before Time"
                  id="expiryTime"
                  type="time"
                  value={form.expiryTime}
                  onChange={update('expiryTime')}
                  required
                />
              </div>

              <Textarea
                label="Description"
                id="description"
                placeholder="Describe the food: preparation method, allergens, storage tips..."
                value={form.description}
                onChange={update('description')}
                rows={3}
              />

              {/* Image Upload */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Food Photo</label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); setDragOver(false); handleImage(e.dataTransfer.files[0]) }}
                  className={`relative border-2 border-dashed rounded-2xl transition-all ${
                    dragOver ? 'border-primary-400 bg-primary-50' : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                  }`}
                >
                  {imagePreview ? (
                    <div className="relative h-40">
                      {/* eslint-disable-next-line @next/next/no-img-element -- blob: URL previews cannot go through next/image */}
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-gray-900/60 text-white flex items-center justify-center text-xs hover:bg-gray-900 transition-colors"
                      >✕</button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-36 cursor-pointer">
                      <span className="text-3xl mb-2">📷</span>
                      <p className="text-sm font-medium text-gray-600">Drop photo here or <span className="text-primary-600">browse</span></p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB</p>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImage(e.target.files[0])} />
                    </label>
                  )}
                </div>
              </div>

              <Button type="button" variant="primary" size="lg" className="w-full" onClick={() => {
                if (form.foodName && form.category && form.quantity && form.expiryDate) setStep(2)
              }}>
                Continue →
              </Button>
            </div>
          )}

          {/* Step 2: Pickup Info */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 space-y-5 animate-fade-in">
              <h2 className="font-display font-bold text-lg text-gray-900">Pickup Information</h2>

              <Input
                label="Pickup Location"
                id="location"
                placeholder="Street address, landmark or area"
                value={form.location}
                onChange={update('location')}
                required
                icon="📍"
              />

              {/* Map placeholder */}
              <div className="h-44 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-gray-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }} />
                <div className="text-center">
                  <div className="text-3xl mb-2">🗺️</div>
                  <p className="text-sm text-gray-500 font-medium">Map — enter address above to pin location</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Contact Name"
                  id="contactName"
                  placeholder="Your name"
                  value={form.contactName}
                  onChange={update('contactName')}
                  required
                  icon="👤"
                />
                <Input
                  label="Contact Phone"
                  id="contactPhone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.contactPhone}
                  onChange={update('contactPhone')}
                  required
                  icon="📞"
                />
              </div>

              <Textarea
                label="Pickup Instructions"
                id="pickupInstructions"
                placeholder="e.g. Ring doorbell, available 5–8pm, bring own containers..."
                value={form.pickupInstructions}
                onChange={update('pickupInstructions')}
                rows={3}
              />

              <div className="flex gap-3">
                <Button type="button" variant="secondary" size="lg" className="flex-1" onClick={() => setStep(1)}>
                  ← Back
                </Button>
                <Button type="button" variant="primary" size="lg" className="flex-1" onClick={() => {
                  if (form.location && form.contactName && form.contactPhone) setStep(3)
                }}>
                  Review →
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6">
                <h2 className="font-display font-bold text-lg text-gray-900 mb-4">Review & Submit</h2>

                {imagePreview && (
                  // eslint-disable-next-line @next/next/no-img-element -- blob: URL previews cannot go through next/image
                  <img src={imagePreview} alt="Food" className="w-full h-44 object-cover rounded-xl mb-4" />
                )}

                <div className="space-y-3">
                  {[
                    { label: 'Food', value: form.foodName },
                    { label: 'Category', value: form.category },
                    { label: 'Quantity', value: `${form.quantity} ${form.unit}` },
                    { label: 'Best Before', value: `${form.expiryDate} at ${form.expiryTime}` },
                    { label: 'Location', value: form.location },
                    { label: 'Contact', value: `${form.contactName} — ${form.contactPhone}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                      <span className="text-xs font-semibold text-gray-400 w-24 shrink-0 uppercase tracking-wide pt-0.5">{label}</span>
                      <span className="text-sm text-gray-800">{value || '—'}</span>
                    </div>
                  ))}
                </div>

                {form.description && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-600">
                    {form.description}
                  </div>
                )}
              </div>

              <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 text-sm text-primary-700">
                <p className="font-semibold mb-1">✅ Ready to post!</p>
                <p className="text-primary-600">Once submitted, nearby NGOs will be instantly notified about your donation.</p>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="secondary" size="lg" className="flex-1" onClick={() => setStep(2)}>
                  ← Back
                </Button>
                <Button type="submit" variant="primary" size="lg" className="flex-1">
                  🌱 Post Donation
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
