'use client';

import { Plane, Shield, Clock, Star, ArrowRight, Phone } from 'lucide-react';
import TransferBookingForm from '@/components/TransferBookingForm';
import { PopularToursSection } from '@/components/PopularToursSection';
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 lg:pt-16 pb-12 sm:pb-16 lg:pb-32 xl:pb-40">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-12 items-start lg:items-center">
            {/* Left Column - Hero Content */}
            <div className="text-white text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-3 sm:mb-4 border border-white/20">
                <Plane className="w-3.5 h-3.5 text-blue-200" />
                <span className="text-xs sm:text-sm font-medium text-blue-100">Premium Airport Service</span>
              </div>
              
              <h2 className="text-2xl sm:text-4xl lg:text-6xl xl:text-7xl font-extrabold mb-3 sm:mb-4 lg:mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                  Airport Transfers
                </span>
                <span className="block text-blue-200 mt-1 sm:mt-2 text-3xl sm:text-5xl lg:text-6xl">Kraków</span>
              </h2>
              
              <p className="text-sm sm:text-lg lg:text-xl text-blue-100 mb-4 sm:mb-6 lg:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Professional transport to and from the airport. 
                <span className="block mt-1 sm:mt-2 font-semibold text-white text-xs sm:text-base">Comfortable • Safe • On Time</span>
              </p>

              {/* Quick Benefits - Hidden on mobile */}
              <div className="hidden sm:grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto lg:mx-0 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <Shield className="w-6 h-6 text-blue-200 mb-2 mx-auto lg:mx-0" />
                  <p className="text-xs sm:text-sm font-semibold">Licensed</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <Clock className="w-6 h-6 text-blue-200 mb-2 mx-auto lg:mx-0" />
                  <p className="text-xs sm:text-sm font-semibold">24/7 Service</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <Star className="w-6 h-6 text-blue-200 mb-2 mx-auto lg:mx-0" />
                  <p className="text-xs sm:text-sm font-semibold">Fixed Prices</p>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:pl-8 w-full" id="booking-form">
              <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 overflow-hidden w-full">
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

      {/* Popular Tours - Right Below Form */}
      <PopularToursSection />

      {/* Features Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Why Choose <span className="text-blue-600">Us?</span>
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Professional service with attention to every detail
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-5 hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <h4 className="text-gray-900 font-semibold text-sm md:text-base mb-1 md:mb-2">Licensed & Insured</h4>
              <p className="text-gray-600 text-xs md:text-sm">Professional drivers with full insurance</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 md:p-5 hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <h4 className="text-gray-900 font-semibold text-sm md:text-base mb-1 md:mb-2">Door-to-Door</h4>
              <p className="text-gray-600 text-xs md:text-sm">Pick up from any address in Kraków</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 md:p-5 hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Star className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <h4 className="text-gray-900 font-semibold text-sm md:text-base mb-1 md:mb-2">Fixed Prices</h4>
              <p className="text-gray-600 text-xs md:text-sm">No hidden costs or surprises</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 md:p-5 hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Plane className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <h4 className="text-gray-900 font-semibold text-sm md:text-base mb-1 md:mb-2">Airport Transfer</h4>
              <p className="text-gray-600 text-xs md:text-sm">Kraków Airport to any destination</p>
            </div>
          </div>
        </div>
      </section>

      <section id="destinations" className="py-12 px-4 bg-gradient-to-b from-white to-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Popular Destinations from <span className="text-blue-600">Kraków</span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Comfortable transfers with professional guides to top attractions
            </p>
          </div>

          {/* All Destinations - Clean uniform grid */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4 md:gap-6 mb-8">
            {/* Auschwitz-Birkenau */}
            <Link href="/book/auschwitz-birkenau" className="group">
              <div className="relative h-64 md:h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img 
                  src="/images/Auschwitz-Birkenau.jpg" 
                  alt="Auschwitz-Birkenau"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-black/40 via-black/30 to-black/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base md:text-lg">Auschwitz-Birkenau</h3>
                    <p className="text-blue-200 font-semibold text-base md:text-lg">from 150 zł</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Wieliczka Salt Mine */}
            <Link href="/book/wieliczka-salt-mine" className="group">
              <div className="relative h-64 md:h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img 
                  src="/images/wieliczka-salt-mine.jpg" 
                  alt="Wieliczka Salt Mine"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-black/40 via-black/30 to-black/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base md:text-lg">Wieliczka Salt Mine</h3>
                    <p className="text-blue-200 font-semibold text-base md:text-lg">from 100 zł</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Zakopane & Tatra Mountains */}
            <Link href="/book/zakopane" className="group">
              <div className="relative h-64 md:h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img 
                  src="/images/zakopane-tatry.jpg" 
                  alt="Zakopane"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-black/40 via-black/30 to-black/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base md:text-lg">Zakopane & Tatras</h3>
                    <p className="text-blue-200 font-semibold text-base md:text-lg">from 350 zł</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Ojców National Park */}
            <Link href="/book/ojcow-national-park" className="group">
              <div className="relative h-64 md:h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img 
                  src="/images/ojcow-park.jpg" 
                  alt="Ojców National Park"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-black/40 via-black/30 to-black/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base md:text-lg">Ojców National Park</h3>
                    <p className="text-blue-200 font-semibold text-base md:text-lg">from 120 zł</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Dunajec River Rafting */}
            <Link href="/book/dunajec-rafting" className="group">
              <div className="relative h-64 md:h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img 
                  src="/images/dunajec-river.jpg" 
                  alt="Dunajec River"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-black/40 via-black/30 to-black/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base md:text-lg">Dunajec River Rafting</h3>
                    <p className="text-blue-200 font-semibold text-base md:text-lg">from 280 zł</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Energylandia Amusement Park */}
            <Link href="/book/energylandia" className="group">
              <div className="relative h-64 md:h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img 
                  src="/images/Energylandia.jpg" 
                  alt="Energylandia"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-black/40 via-black/30 to-black/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base md:text-lg">Energylandia</h3>
                    <p className="text-blue-200 font-semibold text-base md:text-lg">from 180 zł</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Częstochowa - Jasna Góra */}
            <Link href="/book/czestochowa" className="group">
              <div className="relative h-64 md:h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img 
                  src="/images/czestochowa.jpg" 
                  alt="Częstochowa"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-black/40 via-black/30 to-black/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base md:text-lg">Częstochowa</h3>
                    <p className="text-blue-200 font-semibold text-base md:text-lg">from 280 zł</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Wadowice */}
            <Link href="/book/wadowice" className="group">
              <div className="relative h-64 md:h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img 
                  src="/images/wadowice.jpg" 
                  alt="Wadowice"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-black/40 via-black/30 to-black/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base md:text-lg">Wadowice</h3>
                    <p className="text-blue-200 font-semibold text-base md:text-lg">from 140 zł</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Kraków City Center */}
            <Link href="/book/krakow" className="group">
              <div className="relative h-64 md:h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img 
                  src="/images/Krakow.jpg" 
                  alt="Kraków"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-black/40 via-black/30 to-black/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base md:text-lg">Kraków City Center</h3>
                    <p className="text-blue-200 font-semibold text-base md:text-lg">from 80 zł</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Katowice */}
            <Link href="/book/katowice" className="group">
              <div className="relative h-64 md:h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img 
                  src="/images/Katowice.jpg" 
                  alt="Katowice"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-black/40 via-black/30 to-black/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base md:text-lg">Katowice</h3>
                    <p className="text-blue-200 font-semibold text-base md:text-lg">from 200 zł</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Warsaw */}
            <Link href="/book/warsaw" className="group">
              <div className="relative h-64 md:h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img 
                  src="/images/Warsaw.jpg" 
                  alt="Warsaw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-black/40 via-black/30 to-black/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base md:text-lg">Warsaw</h3>
                    <p className="text-blue-200 font-semibold text-base md:text-lg">from 600 zł</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Wrocław */}
            <Link href="/book/wroclaw" className="group">
              <div className="relative h-64 md:h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img 
                  src="/images/Wroclaw.jpg" 
                  alt="Wrocław"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-black/40 via-black/30 to-black/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base md:text-lg">Wrocław</h3>
                    <p className="text-blue-200 font-semibold text-base md:text-lg">from 550 zł</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* CTA Section - Professional Design */}
          <div className="relative overflow-hidden bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl shadow-lg border border-gray-200 mt-12">
            <div className="relative max-w-4xl mx-auto px-6 py-10 md:py-14">
              <div className="text-center">
                <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                  Custom Transfer to Any Location in Poland
                </h3>
                
                <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Professional door-to-door service with fixed prices and experienced drivers
                </p>

                {/* CTA Button */}
                <button 
                  onClick={() => {
                    const formElement = document.getElementById('booking-form');
                    if (formElement) {
                      const yOffset = -100; // offset dla headera
                      const y = formElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
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

      {/* Footer - Modern Clean Design */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-lg text-gray-900">Krakow Transfer</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Professional airport and city transfers in Poland. Available 24/7.
              </p>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-xs text-gray-700 font-medium">4.9/5 • 500+ reviews</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-4">Popular Routes</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/book/auschwitz-birkenau" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Auschwitz-Birkenau
                  </Link>
                </li>
                <li>
                  <Link href="/book/wieliczka-salt-mine" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Wieliczka Salt Mine
                  </Link>
                </li>
                <li>
                  <Link href="/book/zakopane" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Zakopane Mountains
                  </Link>
                </li>
                <li>
                  <Link href="/book/krakow" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Kraków Airport
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <p className="text-xs text-gray-500 mb-0.5">Phone (24/7)</p>
                  <a href="tel:+48123456789" className="text-sm text-gray-900 hover:text-blue-600 transition-colors font-medium">
                    +48 123 456 789
                  </a>
                </li>
                <li>
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <a href="mailto:contact@transfer.pl" className="text-sm text-gray-900 hover:text-blue-600 transition-colors font-medium">
                    contact@transfer.pl
                  </a>
                </li>
                <li>
                  <p className="text-xs text-gray-500 mb-0.5">Service Area</p>
                  <p className="text-sm text-gray-900 font-medium">Kraków & All Poland</p>
                </li>
              </ul>
            </div>

            {/* Airports */}
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-4">Main Airports</h4>
              <ul className="space-y-2">
                <li className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-sm text-gray-900 font-medium mb-0.5">Kraków (KRK)</p>
                  <p className="text-xs text-gray-500">20 km from city center</p>
                </li>
                <li className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-sm text-gray-900 font-medium mb-0.5">Katowice (KTW)</p>
                  <p className="text-xs text-gray-500">80 km from Kraków</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-xs text-center sm:text-left">
                © 2025 Krakow Transfer. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="#" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
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
