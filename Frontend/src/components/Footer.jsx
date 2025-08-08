import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-gray-300 border-t-2 border-orange-600 shadow-lg">
      {/* Main Info Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm md:text-base text-center md:text-left text-gray-400 select-none">
          © {new Date().getFullYear()} Reel Talk. All rights reserved.
        </p>

        <nav className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-10 text-sm md:text-base text-center md:text-right">
          <a
            href="/about"
            className="hover:text-orange-400 hover:underline transition-all duration-200"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-orange-400 hover:underline transition-all duration-200"
          >
            Contact
          </a>
          <a
            href="/privacy"
            className="hover:text-orange-400 hover:underline transition-all duration-200"
          >
            Privacy Policy
          </a>
        </nav>
      </div>

      {/* Creator Section */}
      <div className="bg-gray-950 border-t border-orange-700 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-center md:text-left text-gray-500 select-none">
            Built & Maintained by{' '}
            <a
              href="https://github.com/xVaibsMx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-600 hover:underline transition duration-200"
            >
              Vaibhav.M
            </a>
          </p>

          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm md:text-base text-gray-500">
            <a
              href="https://github.com/xVaibsMx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:underline transition duration-200"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/xvaibsx/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 hover:underline transition duration-200"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com/xVaibsMx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 hover:underline transition duration-200"
              aria-label="Twitter"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
