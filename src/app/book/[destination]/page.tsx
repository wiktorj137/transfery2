'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Star, CheckCircle } from 'lucide-react';
import TransferBookingForm from '@/components/TransferBookingForm';
import { useEffect } from 'react';

// Dane o destynacjach
const destinations = {
  'auschwitz-birkenau': {
    name: 'Auschwitz-Birkenau Memorial',
    shortName: 'Auschwitz',
    location: 'Oświęcim, Poland',
    distance: '70 km',
    duration: '1h 20min',
    price: 150,
    image: '/images/Auschwitz-Birkenau.jpg',
    description: 'Visit the world\'s most significant Holocaust memorial and museum. A powerful and deeply moving experience that provides essential historical context about one of humanity\'s darkest periods.',
    highlights: [
      'UNESCO World Heritage Site',
      'Professional guided tours available',
      'Authentic historical buildings preserved',
      'Museum with extensive exhibitions',
      'Memorial to 1.1 million victims',
      'Educational and deeply moving experience'
    ],
    whatToExpect: [
      'Visit both Auschwitz I and Birkenau camps',
      'See original barracks, watchtowers, and gas chambers',
      'Learn about the Holocaust through exhibits',
      'Pay respects at the memorial',
      'Understand the historical context',
      'Guided tours available in multiple languages'
    ],
    tips: [
      'Book your tour tickets in advance online',
      'Allow 3-4 hours for the full visit',
      'Dress respectfully and comfortably',
      'Photography is limited in certain areas',
      'Free entry but guided tours are recommended',
      'Visitor center has cafe and bookshop'
    ],
    coordinates: { lat: 50.0359, lng: 19.1783 }
  },
  'wieliczka-salt-mine': {
    name: 'Wieliczka Salt Mine',
    shortName: 'Salt Mine',
    location: 'Wieliczka, Poland',
    distance: '15 km',
    duration: '30min',
    price: 100,
    image: '/images/wieliczka-salt-mine.jpg',
    description: 'Explore one of the world\'s oldest operating salt mines, featuring stunning underground chambers, chapels carved entirely from salt, and beautiful underground lakes 135 meters below ground.',
    highlights: [
      'UNESCO World Heritage Site since 1978',
      'Over 700 years of mining history',
      'St. Kinga\'s Chapel - underground masterpiece',
      'Underground lakes and salt formations',
      'Temperature constant at 14-16°C year-round',
      'Over 1 million visitors annually'
    ],
    whatToExpect: [
      'Descend 135 meters underground via stairs',
      'Walk through 3km of underground passages',
      'See spectacular salt-carved chapels',
      'Marvel at underground lakes',
      'Learn about salt mining history',
      'Return to surface via elevator'
    ],
    tips: [
      'Book tickets online to avoid queues',
      'Tour lasts approximately 3 hours',
      'Wear comfortable walking shoes',
      'Bring a light jacket (14°C underground)',
      'Tours available in English daily',
      'Underground restaurant and souvenir shop'
    ],
    coordinates: { lat: 49.9836, lng: 20.0573 }
  },
  'zakopane': {
    name: 'Zakopane & Tatra Mountains',
    shortName: 'Zakopane',
    location: 'Zakopane, Poland',
    distance: '110 km',
    duration: '2h',
    price: 350,
    image: '/images/zakopane-tatry.jpg',
    description: 'Experience Poland\'s winter capital and premier mountain resort. Enjoy breathtaking views of the Tatra Mountains, traditional highland culture, skiing, hiking, and the famous Krupówki street.',
    highlights: [
      'Highest mountains in Poland (2,499m)',
      'Year-round mountain activities',
      'Traditional Góral (highland) culture',
      'Thermal baths and spa resorts',
      'Krupówki - vibrant pedestrian street',
      'Cable car to Kasprowy Wierch peak'
    ],
    whatToExpect: [
      'Stunning mountain panoramas',
      'Winter skiing and snowboarding',
      'Summer hiking and mountain biking',
      'Traditional wooden architecture',
      'Local highland cuisine (oscypek cheese)',
      'Thermal pools and wellness centers'
    ],
    tips: [
      'Winter season: December to March',
      'Summer hiking: June to September',
      'Try local oscypek grilled cheese',
      'Visit Gubałówka hill for panoramic views',
      'Krupówki street perfect for shopping',
      'Book thermal baths in advance'
    ],
    coordinates: { lat: 49.2992, lng: 19.9496 }
  },
  'dunajec-rafting': {
    name: 'Dunajec River Rafting',
    shortName: 'Dunajec Rafting',
    location: 'Pieniny Mountains, Poland',
    distance: '100 km',
    duration: '2h',
    price: 280,
    image: '/images/dunajec-river.jpg',
    description: 'Experience an unforgettable traditional wooden raft journey through the spectacular Dunajec River gorge in the Pieniny Mountains. One of Poland\'s most scenic outdoor adventures.',
    highlights: [
      'Pieniny National Park beauty',
      'Traditional wooden rafts (6-12 people)',
      'Spectacular limestone gorge',
      'Rafting since 1934 tradition',
      '18 km scenic river journey',
      'Expert Góral raftsmen guides'
    ],
    whatToExpect: [
      '2.5 hour rafting experience',
      'Navigate through limestone cliffs',
      'Listen to traditional folklore',
      'Photo opportunities at scenic spots',
      'Spot local wildlife and birds',
      'Return bus transfer included'
    ],
    tips: [
      'Best season: May to October',
      'Bring waterproof jacket just in case',
      'Wear comfortable water-resistant shoes',
      'Camera waterproof bag recommended',
      'Rafting runs even in light rain',
      'Combined with Trzy Korony mountain hike'
    ],
    coordinates: { lat: 49.4142, lng: 20.4167 }
  },
  'ojcow-national-park': {
    name: 'Ojców National Park',
    shortName: 'Ojców Park',
    location: 'Ojców, Poland',
    distance: '30 km',
    duration: '45min',
    price: 120,
    image: '/images/ojcow-park.jpg',
    description: 'Discover Poland\'s smallest but most beautiful national park featuring stunning limestone cliffs, mysterious caves, and the magnificent Pieskowa Skała Renaissance castle perched on a rocky outcrop.',
    highlights: [
      'Poland\'s smallest national park',
      'Pieskowa Skała Renaissance castle',
      'Hercules\' Club limestone rock formation',
      'Over 400 caves to explore',
      'Diverse flora and fauna',
      'Medieval castle ruins'
    ],
    whatToExpect: [
      'Visit Pieskowa Skała castle museum',
      'See Hercules\' Club rock formation',
      'Explore Łokietek\'s Cave',
      'Walk through Prądnik Valley',
      'Discover medieval ruins',
      'Enjoy scenic hiking trails'
    ],
    tips: [
      'Allow 3-4 hours for full visit',
      'Castle museum entrance fee 25 PLN',
      'Wear hiking shoes for trails',
      'Best visited spring through autumn',
      'Caves may be closed in winter',
      'Restaurant at castle available'
    ],
    coordinates: { lat: 50.2167, lng: 19.8167 }
  },
  'czestochowa': {
    name: 'Częstochowa - Jasna Góra Monastery',
    shortName: 'Częstochowa',
    location: 'Częstochowa, Poland',
    distance: '130 km',
    duration: '2h',
    price: 280,
    image: '/images/czestochowa.jpg',
    description: 'Visit Poland\'s most important Catholic shrine and home of the miraculous Black Madonna icon. Jasna Góra Monastery is a major pilgrimage destination visited by millions annually, including Pope John Paul II.',
    highlights: [
      'Home of the Black Madonna icon',
      'Poland\'s spiritual capital',
      'Pauline monastery founded 1382',
      'Stunning baroque architecture',
      '106-meter bell tower with panoramic views',
      'Visited by Pope John Paul II multiple times'
    ],
    whatToExpect: [
      'See the miraculous Black Madonna painting',
      'Visit the monastery museum',
      'Climb the bell tower for views',
      'Attend mass or prayer service',
      'Explore monastery complex',
      'Learn about pilgrimage traditions'
    ],
    tips: [
      'Black Madonna unveiled daily at specific times',
      'Dress modestly (religious site)',
      'Free entry, donations welcome',
      'Tower climb 5 PLN',
      'Photography restricted in chapel',
      'Pilgrimage season: May to October'
    ],
    coordinates: { lat: 50.8118, lng: 19.0947 }
  },
  'wadowice': {
    name: 'Wadowice - Pope John Paul II Birthplace',
    shortName: 'Wadowice',
    location: 'Wadowice, Poland',
    distance: '50 km',
    duration: '1h',
    price: 140,
    image: '/images/wadowice.jpg',
    description: 'Visit the charming town where Pope John Paul II was born. Explore his family home (now a museum), the church where he was baptized, and taste the famous Wadowice kremówka cream cake that the Pope loved.',
    highlights: [
      'Pope John Paul II Family Home Museum',
      'Church of the Presentation of Mary',
      'Baptismal font of Karol Wojtyła',
      'Famous kremówka (cream cake)',
      'Charming market square',
      'Rich papal memorabilia'
    ],
    whatToExpect: [
      'Tour the Pope\'s childhood home',
      'See personal belongings and photos',
      'Visit the baptismal church',
      'Explore interactive museum exhibits',
      'Taste authentic kremówka cake',
      'Walk the Pope\'s childhood streets'
    ],
    tips: [
      'Museum ticket: 15 PLN',
      'Audio guide available in English',
      'Try kremówka at Café Rynek',
      'Allow 2-3 hours for full visit',
      'Free parking near market square',
      'Combine with Kalwaria Zebrzydowska nearby'
    ],
    coordinates: { lat: 49.8894, lng: 19.4844 }
  }
};

export default function DestinationBookingPage() {
  const params = useParams();
  const router = useRouter();
  const destinationSlug = params.destination as string;
  const destination = destinations[destinationSlug as keyof typeof destinations];

  useEffect(() => {
    if (destination) {
      // Prefill location in the form
      const prefillData = {
        pickup: 'Kraków City Center',
        dropoff: destination.name,
        dropoffCoords: destination.coordinates
      };

      // Save to localStorage so the form can read it
      localStorage.setItem('booking_prefill', JSON.stringify(prefillData));
    }
  }, [destination]);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination not found</h1>
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:underline"
          >
            Return to homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Modern Header with Glass Effect */}
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

      {/* Hero Section - Improved */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent z-10"></div>
        
        {/* Image with Parallax Effect */}
        <div className="absolute inset-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
          />
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <div className="mb-4">
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium border border-white/30">
                  Popular Destination
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                {destination.name}
              </h1>
              
              {/* Info Cards */}
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 flex items-center gap-2 shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">{destination.location}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 flex items-center gap-2 shadow-lg">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">{destination.distance} • {destination.duration}</span>
                </div>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl px-4 py-3 flex items-center gap-2 shadow-lg">
                  <Star className="w-5 h-5 text-white fill-white" />
                  <span className="text-white font-bold">From {destination.price} PLN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - Redesigned */}
      <section className="py-16 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description Card */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">About This Destination</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {destination.description}
                </p>
              </div>

              {/* Highlights Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm p-8 border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  Highlights
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {destination.highlights.map((highlight, index) => (
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

              {/* What to Expect */}
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h3>
                <div className="space-y-3">
                  {destination.whatToExpect.map((item, index) => (
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

              {/* Practical Tips */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-sm p-8 border border-amber-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  💡 Practical Tips
                </h3>
                <div className="space-y-3">
                  {destination.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                      <span className="text-2xl">✓</span>
                      <span className="text-gray-700 pt-0.5">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Book With Us - Improved */}
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

            {/* Right Column - Booking Form (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
                  {/* Form with padding */}
                  <div className="p-4 sm:p-6">
                    <TransferBookingForm />
                  </div>
                </div>
                
                {/* Trust Badges */}
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
