import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { features } from '../lib/data'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-100 opacity-50 blur-3xl" />
          <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-primary-50 opacity-70 blur-2xl" />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-alert-50 opacity-40 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            10,000+ meals saved across India
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-gray-900 leading-[1.08] tracking-tight mb-6 animate-fade-up">
            Reduce Food Waste.
            <br />
            <span className="text-primary-500">Feed Lives.</span>
          </h1>

          <p className="max-w-xl mx-auto text-lg text-gray-500 leading-relaxed mb-10 animate-fade-up animation-delay-100">
            Connect surplus food from restaurants and homes with NGOs and communities who need it most — instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-200">
            <Button href="/auth" variant="primary" size="xl" icon="🌱">
              Donate Food
            </Button>
            <Button href="/auth" variant="secondary" size="xl" icon="🤝">
              Find Food
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 animate-fade-up animation-delay-300">
            <span className="flex items-center gap-1.5">✅ Free to use</span>
            <span className="flex items-center gap-1.5">🔒 Verified NGOs</span>
            <span className="flex items-center gap-1.5">⚡ Real-time alerts</span>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary-500 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: '18,400+', label: 'Meals Saved' },
              { value: '340+', label: 'Donors Joined' },
              { value: '120+', label: 'NGO Partners' },
              { value: '28 Cities', label: 'Across India' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-display font-bold">{stat.value}</p>
                <p className="text-primary-100 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary-600 text-sm font-semibold uppercase tracking-widest">Why FoodShare</span>
          <h2 className="text-4xl font-display font-bold text-gray-900 mt-2">How it works</h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">Simple, fast, and impactful — three steps to make a difference.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group bg-white rounded-3xl border border-gray-100 p-8 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 text-center"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center text-3xl mx-auto mb-5 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works steps */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900">Get started in minutes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Donor path */}
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center text-lg">🏪</div>
                <h3 className="font-display font-bold text-xl">For Donors</h3>
              </div>
              <ol className="space-y-4">
                {['Sign up as a donor', 'List your surplus food in 60 seconds', 'NGOs receive instant alerts', 'Schedule pickup & track impact'].map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-sm text-gray-600">{step}</span>
                  </li>
                ))}
              </ol>
              <Button href="/auth" variant="primary" size="md" className="mt-6 w-full">Start Donating</Button>
            </div>

            {/* NGO path */}
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-alert-500 text-white flex items-center justify-center text-lg">🤝</div>
                <h3 className="font-display font-bold text-xl">For NGOs</h3>
              </div>
              <ol className="space-y-4">
                {['Register your NGO (free)', 'Browse available donations nearby', 'Request food with one click', 'Pickup & distribute to communities'].map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-alert-100 text-alert-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-sm text-gray-600">{step}</span>
                  </li>
                ))}
              </ol>
              <Button href="/auth" variant="alert" size="md" className="mt-6 w-full">Find Food Now</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-12 shadow-card">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Ready to make a difference?</h2>
          <p className="text-primary-100 text-lg mb-8 max-w-md mx-auto">Join thousands of donors and NGOs already fighting food waste across India.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/auth" variant="secondary" size="lg">Sign Up Free</Button>
            <Button href="/ngo" variant="ghost" size="lg" className="text-white border border-white/30 hover:bg-white/10">
              Browse Donations
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
