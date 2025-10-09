'use client';

import { Plane, Shield, Clock, Star } from 'lucide-react';
import TransferBookingForm from '@/components/TransferBookingForm';

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

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Routes & Pricing</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Airport → City Center</h3>
              <p className="text-3xl font-bold text-blue-600 mb-1">80 PLN</p>
              <p className="text-sm text-gray-500">~25 min</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Airport → Zakopane</h3>
              <p className="text-3xl font-bold text-blue-600 mb-1">280 PLN</p>
              <p className="text-sm text-gray-500">~2h</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Airport → Katowice</h3>
              <p className="text-3xl font-bold text-blue-600 mb-1">180 PLN</p>
              <p className="text-sm text-gray-500">~1.5h</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Airport → Wieliczka</h3>
              <p className="text-3xl font-bold text-blue-600 mb-1">100 PLN</p>
              <p className="text-sm text-gray-500">~30 min</p>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-8 text-sm">
            * Prices may vary depending on time and day of the week
          </p>
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
