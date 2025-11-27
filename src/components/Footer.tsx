import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image 
                src="/images/assets/Asset 10FAIRBID.png" 
                alt="FairBid" 
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>
            <p className="text-gray-600">
              Your modern e-commerce destination for quality products and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#1877F2] hover:text-[#166FE5] transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-[#1DA1F2] hover:text-[#1A8CD8] transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-[#E4405F] hover:text-[#D42D4E] transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-[#0A66C2] hover:text-[#0959AB] transition-colors duration-200">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
              <li><Link href="/shop" className="text-gray-600 hover:text-gray-900">Shop</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
              <li><Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link></li>
              <li><Link href="/signup" className="text-gray-600 hover:text-gray-900">Sign Up</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">123 E-commerce St, Tech City, 10001</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                <a href="mailto:info@fairbid.com" className="text-gray-600 hover:text-gray-900">info@fairbid.com</a>
              </li>
              <li className="flex items-center">
                <FaPhone className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-gray-900">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} FairBid. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">
                Terms of Service
              </Link>
              <Link href="/shipping" className="text-sm text-gray-500 hover:text-gray-700">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
