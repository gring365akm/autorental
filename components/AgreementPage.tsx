
import React from 'react';
import { FileText, CheckCircle, Mail, Clock, ShieldAlert, PenTool, ArrowLeft, Info, HelpCircle, ChevronRight } from 'lucide-react';

interface AgreementPageProps {
  onBack: () => void;
}

export const AgreementPage: React.FC<AgreementPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black uppercase tracking-widest text-sm transition-colors"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 border-b border-slate-100">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <FileText size={14} />
            Step-by-Step Process
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-[1.1]">
            Rental Agreement <br/><span className="text-indigo-600">& Next Steps</span>
          </h1>
          <p className="text-2xl text-slate-500 font-medium leading-relaxed mb-10">
            For your security and ours, every rental at Matt's Auto Rental requires a signed legal agreement before the vehicle can be released.
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Agreement Terms */}
            <div className="space-y-8">
              <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-sm border border-slate-200">
                <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-3">
                  <Info className="text-indigo-600" /> What's in the Agreement?
                </h2>
                <p className="text-slate-600 font-bold mb-8 leading-relaxed">
                  Our comprehensive Vehicle Rental Agreement protects both parties by clearly defining the terms of your rental. Key highlights include:
                </p>
                <div className="space-y-6">
                  {[
                    { title: "Insurance Requirements", desc: "Explicitly states that the renter provides their own valid auto insurance policy." },
                    { title: "Driver Responsibilities", desc: "Outlines basic maintenance (oil, anti-freeze, brake fluid/pads) and care rules." },
                    { title: "Rental Terms & Rates", desc: "Confirms the daily rate ($45/day), late return fees, and unlimited mileage policy." },
                    { title: "Tolls & Citations", desc: "Clarifies that the renter is responsible for all tolls and traffic violations incurred." },
                    { title: "Damage & Loss", desc: "Details financial responsibilities in the event of theft, damage, or loss of the vehicle." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-5">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-sm font-medium text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-50 p-10 rounded-[3rem] border border-red-100">
                 <div className="flex items-center gap-4 mb-4">
                    <ShieldAlert className="text-[#EF4444]" size={32} />
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Mandatory Requirement</h3>
                 </div>
                 <p className="text-red-800 font-bold leading-relaxed italic text-lg">
                   "No rental vehicle will be released to any customer until a signed Vehicle Rental Agreement is on file. This must be completed BEFORE your pickup time."
                 </p>
              </div>
            </div>

            {/* The Process */}
            <div className="space-y-8">
               <div className="bg-indigo-900 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                 <h2 className="text-3xl font-black mb-12 tracking-tight">How It Works</h2>
                 
                 <div className="space-y-12 relative">
                    {[
                      { icon: <FileText />, step: "1", title: "Book Your Vehicle", desc: "Submit your request through our online form or chat with Matt." },
                      { icon: <Clock />, step: "2", title: "Request Review", desc: "Matt reviews your documentation (license, insurance) and confirms availability." },
                      { icon: <Mail />, step: "3", title: "DocuSign Email", desc: "You will receive an automated email from DocuSign with your personalized agreement." },
                      { icon: <PenTool />, step: "4", title: "Electronic Signature", desc: "Review and sign the document on your phone or computer in minutes." },
                      { icon: <ChevronRight />, step: "5", title: "Vehicle Pickup", desc: "Once signed, we finalize the prep and you're ready to drive!" }
                    ].map((step, idx) => (
                      <div key={idx} className="flex gap-6 group">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 text-indigo-300">
                            {step.icon}
                          </div>
                          {idx !== 4 && <div className="w-0.5 h-12 bg-white/10 my-2" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                             <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Step {step.step}</span>
                          </div>
                          <h4 className="text-xl font-black tracking-tight">{step.title}</h4>
                          <p className="text-indigo-200/60 font-medium text-sm leading-relaxed mt-1">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                 </div>
               </div>

               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 text-center">
                  <HelpCircle className="text-indigo-600 mx-auto mb-6" size={48} />
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Questions?</h3>
                  <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                    If you have questions about specific terms or have trouble with the DocuSign email, please reach out.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                     <button 
                       onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView(); }}
                       className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all"
                     >
                       Contact Matt
                     </button>
                     <button 
                       className="flex-1 py-4 bg-indigo-50 text-indigo-700 border-2 border-indigo-100 rounded-2xl font-black text-sm hover:bg-indigo-100 transition-all"
                       onClick={() => window.scrollTo(0,0)}
                     >
                       Use AI Assistant
                     </button>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-white text-center">
         <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter">Ready to start your journey?</h2>
            <p className="text-xl text-slate-500 mb-10 font-medium">Browse our fleet and submit your booking request today.</p>
            <button 
              onClick={onBack}
              className="px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
            >
              Back to Our Fleet
            </button>
         </div>
      </section>
    </div>
  );
};
