
import React from 'react';
import { ArrowLeft, CheckCircle2, Info, Fuel, Users, ShieldAlert, Zap, Box, Star, Calendar } from 'lucide-react';
import { ContactForm } from './ContactForm';

interface VehiclePageProps {
  vehicleId: 'prius' | 'chrysler';
  onBack: () => void;
}

const VEHICLE_DATA = {
  prius: {
    name: '2013 Toyota Prius Five',
    type: 'Hybrid Wagon (V Model)',
    tagline: 'The Ultimate Efficiency Champion',
    image: 'https://images.unsplash.com/photo-1594070319944-7c0c63146b7a?q=80&w=2070&auto=format&fit=crop',
    description: 'The Prius V (for "Versatility") is the spacious wagon version of the world\'s most famous hybrid. Our 2013 Five trim offers premium features and incredible cargo capacity without sacrificing that legendary fuel economy. Perfect for eco-conscious families or those who need extra space for gear.',
    specs: {
      engine: '1.8L 4-Cylinder Hybrid',
      transmission: 'CVT Automatic',
      mpg: '44 City / 40 Highway',
      cargo: '34.3 cu. ft. (seats up) / 67.3 cu. ft. (seats down)',
      seats: 5,
      features: ['LED Headlights', '17-inch Alloy Wheels', 'SofTex-trimmed Seats', 'Backup Camera', 'Smart Key System']
    },
    pertinentInfo: [
      'Low Fuel Cost: Save significantly on gas during long trips.',
      'Sliding Rear Seats: Maximize legroom or cargo space depending on your needs.',
      'Fold-Flat Front Passenger Seat: Fits items up to 8 feet long.',
      'Eco Driving Modes: Switch between EV, Eco, and Power modes easily.',
      'Quiet Operation: Hybrid tech ensures a serene cabin experience.'
    ]
  },
  chrysler: {
    name: '2014 Chrysler Town & Country',
    type: '30th Anniversary Edition',
    tagline: 'Premium Family Luxury & Comfort',
    image: 'input_file_2.png',
    description: 'Celebrate three decades of the minivan that started it all. This 30th Anniversary Edition is loaded with luxury, from the Nappa leather upholstery to the Piano Black interior accents. With Stow \'n Go seating and a smooth V6 engine, it\'s the gold standard for road trips and group travel.',
    specs: {
      engine: '3.6L Pentastar V6',
      transmission: '6-Speed Automatic',
      mpg: '17 City / 25 Highway',
      cargo: '33 cu. ft. / 143.8 cu. ft. max',
      seats: 7,
      features: ['Nappa Leather Bolsters', 'Stow \'n Go Seating', 'Dual Screen Entertainment', 'Power Sliding Doors', 'Super Center Console']
    },
    pertinentInfo: [
      'Stow \'n Go Seating: Fold the second and third row into the floor in seconds.',
      'Entertainment System: Keep everyone happy with the rear-seat DVD/Blu-ray player.',
      'Safety Record: Equipped with Blind Spot Monitoring and Rear Cross Path Detection.',
      'Luxury Finish: Satin Carbon wheels and special anniversary badging.',
      'V6 Power: Plenty of passing power even when fully loaded with 7 passengers.'
    ]
  }
};

export const VehiclePage: React.FC<VehiclePageProps> = ({ vehicleId, onBack }) => {
  const car = VEHICLE_DATA[vehicleId];

  return (
    <div className="bg-white min-h-screen">
      {/* Header / Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black uppercase tracking-widest text-sm transition-colors"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Main Page
        </button>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
              {car.type}
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-none">
              {car.name}
            </h1>
            <p className="text-2xl text-slate-500 font-medium mb-10 italic">
              "{car.tagline}"
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl text-indigo-600"><Fuel size={24} /></div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase">Efficiency</p>
                  <p className="text-xl font-black text-slate-900">{car.specs.mpg.split(' ')[0]} MPG</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl text-indigo-600"><Users size={24} /></div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase">Capacity</p>
                  <p className="text-xl font-black text-slate-900">{car.specs.seats} Seats</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
             <div className="absolute -inset-4 bg-indigo-100/50 rounded-[4rem] blur-2xl -z-10" />
             <img 
               src={car.image} 
               alt={car.name} 
               className="rounded-[3rem] shadow-2xl border-4 border-white w-full object-cover h-[500px]"
               onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/800x600/4338CA/FFFFFF?text=${car.name}`; }}
             />
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Description & Pertinent Info */}
            <div className="lg:col-span-2 space-y-12">
              <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100">
                <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight flex items-center gap-3">
                  <Info className="text-indigo-600" /> Vehicle Overview
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  {car.description}
                </p>
              </div>

              <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100">
                <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-3">
                  <Zap className="text-[#EF4444]" /> Pertinent Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {car.pertinentInfo.map((info, idx) => (
                    <div key={idx} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                      <p className="text-slate-700 font-bold leading-tight">{info}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Specs Sidebar */}
            <div className="space-y-8">
              <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                <h3 className="text-2xl font-black mb-8 border-b border-white/10 pb-4">Tech Specs</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Engine', value: car.specs.engine },
                    { label: 'Transmission', value: car.specs.transmission },
                    { label: 'Cargo Space', value: car.specs.cargo },
                  ].map((spec, idx) => (
                    <div key={idx}>
                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1">{spec.label}</p>
                      <p className="text-lg font-bold">{spec.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-8 border-t border-white/10">
                   <h4 className="text-xs font-black uppercase tracking-widest text-indigo-300 mb-4">Included Features</h4>
                   <ul className="space-y-3 font-bold text-sm">
                      {car.specs.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> {f}
                        </li>
                      ))}
                   </ul>
                </div>
              </div>

              <div className="bg-red-50 p-8 rounded-[3rem] border border-red-100 text-center">
                 <ShieldAlert className="text-[#EF4444] mx-auto mb-4" size={32} />
                 <h4 className="text-lg font-black text-slate-900 mb-2">Insurance Required</h4>
                 <p className="text-sm text-red-800 font-bold leading-relaxed">
                   Proof of valid personal insurance must be presented at the time of pickup.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Integration on Detail Page */}
      <section id="vehicle-booking" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Interested in the {car.name}?</h2>
            <p className="text-xl text-slate-500 font-medium">Complete the form below to start your reservation.</p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Footer Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-100 text-center">
         <button 
           onClick={onBack}
           className="px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
         >
           Return to Main Page
         </button>
      </div>
    </div>
  );
};
