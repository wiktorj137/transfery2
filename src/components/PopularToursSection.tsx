'use client';

import Link from 'next/link';

/**
 * Popular Tours Section
 * Prosty, czytelny komponent - bez bajerów
 * Polski Senior Dev approved
 */

interface Tour {
  id: string;
  name: string;
  price: number;
  image: string;
  href: string;
}

const TOURS: Tour[] = [
  {
    id: '1',
    name: 'Auschwitz-Birkenau',
    price: 150,
    image: '/images/Auschwitz-Birkenau.jpg',
    href: '/book/auschwitz-birkenau',
  },
  {
    id: '2',
    name: 'Wieliczka Salt Mine',
    price: 100,
    image: '/images/wieliczka-salt-mine.jpg',
    href: '/book/wieliczka-salt-mine',
  },
  {
    id: '3',
    name: 'Zakopane & Tatras',
    price: 350,
    image: '/images/zakopane-tatry.jpg',
    href: '/book/zakopane',
  },
  {
    id: '4',
    name: 'Energylandia',
    price: 180,
    image: '/images/Energylandia.jpg',
    href: '/book/energylandia',
  },
];

export function PopularToursSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Popular Tours from <span className="text-blue-600">Kraków</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Comfortable transfers with professional guides to top attractions
          </p>
        </div>

        {/* Kafelki - wszystko na obrazku */}
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 md:gap-6 mb-8">
          {TOURS.map((tour) => (
            <Link
              key={tour.id}
              href={tour.href}
              className="group relative block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-64 md:h-72"
            >
              {/* Obrazek tło */}
              <img
                src={tour.image}
                alt={tour.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Treść - elegancki layout */}
              <div className="relative h-full flex flex-col justify-end">
                {/* Dolna część - jedno tło z nazwą i ceną */}
                <div className="bg-gradient-to-r from-black/40 via-black/30 to-black/20 backdrop-blur-md px-4 py-3.5 md:px-5 md:py-4">
                  <div className="flex items-center justify-between gap-4">
                    {/* Miejsce */}
                    <h3 className="font-bold text-white drop-shadow-lg whitespace-nowrap text-sm sm:text-base md:text-lg">
                      {tour.name}
                    </h3>
                    
                    {/* Cena - elegancki akcent */}
                    <div className="text-right">
                      <p className="text-xs text-white/70 leading-none mb-0.5">from</p>
                      <p className="text-lg md:text-xl font-bold text-white whitespace-nowrap leading-none">
                        {tour.price} zł
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => {
              const destinationsElement = document.getElementById('destinations');
              if (destinationsElement) {
                const yOffset = -100;
                const y = destinationsElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <span>View Popular Destinations</span>
          </button>
        </div>
      </div>
    </section>
  );
}
