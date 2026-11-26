import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-xl bg-primary-500 flex items-center justify-center text-white text-xs font-bold">FS</div>
              <span className="font-display font-bold text-white text-lg">Food<span className="text-primary-400">Share</span></span>
            </Link>
            <p className="text-sm leading-relaxed">Connecting food donors with communities in need. Every meal saved is a life changed.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/auth" className="hover:text-primary-400 transition-colors">Donate Food</Link></li>
              <li><Link href="/auth" className="hover:text-primary-400 transition-colors">Find Food</Link></li>
              <li><Link href="/auth" className="hover:text-primary-400 transition-colors">NGO Registration</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs">© 2026 FoodShare. Built with 💚 to fight food waste.</p>
          <p className="text-xs">Made in Pune, India 🇮🇳</p>
        </div>
      </div>
    </footer>
  )
}
