'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Star, CheckCircle } from 'lucide-react';
import TransferBookingForm from '@/components/TransferBookingForm';
import { useEffect } from 'react';

const krakowDestination = {
  name: 'Kraków - Cultural Capital',
  shortName: 'Kraków',
  location: 'Kraków, Poland',
  distance: '20 km',
  duration: '25min',
  price: 80,
  image: '/images/Krakow.jpg',
  description: 'Discover Poland former royal capital, a UNESCO World Heritage city filled with medieval architecture, vibrant market squares, world-class museums, and centuries of fascinating history.',
  highlights: [
    'UNESCO World Heritage Old Town',
    'Largest medieval market square in Europe',
    'Wawel Royal Castle and Cathedral',
    'Historic Jewish Quarter - Kazimierz',
    'St. Mary Basilica with Veit Stoss altarpiece',
    'Vibrant cultural scene and nightlife'
  ],
  whatToExpect: [
    'Walk through the magnificent Main Market Square',
    'Explore Wawel Castle and Cathedral complex',
    'Discover Kazimierz Jewish Quarter',
    'Visit St. Mary Basilica and hear the bugle call',
    'Stroll along the Royal Route',
    'Experience local cafes and restaurants'
  ],
  tips: [
    'Old Town is pedestrian-only, perfect for walking',
    'Wawel Castle tickets should be booked online',
    'Try traditional Polish pierogi and zapiekanka',
    'Kazimierz has excellent nightlife and restaurants',
    'Free walking tours available daily',
    'Visit Cloth Hall for souvenirs and local crafts'
  ],
  coordinates: { lat: 50.0619, lng: 19.9368 }
};

export default function KrakowTransferPage() {
  const router = useRouter();

  useEffect(() => {
    const prefillData = {
      pickup: 'Kraków Airport (KRK)',
      dropoff: krakowDestination.name,
      dropoffCoords: krakowDestination.coordinates
    };
    localStorage.setItem('booking_prefill', JSON.stringify(prefillData));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.push('/')}
            className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all duration-200 font-medium"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Back to Destinations</span>
          </button>
        </div>
      </header>

      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <img
            src={krakowDestination.image}
            alt={krakowDestination.name}
            className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
          />
        </div>
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="mb-4">
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium border border-white/30">
                  Popular Destination
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                {krakowDestination.name}
              </h1>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 flex items-center gap-2 shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">{krakowDestination.location}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 flex items-center gap-2 shadow-lg">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">{krakowDestination.distance} • {krakowDestination.duration}</span>
                </div>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl px-4 py-3 flex items-center gap-2 shadow-lg">
                  <Star className="w-5 h-5 text-white fill-white" />
                  <span className="text-white font-bold">From {krakowDestination.price} PLN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">About This Destination</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {krakowDestination.description}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm p-8 border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  Highlights
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {krakowDestination.highlights.map((highlight, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h3>
                <div className="space-y-3">
                  {krakowDestination.whatToExpect.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-blue-500 flex items-center justify-center flex-shrink-0 transition-colors">
                        <span className="text-blue-600 group-hover:text-white font-bold transition-colors">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-gray-700 pt-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-sm p-8 border border-amber-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  💡 Practical Tips
                </h3>
                <div className="space-y-3">
                  {krakowDestination.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                      <span className="text-2xl">✓</span>
                      <span className="text-gray-700 pt-0.5">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-2">Why Book With Us?</h3>
                  <p className="text-blue-100 mb-8">Experience hassle-free travel with our premium service</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-lg mb-1">Fixed Price Guarantee</p>
                      <p className="text-blue-100 text-sm">No hidden fees or surprises at checkout</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-lg mb-1">Professional Drivers</p>
                      <p className="text-blue-100 text-sm">Licensed, experienced, English-speaking</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-lg mb-1">Door-to-Door Service</p>
                      <p className="text-blue-100 text-sm">Pick up and drop off at any address</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-lg mb-1">Free Cancellation</p>
                      <p className="text-blue-100 text-sm">Cancel up to 24h before your transfer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
                  <div className="p-4 sm:p-6">
                    <TransferBookingForm />
                  </div>
                </div>
                <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Instant Confirmation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
