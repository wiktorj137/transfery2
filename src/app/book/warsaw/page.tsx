import { Metadata } from 'next';
import { Clock, Shield, Star, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import TransferBookingForm from '@/components/TransferBookingForm';

export const metadata: Metadata = {
  title: 'Transfer from Kraków to Warsaw | Krakow Transfer',
  description: 'Book private transfer from Kraków to Warsaw. Fixed price 650 PLN, 300 km, 3 hours. Comfortable direct journey to Poland\'s capital.',
  keywords: 'Kraków Warsaw transfer, private taxi Kraków Warsaw, transport to Warsaw, Poland transfer service',
};

export default function WarsawTransferPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
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

      <section className="pt-12 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">Long Distance Transfer</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Transfer from Kraków to Warsaw
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                Premium long-distance transfer service from Kraków to Warsaw, Poland&apos;s capital. 
                Travel in comfort on the A4 highway with professional drivers.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <p className="text-sm text-gray-600 mb-1">Distance</p>
                  <p className="text-2xl font-bold text-gray-900">300 km</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p className="text-2xl font-bold text-gray-900">3 hours</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <p className="text-sm text-gray-600 mb-1">Fixed Price</p>
                  <p className="text-2xl font-bold text-blue-600">650 PLN</p>
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
                  <span className="text-sm font-medium">Premium Vehicles</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Advance Booking</span>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/Warsaw.jpg" 
                alt="Warsaw - Palace of Culture and Science"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 px-3 sm:px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Book Your Transfer</h2>
            <p className="text-gray-600">Enter your details and get instant confirmation</p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
            <TransferBookingForm defaultDestination="Warsaw" />
          </div>
        </div>
      </section>

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
                  <span className="text-xl">🛣️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Long-Distance Transfer</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We offer comfortable long-distance transfer service from Kraków to Warsaw, covering 300 km in approximately 3 hours via the A4 and A1 highways. 
                Perfect for planned trips to the capital. Please book in advance to ensure availability.
              </p>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 text-lg mb-3">Service Features</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">Comfortable vehicles ideal for long journeys</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">Professional drivers with excellent route knowledge</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">Bottled water provided</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">Air conditioning and climate control</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">Rest stop included if needed</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">All highway tolls included in price</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Please book at least 48 hours in advance</span>
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
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Warsaw Chopin Airport (WAW)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Warsaw Old Town (Stare Miasto)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">City Center and business district</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Royal Castle and Royal Route</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Warsaw Central Railway Station</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Hotels and conference centers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Private Transfer */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xl">💡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Why Choose Private Transfer?</h3>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              While train connections between Kraków and Warsaw are available, private transfer offers additional convenience:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-white/70 p-4 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Door-to-Door Service</h4>
                  <p className="text-sm text-gray-600">No need to get to/from railway stations</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/70 p-4 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Flexible Timing</h4>
                  <p className="text-sm text-gray-600">Plan according to your schedule</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/70 p-4 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">No Luggage Hassles</h4>
                  <p className="text-sm text-gray-600">No restrictions or handling worries</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/70 p-4 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Privacy & Comfort</h4>
                  <p className="text-sm text-gray-600">Travel at your own pace</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/70 p-4 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Multiple Stops</h4>
                  <p className="text-sm text-gray-600">Possible along the route (arrange in advance)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/70 p-4 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Perfect for Groups</h4>
                  <p className="text-sm text-gray-600">Ideal for 2-4 passengers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
