
import React from 'react';
import { Car } from '../types';
import { Users, Fuel, CheckCircle2, Info, ShieldAlert, ArrowRight, Eye } from 'lucide-react';

interface FleetSectionProps {
  onSelectCar: (carId: string) => void;
}

const CARS: Car[] = [
  {
    id: 'prius-2013',
    name: '2013 Toyota Prius Five',
    type: 'Hybrid Wagon (V)',
    pricePerDay: 45,
    image: 'https://images.unsplash.com/photo-1594070319944-7c0c63146b7a?q=80&w=2070&auto=format&fit=crop', 
    features: [
      '60% more cargo capacity than standard',
      '34 cubic feet of rear cargo space',
      'Sliding & Reclining rear seats',
      'Fold-flat front passenger seat',
      'Caters to family-oriented shoppers'
    ],
    mpg: '44 City / 40 Hwy',
    seats: 5
  },
  {
    id: 'chrysler-2014',
    name: '2014 Chrysler Town & Country',
    type: '30th Anniversary Edition',
    pricePerDay: 45,
    image: 'input_file_2.png',
    features: [
      'Nappa leather bolsters & Alcantara inserts',
      '17-inch Satin Carbon alloy wheels',
      'Super Center Console & Piano Black trim',
      '30th Anniversary badging & stitching',
      'Touring-L base with premium upgrades'
    ],
    mpg: '17 City / 25 Hwy',
    seats: 7
  }
];

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectCar }) => {
  return (
    <section id="fleet" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-black text-slate-900 sm:text-6xl tracking-tighter mb-4">
              Meet Our <span className="text-indigo-700 underline decoration-[#EF4444] decoration-4 underline-offset-8">Fleet</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium max-w-xl">
              Spacious, efficient, and meticulously cared for. Perfect for any journey.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-50 text-[#EF4444] rounded-2xl text-sm font-black border border-red-100 shadow-sm">
            <ShieldAlert size={18} />
            Insurance Required By Customer
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {CARS.map((car) => (
            <div key={car.id} className="group flex flex-col bg-white rounded-[3rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] hover:shadow-2xl hover:border-indigo-100 transition-all duration-700 overflow-hidden">
              <div className="relative h-[400px] overflow-hidden bg-slate-100">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/1200x800/4338CA/FFFFFF?text=${encodeURIComponent(car.name)}`;
                  }}
                />
                <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl flex flex-col items-center">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Rate</span>
                  <span className="text-2xl font-black text-indigo-600">${car.pricePerDay}</span>
                  <span className="text-[10px] font-bold text-slate-500">per day</span>
                </div>
              </div>
              
              <div className="p-12">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 block mb-3">{car.type}</span>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-4">{car.name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-12">
                   <div className="bg-slate-50 p-6 rounded-[2rem] flex flex-col items-center text-center group-hover:bg-indigo-50 transition-colors">
                      <Users size={28} className="text-indigo-600 mb-3" />
                      <span className="text-xl font-black text-slate-900">{car.seats} Seats</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Capacity</span>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-[2rem] flex flex-col items-center text-center group-hover:bg-indigo-50 transition-colors">
                      <Fuel size={28} className="text-indigo-600 mb-3" />
                      <span className="text-xl font-black text-slate-900">{car.mpg.split(' ')[0]} MPG</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Efficiency</span>
                   </div>
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => onSelectCar(car.id)}
                    className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center justify-center gap-3 group/btn"
                  >
                    View Details & Info
                    <Eye size={20} className="group-hover/btn:scale-110 transition-transform" />
                  </button>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-[1.5rem] font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                  >
                    Quick Reserve <ArrowRight size={20} />
                  </button>
                </div>
                <div className="mt-6 flex items-center justify-center gap-2 opacity-60">
                   <ShieldAlert size={14} className="text-[#EF4444]" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#EF4444]">Personal Insurance Required</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
