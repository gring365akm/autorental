
import React, { useState } from 'react';
import { Send, CheckCircle, Calendar, User, Mail, Phone, Car as CarIcon, MapPin, ShieldCheck, CreditCard, Briefcase, MessageSquare } from 'lucide-react';

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"
];

export const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    carPreference: '2014 Chrysler Town & Country',
    startDate: '',
    endDate: '',
    licenseState: '',
    hasValidLicense: 'yes',
    isOver21: false,
    hasInsurance: false,
    contactMethod: 'text',
    pickupPreference: 'pickup',
    intendedUse: 'personal',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.isOver21 || !formData.hasInsurance) {
      alert("Please confirm your age and insurance coverage to proceed.");
      return;
    }

    // Simulate API call to save to database
    console.log('Capturing customer data for database:', formData);
    setSubmitted(true);
    
    // Reset form after 5 seconds to allow another booking
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        carPreference: '2014 Chrysler Town & Country',
        startDate: '',
        endDate: '',
        licenseState: '',
        hasValidLicense: 'yes',
        isOver21: false,
        hasInsurance: false,
        contactMethod: 'text',
        pickupPreference: 'pickup',
        intendedUse: 'personal',
        message: ''
      });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
  };

  if (submitted) {
    return (
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-indigo-100 text-center animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Booking Request Sent!</h3>
        <p className="text-slate-500 font-medium mb-8">
          Thank you, {formData.fullName.split(' ')[0]}. Matt will review your request and contact you via {formData.contactMethod} shortly to confirm availability.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all"
        >
          Send Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100">
      <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Reserve Your Vehicle</h3>
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <User className="text-indigo-600" size={18} />
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Contact Information</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
              <input
                required
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold transition-all"
              />
            </div>
            <div className="relative">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold transition-all"
              />
            </div>
            <div className="relative">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 000-0000"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold transition-all"
              />
            </div>
            <div className="relative">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Preferred Contact Method</label>
              <div className="flex gap-4 mt-2">
                {['text', 'email', 'phone'].map((method) => (
                  <label key={method} className={`flex-1 flex flex-col items-center p-3 rounded-2xl cursor-pointer border-2 transition-all ${formData.contactMethod === method ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100'}`}>
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={formData.contactMethod === method}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="text-xs font-black capitalize">{method}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* License & Verification */}
        <div className="space-y-6 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="text-indigo-600" size={18} />
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Driver Verification</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Driver's License State</label>
              <select
                required
                name="licenseState"
                value={formData.licenseState}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold transition-all appearance-none cursor-pointer"
              >
                <option value="">Select State</option>
                {US_STATES.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>
            <div className="relative">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Valid Driver's License?</label>
              <div className="flex gap-4 mt-2">
                {['yes', 'no'].map((ans) => (
                  <label key={ans} className={`flex-1 text-center py-4 rounded-2xl cursor-pointer border-2 transition-all font-bold ${formData.hasValidLicense === ans ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-slate-50 border-transparent text-slate-400'}`}>
                    <input
                      type="radio"
                      name="hasValidLicense"
                      value={ans}
                      checked={formData.hasValidLicense === ans}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="uppercase">{ans}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rental Details */}
        <div className="space-y-6 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <CarIcon className="text-indigo-600" size={18} />
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Rental Details</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Vehicle Preference</label>
              <select
                name="carPreference"
                value={formData.carPreference}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold transition-all appearance-none cursor-pointer"
              >
                <option>2014 Chrysler Town & Country</option>
                <option>2013 Toyota Prius Five</option>
              </select>
            </div>
            <div className="relative">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Intended Use</label>
              <select
                name="intendedUse"
                value={formData.intendedUse}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold transition-all appearance-none cursor-pointer"
              >
                <option value="personal">Personal Use</option>
                <option value="business">Business Trip</option>
                <option value="rideshare">Rideshare (Uber/Lyft)</option>
                <option value="travel">Long Distance Travel</option>
              </select>
            </div>
            <div className="relative">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Pickup/Delivery Preference</label>
              <select
                name="pickupPreference"
                value={formData.pickupPreference}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold transition-all appearance-none cursor-pointer"
              >
                <option value="pickup">Standard Pickup</option>
                <option value="delivery">Request Delivery (If Available)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Start Date</label>
                <input
                  required
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold transition-all text-xs"
                />
              </div>
              <div className="relative">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">End Date</label>
                <input
                  required
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold transition-all text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Legal Confirmations */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="text-[#EF4444]" size={18} />
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Legal & Insurance</h4>
          </div>
          <div className="space-y-3">
            <label className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors group">
              <div className="relative flex items-center mt-1">
                <input
                  required
                  type="checkbox"
                  name="isOver21"
                  checked={formData.isOver21}
                  onChange={handleChange}
                  className="w-6 h-6 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <span className="text-xs font-bold text-slate-600 leading-tight">
                I confirm I am at least 21 years old and meet the minimum age requirement for renting.
              </span>
            </label>
            <label className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors group">
              <div className="relative flex items-center mt-1">
                <input
                  required
                  type="checkbox"
                  name="hasInsurance"
                  checked={formData.hasInsurance}
                  onChange={handleChange}
                  className="w-6 h-6 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <span className="text-xs font-bold text-slate-600 leading-tight">
                I confirm I have valid auto insurance in my name that covers rental vehicles. I understand Matt's Auto Rental does not provide insurance.
              </span>
            </label>
          </div>
        </div>

        <div className="relative">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Special Notes / Requirements</label>
          <textarea
            name="message"
            rows={2}
            value={formData.message}
            onChange={handleChange}
            placeholder="Any other details Matt should know?"
            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold transition-all resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          Submit Detailed Request <Send size={20} />
        </button>
      </form>
    </div>
  );
};
