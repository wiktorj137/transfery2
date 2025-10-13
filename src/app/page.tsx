'use client';

import { Plane, Shield, Clock, Star, ArrowRight, Phone } from 'lucide-react';
import TransferBookingForm from '@/components/TransferBookingForm';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 truncate">Krakow Transfer</h1>
                <p className="text-xs text-gray-500 hidden lg:block">Airport & City Transfers</p>
              </div>
            </Link>
            <a 
              href="tel:+48123456789"
              className="group flex items-center gap-1 sm:gap-1.5 border-2 border-blue-600 text-blue-600 px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md flex-shrink-0"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold whitespace-nowrap">+48 123 456 789</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section with Form */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-32 xl:pb-40">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start lg:items-center">
            {/* Left Column - Hero Content */}
            <div className="text-white text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Airport Transfers
                <span className="block text-blue-200 mt-2">Krakow</span>
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                Professional transport to and from the airport. Comfortable, safe, on time.
              </p>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:pl-8 mb-8 lg:mb-12" id="booking-form">
              <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8">
                <TransferBookingForm />
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Organized Tours Section */}
      <section id="destinations" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4 fill-blue-700" />
              <span className="text-sm font-semibold uppercase tracking-wide">Organized Tours</span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Explore Top Attractions from <span className="text-blue-600">Kraków</span>
            </h3>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We organize comfortable transfers and tours to the most popular destinations around Kraków. 
              Visit Auschwitz, Wieliczka Salt Mine, Zakopane mountains, and more.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-gray-900 font-semibold mb-2">Licensed & Insured</h4>
              <p className="text-gray-600 text-sm">Professional drivers with full insurance</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-gray-900 font-semibold mb-2">Door-to-Door</h4>
              <p className="text-gray-600 text-sm">Pick up from any address in Kraków</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-gray-900 font-semibold mb-2">Fixed Prices</h4>
              <p className="text-gray-600 text-sm">No hidden costs or surprises</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Plane className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-gray-900 font-semibold mb-2">Airport Transfer</h4>
              <p className="text-gray-600 text-sm">Kraków Airport to any destination</p>
            </div>
          </div>
        </div>
      </section>

      <section id="destinations" className="py-12 px-4 bg-gradient-to-b from-white to-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Popular Destinations from Kraków
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Book your transfer to top attractions
            </p>
          </div>

          {/* All Destinations - Compact Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {/* Auschwitz-Birkenau */}
            <Link href="/book/auschwitz-birkenau" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src="/images/Auschwitz-Birkenau.jpg" 
                    alt="Auschwitz-Birkenau"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">Auschwitz-Birkenau</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">150 PLN</span>
                    <span className="text-xs text-gray-500">70 km</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Wieliczka Salt Mine */}
            <Link href="/book/wieliczka-salt-mine" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src="/images/wieliczka-salt-mine.jpg" 
                    alt="Wieliczka Salt Mine"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">Wieliczka Salt Mine</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">100 PLN</span>
                    <span className="text-xs text-gray-500">15 km</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Zakopane & Tatra Mountains */}
            <Link href="/book/zakopane" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src="/images/zakopane-tatry.jpg" 
                    alt="Zakopane"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">Zakopane & Tatras</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">350 PLN</span>
                    <span className="text-xs text-gray-500">110 km</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Dunajec River Rafting */}
            <Link href="/book/dunajec-rafting" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src="/images/dunajec-river.jpg" 
                    alt="Dunajec River"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">Dunajec River Rafting</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">280 PLN</span>
                    <span className="text-xs text-gray-500">100 km</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Ojców National Park */}
            <Link href="/book/ojcow-national-park" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src="/images/ojcow-park.jpg" 
                    alt="Ojców National Park"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">Ojców National Park</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">120 PLN</span>
                    <span className="text-xs text-gray-500">30 km</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Częstochowa - Jasna Góra */}
            <Link href="/book/czestochowa" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src="/images/czestochowa.jpg" 
                    alt="Częstochowa"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">Częstochowa</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">280 PLN</span>
                    <span className="text-xs text-gray-500">130 km</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Wadowice */}
            <Link href="/book/wadowice" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src="/images/wadowice.jpg" 
                    alt="Wadowice"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">Wadowice</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">140 PLN</span>
                    <span className="text-xs text-gray-500">50 km</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Kraków City Center */}
            <Link href="/book/krakow" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src="/images/Krakow.jpg" 
                    alt="Kraków"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">Kraków City Center</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">80 PLN</span>
                    <span className="text-xs text-gray-500">20 km</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Katowice */}
            <Link href="/book/katowice" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src="/images/Katowice.jpg" 
                    alt="Katowice"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">Katowice</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">200 PLN</span>
                    <span className="text-xs text-gray-500">80 km</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Warsaw */}
            <Link href="/book/warsaw" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src="/images/Warsaw.jpg" 
                    alt="Warsaw"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">Warsaw</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">600 PLN</span>
                    <span className="text-xs text-gray-500">300 km</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Wrocław */}
            <Link href="/book/wroclaw" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src="/images/Wroclaw.jpg" 
                    alt="Wrocław"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">Wrocław</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">550 PLN</span>
                    <span className="text-xs text-gray-500">270 km</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* CTA Section - Improved Design */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-2xl border border-blue-500 mt-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative max-w-3xl mx-auto p-8 md:p-12 text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white/30">
                  <span className="text-5xl">🗺️</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Can&apos;t Find Your Destination?
                </h3>
                <p className="text-lg md:text-xl text-blue-100 mb-6 leading-relaxed">
                  We offer private transfers to anywhere in Poland.
                </p>
                
                {/* CTA Button */}
                <a 
                  href="#booking-form" 
                  className="inline-flex items-center gap-3 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  <span className="text-lg">Book Your Custom Transfer</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Professional Airport Transfer Service in Krakow
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-600">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Why Choose Our Service?</h3>
                <p className="mb-4">
                  We provide reliable airport transfer services in Krakow with professional drivers and modern vehicles. 
                  Whether you&apos;re arriving at Krakow Airport (KRK) or need transportation to the city center, 
                  we ensure a comfortable and punctual journey.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Door-to-door service from/to Krakow Airport</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Flight tracking for pickup timing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Meet & greet service available</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Coverage</h3>
                <p className="mb-4">
                  We operate throughout Krakow and surrounding areas, offering transfers to popular destinations 
                  including the Old Town, Kazimierz district, business centers, and hotels. 
                  Our service extends to nearby cities like Katowice, Warsaw, and Wroclaw.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Krakow city center transfers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Long-distance transfers to other cities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Tours to Auschwitz, Wieliczka, Zakopane</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced Design */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-xl">Krakow Transfer</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Professional airport and city transfers in Poland. Available 24/7 with premium vehicles and licensed drivers.
              </p>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-300">4.9/5 from 500+ reviews</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Popular Destinations</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/book/auschwitz-birkenau" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Auschwitz-Birkenau
                  </Link>
                </li>
                <li>
                  <Link href="/book/wieliczka-salt-mine" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Wieliczka Salt Mine
                  </Link>
                </li>
                <li>
                  <Link href="/book/zakopane" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Zakopane Mountains
                  </Link>
                </li>
                <li>
                  <Link href="/book/krakow" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Kraków Airport Transfer
                  </Link>
                </li>
                <li>
                  <Link href="/book/warsaw" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Warsaw Airport Transfer
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400">📞</span>
                  <div>
                    <p className="text-sm text-gray-300 font-medium">Phone (24/7)</p>
                    <a href="tel:+48123456789" className="text-gray-400 hover:text-white transition-colors text-sm">
                      +48 123 456 789
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400">📧</span>
                  <div>
                    <p className="text-sm text-gray-300 font-medium">Email</p>
                    <a href="mailto:contact@transfer.pl" className="text-gray-400 hover:text-white transition-colors text-sm">
                      contact@transfer.pl
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400">📍</span>
                  <div>
                    <p className="text-sm text-gray-300 font-medium">Service Area</p>
                    <p className="text-gray-400 text-sm">Kraków & All Poland</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Airports */}
            <div>
              <h4 className="font-bold text-lg mb-4">Airport Transfers</h4>
              <ul className="space-y-3">
                <li>
                  <div className="bg-gray-800 rounded-lg p-3 hover:bg-gray-750 transition-colors">
                    <p className="text-white font-medium text-sm mb-1">Kraków Airport (KRK)</p>
                    <p className="text-gray-400 text-xs">Balice, 20 km from city</p>
                  </div>
                </li>
                <li>
                  <div className="bg-gray-800 rounded-lg p-3 hover:bg-gray-750 transition-colors">
                    <p className="text-white font-medium text-sm mb-1">Katowice Airport (KTW)</p>
                    <p className="text-gray-400 text-xs">Pyrzowice, 80 km from Kraków</p>
                  </div>
                </li>
                <li>
                  <div className="bg-gray-800 rounded-lg p-3 hover:bg-gray-750 transition-colors">
                    <p className="text-white font-medium text-sm mb-1">Warsaw Airport (WAW)</p>
                    <p className="text-gray-400 text-xs">Chopin Airport, Warsaw</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © 2024 Krakow Transfer. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Cancellation Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
