'use client';

import { Plane, Shield, Clock, Star, ArrowRight } from 'lucide-react';
import TransferBookingForm from '@/components/TransferBookingForm';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plane className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Krakow Transfer</h1>
            </div>
            <div className="text-sm text-gray-600">
              📞 +48 123 456 789
            </div>
          </div>
        </div>
      </header>

      <section className="pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Airport Transfers <span className="text-blue-600">Krakow</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Professional transport to and from the airport. Comfortable, safe, on time.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">24/7 Service</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">Safe & Secure</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">Premium Quality</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Plane className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">Airport Specialist</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <TransferBookingForm />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 mb-3">
              <div className="w-8 h-px bg-blue-600"></div>
              <span>ORGANIZED TOURS</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Top Attractions from Kraków
            </h3>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              We organize comfortable transfers and tours to the most popular destinations around Kraków. 
              Visit Auschwitz, Wieliczka Salt Mine, Zakopane mountains, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#destinations"
                className="group bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span>Browse Destinations</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#destinations"
                className="group bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>See Prices</span>
              </a>
            </div>
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

      <section id="destinations" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Poland from Kraków
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Book comfortable private transfers to Poland&apos;s most iconic destinations. 
              Professional drivers, fixed prices, door-to-door service.
            </p>
          </div>

          {/* Featured Destinations - Large Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Auschwitz-Birkenau */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
              <img 
                src="/images/Auschwitz-Birkenau.jpg" 
                alt="Auschwitz-Birkenau Memorial"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    MOST VISITED
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    UNESCO Site
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Auschwitz-Birkenau Memorial</h3>
                <p className="text-gray-200 text-sm mb-4">
                  Visit the world&apos;s most significant Holocaust memorial and museum. 
                  A powerful and moving experience that should not be missed.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/80 text-sm">From Kraków</p>
                    <p className="text-white text-3xl font-bold">150 PLN</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-sm">70 km • 1h 20min</p>
                    <p className="text-white/60 text-xs mt-1">Oświęcim</p>
                  </div>
                </div>
                <Link href="/book/auschwitz-birkenau">
                  <button className="w-full bg-white text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                    Book Transfer
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Wieliczka Salt Mine */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
              <img 
                src="/images/wieliczka-salt-mine.jpg" 
                alt="Wieliczka Salt Mine"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    UNESCO Site
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Underground Wonder
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Wieliczka Salt Mine</h3>
                <p className="text-gray-200 text-sm mb-4">
                  Explore 700-year-old underground chambers, chapels carved from salt, 
                  and stunning underground lakes 135m below ground.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/80 text-sm">From Kraków</p>
                    <p className="text-white text-3xl font-bold">100 PLN</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-sm">15 km • 30min</p>
                    <p className="text-white/60 text-xs mt-1">Wieliczka</p>
                  </div>
                </div>
                <Link href="/book/wieliczka-salt-mine">
                  <button className="w-full bg-white text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                    Book Transfer
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Mountain Destinations */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏔️</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Mountain Adventures</h3>
                <p className="text-gray-600 text-sm">Breathtaking nature and outdoor activities</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Zakopane */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/images/zakopane-tatry.jpg" 
                    alt="Zakopane - Tatra Mountains"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      ⛷️ Winter Resort
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Zakopane & Tatra Mountains</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Poland&apos;s winter capital. Skiing, hiking, traditional highland culture, and stunning mountain views.
                  </p>
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-sm text-gray-500">From Kraków</p>
                      <p className="text-2xl font-bold text-green-600">350 PLN</p>
                    </div>
                    <p className="text-sm text-gray-500">110 km • 2h</p>
                  </div>
                  <Link href="/book/zakopane">
                    <button className="w-full bg-green-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                      Book Transfer
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Dunajec Rafting */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/images/dunajec-river.jpg" 
                    alt="Dunajec River Rafting"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      🚣 Adventure
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Dunajec River Rafting</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Traditional wooden raft trip through spectacular Pieniny Mountains gorge. Unforgettable scenic experience.
                  </p>
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-sm text-gray-500">From Kraków</p>
                      <p className="text-2xl font-bold text-green-600">280 PLN</p>
                    </div>
                    <p className="text-sm text-gray-500">100 km • 2h</p>
                  </div>
                  <Link href="/book/dunajec-rafting">
                    <button className="w-full bg-green-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                      Book Transfer
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Ojców National Park */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/images/ojcow-park.jpg" 
                    alt="Ojców National Park"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      🏰 Castle
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Ojców National Park</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Stunning limestone cliffs, caves, and Pieskowa Skała Castle. Poland&apos;s smallest but most beautiful park.
                  </p>
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-sm text-gray-500">From Kraków</p>
                      <p className="text-2xl font-bold text-green-600">120 PLN</p>
                    </div>
                    <p className="text-sm text-gray-500">30 km • 45min</p>
                  </div>
                  <Link href="/book/ojcow-national-park">
                    <button className="w-full bg-green-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                      Book Transfer
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Religious & Historical Sites */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⛪</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Religious & Cultural Heritage</h3>
                <p className="text-gray-600 text-sm">Sacred places and pilgrimage sites</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Częstochowa */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-48 md:h-auto md:w-1/2 overflow-hidden">
                    <img 
                      src="/images/czestochowa.jpg" 
                      alt="Jasna Góra Monastery"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 md:w-1/2 flex flex-col">
                    <div className="mb-3">
                      <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        🙏 Pilgrimage Site
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Częstochowa - Jasna Góra</h4>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      Home of the Black Madonna icon. Poland&apos;s most important Catholic shrine, visited by millions annually.
                    </p>
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-sm text-gray-500">From Kraków</p>
                        <p className="text-2xl font-bold text-purple-600">280 PLN</p>
                      </div>
                      <p className="text-sm text-gray-500">130 km • 2h</p>
                    </div>
                    <Link href="/book/czestochowa">
                      <button className="w-full bg-purple-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                        Book Transfer
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Wadowice */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-48 md:h-auto md:w-1/2 overflow-hidden">
                    <img 
                      src="/images/wadowice.jpg" 
                      alt="Wadowice - Pope John Paul II"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 md:w-1/2 flex flex-col">
                    <div className="mb-3">
                      <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        👑 Pope&apos;s Birthplace
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Wadowice</h4>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      Birthplace of Pope John Paul II. Visit his family home, now a museum, and the church where he was baptized.
                    </p>
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-sm text-gray-500">From Kraków</p>
                        <p className="text-2xl font-bold text-purple-600">140 PLN</p>
                      </div>
                      <p className="text-sm text-gray-500">50 km • 1h</p>
                    </div>
                    <Link href="/book/wadowice">
                      <button className="w-full bg-purple-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                        Book Transfer
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Airport & City Transfers */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Plane className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Airport & City Transfers</h3>
                <p className="text-gray-600 text-sm">Comfortable door-to-door service</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Kraków City Center */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src="/images/Krakow.jpg" 
                    alt="Kraków City Center"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-base font-bold text-gray-900 mb-3">To Kraków City Center</h4>
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">From airport</p>
                      <p className="text-2xl font-bold text-blue-600">80 PLN</p>
                    </div>
                    <p className="text-xs text-gray-500">20 km<br/>25min</p>
                  </div>
                  <Link href="/book/krakow">
                    <button className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      Book Transfer
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Katowice */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src="/images/Katowice.jpg" 
                    alt="Katowice"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-base font-bold text-gray-900 mb-3">To Katowice</h4>
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">From Kraków</p>
                      <p className="text-2xl font-bold text-blue-600">200 PLN</p>
                    </div>
                    <p className="text-xs text-gray-500">80 km<br/>1.5h</p>
                  </div>
                  <Link href="/book/katowice">
                    <button className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      Book Transfer
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Warsaw */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src="/images/Warsaw.jpg" 
                    alt="Warsaw"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-base font-bold text-gray-900 mb-3">To Warsaw</h4>
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">From Kraków</p>
                      <p className="text-2xl font-bold text-blue-600">650 PLN</p>
                    </div>
                    <p className="text-xs text-gray-500">300 km<br/>3h</p>
                  </div>
                  <Link href="/book/warsaw">
                    <button className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      Book Transfer
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Wrocław */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src="/images/Wroclaw.jpg" 
                    alt="Wrocław"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-base font-bold text-gray-900 mb-3">To Wrocław</h4>
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">From Kraków</p>
                      <p className="text-2xl font-bold text-blue-600">550 PLN</p>
                    </div>
                    <p className="text-xs text-gray-500">270 km<br/>3h</p>
                  </div>
                  <Link href="/book/wroclaw">
                    <button className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      Book Transfer
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 text-center hover:shadow-2xl transition-shadow duration-300">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🗺️</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Can&apos;t Find Your Destination?</h3>
                <p className="text-lg text-gray-600 mb-8">
                  We offer private transfers to anywhere in Poland. Just enter your destination in the booking form above!
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-blue-50 px-5 py-3 rounded-lg border border-blue-100">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Licensed Drivers</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-5 py-3 rounded-lg border border-blue-100">
                  <Star className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Premium Vehicles</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-5 py-3 rounded-lg border border-blue-100">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">24/7 Available</span>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                * Prices shown are for Standard vehicle (1-4 passengers). Premium, Van, and VIP options available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Krakow Airport Transfer</h4>
              <p className="text-gray-400 text-sm">
                Professional transport to and from the airport. Available 24/7.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <p className="text-gray-400 text-sm">📞 +48 123 456 789</p>
              <p className="text-gray-400 text-sm">📧 contact@transfer.pl</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">We Serve</h4>
              <p className="text-gray-400 text-sm">Kraków-Balice Airport</p>
              <p className="text-gray-400 text-sm">Katowice-Pyrzowice Airport</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Krakow Transfer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
