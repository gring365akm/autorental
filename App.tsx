
import React, { useState, useEffect } from 'react';
import { Logo, COLORS } from './constants';
import { FleetSection } from './components/FleetSection';
import { VoiceAssistant } from './components/VoiceAssistant';
import { ContactForm } from './components/ContactForm';
import { VehiclePage } from './components/VehiclePage';
import { AgreementPage } from './components/AgreementPage';
import { ShieldAlert, Clock, MapPin, ChevronRight, MessageSquareText, Star, FileCheck, Info, Home, Heart, Award, FileText } from 'lucide-react';

export type ViewState = 'home' | 'prius' | 'chrysler' | 'agreement';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  // Smooth scroll to top when changing views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const scrollToSection = (id: string) => {
    if (view !== 'home') {
      setView('home');
      // Timeout to allow DOM update before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-16 lg:pt-36 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 rounded-l-[10rem]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="animate-in fade-in slide-in-from-left-12 duration-1000">
              <div className="flex items-center gap-2 mb-8">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Local & Trusted</span>
              </div>
              <h1 className="text-6xl lg:text-[5.5rem] font-black text-slate-900 leading-[1.05] tracking-tighter mb-10">
                Drive The <span className="text-indigo-600 italic">Difference.</span>
              </h1>
              <p className="text-2xl text-slate-500 mb-12 leading-relaxed max-w-xl font-medium">
                Rent our 2013 Prius V or the luxury 30th Anniversary Chrysler today. Both available for just <span className="text-indigo-600 font-black">$45 per day.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button onClick={() => scrollToSection('fleet')} className="px-12 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center gap-3 active:scale-95">
                  Explore Fleet <ChevronRight size={24} />
                </button>
                <button 
                  onClick={() => setIsVoiceOpen(true)}
                  className="px-12 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-[1.5rem] font-black text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-slate-100"
                >
                  <MessageSquareText size={24} className="text-indigo-600" /> AI Concierge
                </button>
              </div>
              <div className="mt-10 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-3">
                <ShieldAlert className="text-red-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-sm text-red-800 font-bold leading-tight">
                  Insurance Notice: Customers must provide their own valid insurance policy for all vehicle rentals.
                </p>
              </div>
            </div>
            <div className="relative animate-in fade-in slide-in-from-right-16 duration-1000">
              <div className="absolute -top-24 -right-24 w-[30rem] h-[30rem] bg-indigo-200/40 rounded-full blur-[100px] -z-10 animate-pulse" />
              <div className="relative">
                <img 
                  src="input_file_2.png" 
                  alt="Chrysler Town and Country" 
                  className="rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-white transform lg:rotate-3 hover:rotate-0 transition-all duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/1200x800/4338CA/FFFFFF?text=Chrysler+Town+and+Country";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FleetSection onSelectCar={(id) => setView(id === 'prius-2013' ? 'prius' : 'chrysler')} />

      {/* About Section */}
      <section id="about" className="py-32 bg-slate-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-indigo-100 rounded-full blur-[80px] -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1594070319944-7c0c63146b7a?q=80&w=2070&auto=format&fit=crop" 
                alt="About Matt's Auto Rental" 
                className="rounded-[4rem] shadow-2xl border-8 border-white transform -rotate-3 hover:rotate-0 transition-transform duration-700"
              />
              <div className="absolute -bottom-8 -right-8 bg-indigo-600 text-white p-10 rounded-[3rem] shadow-2xl">
                 <p className="text-5xl font-black">10+</p>
                 <p className="text-sm font-bold uppercase tracking-widest opacity-80">Years Excellence</p>
              </div>
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 block mb-4">Dedicated to You</span>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-8 leading-tight">
                Quality Rentals, <br/><span className="text-[#EF4444]">Personal</span> Touch.
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed font-medium">
                At Matt's Auto Rental, we believe in providing more than just a car. We provide the peace of mind you need for your family trips, business travels, or weekend getaways.
              </p>
              <div className="space-y-6">
                {[
                  { icon: <Heart className="text-indigo-600" />, title: "Customer Centric", desc: "Every rental is hand-cleaned and inspected by Matt himself before pickup." },
                  { icon: <Award className="text-indigo-600" />, title: "Premium Standards", desc: "Our 30th Anniversary Chrysler and Prius V are chosen for their reliability and features." },
                  { icon: <ShieldAlert className="text-red-500" />, title: "Safety First", desc: "Meticulous maintenance schedules ensure your family stays safe on the road." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-5">
                    <div className="p-4 bg-white rounded-2xl shadow-sm h-fit">{item.icon}</div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4 uppercase italic">Innovation <span className="text-indigo-600">meets</span> Reliability</h2>
             <div className="h-1.5 w-24 bg-[#EF4444] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: <FileCheck size={32} className="text-indigo-600" />, title: "Insurance Requirement", desc: "For your safety and ours, customers must present a valid personal insurance policy before every rental." },
              { icon: <Clock size={32} className="text-indigo-600" />, title: "24/7 AI Concierge", desc: "Our Gemini-powered voice assistant is ready to answer questions about the fleet and policies at any hour." },
              { icon: <MapPin size={32} className="text-indigo-600" />, title: "Local Service", desc: "We are a neighborhood rental service. No long lines, no hidden fees, just direct service from Matt." }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col p-10 rounded-[3rem] bg-slate-50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100">
                <div className="p-5 bg-white rounded-[1.5rem] mb-8 w-fit shadow-sm">{feature.icon}</div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="text-white">
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">Book Your <br/>Next <span className="text-[#EF4444]">Journey</span></h2>
              <p className="text-2xl text-indigo-100 mb-12 leading-relaxed font-medium opacity-90 max-w-lg">
                Fill out the form to request a reservation. We'll capture your details and Matt will personally reach out to finalize the booking.
              </p>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                    <MapPin className="text-indigo-400" size={32} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black">Location</h4>
                    <p className="text-indigo-200 font-bold opacity-80">Serving the greater area with local pickup.</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                    <MessageSquareText className="text-indigo-400" size={32} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black">Talk to Matt</h4>
                    <p className="text-indigo-200 font-bold opacity-80">Use the AI assistant or call us directly.</p>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setView('home')}>
              <Logo />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => setView('home')} className={`flex items-center gap-1 font-bold transition-colors ${view === 'home' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}>
                <Home size={18} /> Home
              </button>
              <button onClick={() => scrollToSection('fleet')} className="text-slate-600 hover:text-indigo-600 font-bold transition-colors">Our Fleet</button>
              <button onClick={() => setView('agreement')} className={`flex items-center gap-1 font-bold transition-colors ${view === 'agreement' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}>
                <FileText size={18} /> Agreement
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-slate-600 hover:text-indigo-600 font-bold transition-colors">Contact</button>
              <button 
                onClick={() => setIsVoiceOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-700 rounded-xl font-black hover:bg-indigo-100 transition-all border-2 border-indigo-100"
              >
                <MessageSquareText size={18} />
                AI Help
              </button>
              <button onClick={() => scrollToSection('contact')} className="px-6 py-2.5 bg-[#EF4444] text-white rounded-xl font-black hover:bg-red-600 transition-all shadow-lg shadow-red-100">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        {view === 'home' && renderHome()}
        {view === 'prius' && <VehiclePage vehicleId="prius" onBack={() => setView('home')} />}
        {view === 'chrysler' && <VehiclePage vehicleId="chrysler" onBack={() => setView('home')} />}
        {view === 'agreement' && <AgreementPage onBack={() => setView('home')} />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:col-span-4 lg:grid-cols-4 gap-20 mb-20">
            <div className="col-span-1 md:col-span-1">
              <Logo />
              <p className="mt-8 text-lg leading-relaxed font-medium">
                Matt's Auto Rental: Local service, premium vehicles, and modern support.
              </p>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Navigation</h4>
              <ul className="space-y-4 font-bold text-sm">
                <li><button onClick={() => setView('home')} className="hover:text-indigo-400 transition-colors">Home / Top</button></li>
                <li><button onClick={() => scrollToSection('fleet')} className="hover:text-indigo-400 transition-colors">View Fleet</button></li>
                <li><button onClick={() => setView('agreement')} className="hover:text-indigo-400 transition-colors">Rental Agreement</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-indigo-400 transition-colors">Contact / Book</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Our Fleet</h4>
              <ul className="space-y-4 font-bold text-sm">
                <li><button onClick={() => setView('prius')} className="hover:text-indigo-400 transition-colors">2013 Prius V (Hybrid)</button></li>
                <li><button onClick={() => setView('chrysler')} className="hover:text-indigo-400 transition-colors">2014 Chrysler T&C</button></li>
                <li><span className="text-red-400 font-black">Insurance Proof Required</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">AI Support</h4>
              <div className="p-4 bg-slate-800 rounded-2xl">
                 <p className="text-xs font-bold leading-relaxed mb-4">Click the indigo bubble to talk to our Concierge about any of the pages above.</p>
                 <button 
                  onClick={() => setIsVoiceOpen(true)}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg"
                 >
                   Open Concierge
                 </button>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-800 text-center text-sm font-bold opacity-50">
            <p>&copy; {new Date().getFullYear()} Matt's Auto Rental. All Rights Reserved. Insurance must be provided by user.</p>
          </div>
        </div>
      </footer>

      {/* Voice Assistant Overlay */}
      <VoiceAssistant isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />

      {/* Sticky Voice FAB */}
      {!isVoiceOpen && (
        <button 
          onClick={() => setIsVoiceOpen(true)}
          className="fixed bottom-10 right-10 p-6 bg-indigo-600 text-white rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.4)] z-30 hover:scale-110 active:scale-95 transition-all animate-bounce group"
        >
          <div className="flex items-center gap-3">
            <MessageSquareText size={28} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-black whitespace-nowrap">Ask AI Concierge</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default App;
