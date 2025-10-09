import { Metadata } from 'next';
import { Clock, Shield, Star, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import TransferBookingForm from '@/components/TransferBookingForm';

export const metadata: Metadata = {
  title: 'Airport Transfer to Kraków City Center | Krakow Transfer',
  description: 'Book airport transfer from Kraków Airport (KRK) to city center. Fixed price 80 PLN. Professional drivers, 24/7 service, door-to-door in 25 minutes.',
  keywords: 'Kraków airport transfer, KRK to city center, Balice airport taxi, Kraków transport',
};

export default function KrakowTransferPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">Back to Home</span>
            </Link>
            <div className="text-sm text-gray-600">
              📞 +48 123 456 789
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">Airport Transfer</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Kraków Airport to City Center
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                Professional transfer service from Kraków-Balice Airport (KRK) to any address in the city center. 
                Fast, comfortable, and reliable.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <p className="text-sm text-gray-600 mb-1">Distance</p>
                  <p className="text-2xl font-bold text-gray-900">20 km</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p className="text-2xl font-bold text-gray-900">25 min</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <p className="text-sm text-gray-600 mb-1">Fixed Price</p>
                  <p className="text-2xl font-bold text-blue-600">80 PLN</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <p className="text-sm text-gray-600 mb-1">Availability</p>
                  <p className="text-2xl font-bold text-gray-900">24/7</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Fully Insured</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Star className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Professional Drivers</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Advance Booking</span>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/Krakow.jpg" 
                alt="Kraków City Center - Main Market Square"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Book Your Transfer</h2>
            <p className="text-gray-600">Enter your details and get instant confirmation</p>
          </div>
          <TransferBookingForm defaultDestination="Kraków City Center" />
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">About This Transfer</h2>
            <p className="text-gray-600 text-lg">Everything you need to know</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left Column */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">✈️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Kraków Airport Transfer</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We offer reliable transfer service from Kraków-Balice Airport (KRK) to the city center. 
                Please book in advance to ensure availability. Our experienced drivers will meet you at the agreed time.
              </p>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 text-lg mb-3">What&apos;s Included</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">Meet & greet service at arrivals hall with name sign</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">Professional, English-speaking driver</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">All tolls, taxes, and fees included</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">Comfortable, well-maintained vehicle</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">Help with luggage</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">Direct transfer to your destination</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">📍</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Popular Destinations</h3>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Main Market Square (Rynek Główny)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Kazimierz - Jewish Quarter</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Wawel Castle area</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Old Town hotels and apartments</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Kraków Główny Railway Station</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Options */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl">🚗</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Vehicle Options & Pricing</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">🚙</div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Standard Sedan</h4>
                  <p className="text-sm text-gray-600">Up to 4 passengers, 2 large bags</p>
                </div>
                <div className="text-center pt-4 border-t border-blue-200">
                  <p className="text-3xl font-bold text-blue-600">80 PLN</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">✨</div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Premium Sedan</h4>
                  <p className="text-sm text-gray-600">Up to 4 passengers, 2 large bags</p>
                </div>
                <div className="text-center pt-4 border-t border-purple-200">
                  <p className="text-3xl font-bold text-purple-600">120 PLN</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">🚐</div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Van/Minibus</h4>
                  <p className="text-sm text-gray-600">Up to 8 passengers, 8 large bags</p>
                </div>
                <div className="text-center pt-4 border-t border-green-200">
                  <p className="text-3xl font-bold text-green-600">150 PLN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Krakow Transfer. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
