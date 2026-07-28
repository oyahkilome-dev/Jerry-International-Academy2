import React from 'react';
import { Target, CheckCircle2, Compass, Heart, Globe, Users, BookOpen, Lightbulb, ShieldCheck, Award } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function Mission() {
  const features = [
    { title: "Academic Excellence", desc: "Providing high-quality education that encourages outstanding academic achievement.", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Character Development", desc: "Instilling honesty, discipline, integrity, kindness, and respect.", icon: Heart, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Innovation", desc: "Using modern technology and creative teaching strategies to enhance learning.", icon: Lightbulb, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Safe Environment", desc: "Creating a secure and welcoming school where every child feels valued.", icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50" },
    { title: "Leadership", desc: "Empowering learners to become confident leaders and responsible citizens.", icon: Award, color: "text-rose-500", bg: "bg-rose-50" },
    { title: "Global Citizenship", desc: "Preparing students to thrive in a diverse and interconnected world.", icon: Globe, color: "text-amber-500", bg: "bg-amber-50" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-500 font-bold uppercase tracking-wider text-sm mb-4"
          >
            Our Mission
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Inspiring Excellence, Building Character
          </motion.h1>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-2xl mb-8">
              <Target className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Mission Statement</h2>
            <div className="prose prose-lg text-slate-600 mx-auto space-y-6">
              <p>
                At Jerry International Academy, our mission is to provide a nurturing, inclusive, and stimulating learning environment where every child is empowered to achieve academic excellence, develop strong moral values, and discover their unique talents.
              </p>
              <p>
                We are committed to delivering high-quality education through innovative teaching methods, experienced educators, and modern learning resources that inspire curiosity, creativity, and lifelong learning.
              </p>
              <p>
                Our goal is to raise confident, disciplined, compassionate, and responsible individuals who are prepared to succeed academically and contribute positively to their communities and the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Commitment to Every Child</h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                Every learner at Jerry International Academy deserves the opportunity to grow academically, socially, emotionally, and morally. We are dedicated to providing personalized attention, encouraging critical thinking, promoting creativity, and helping every child build confidence in their abilities.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80" 
                alt="Students learning" 
                className="rounded-2xl shadow-lg w-full h-48 sm:h-64 object-cover" 
              />
              <img 
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80" 
                alt="Teamwork" 
                className="rounded-2xl shadow-lg w-full h-48 sm:h-64 object-cover mt-8" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission in Action */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Mission in Action</h2>
            <p className="text-lg text-slate-600">How we bring our mission to life every day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className={`${feature.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.color}`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ending Message */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-relaxed italic">
            "At Jerry International Academy, our mission goes beyond academic success. We are dedicated to shaping future leaders who possess knowledge, confidence, compassion, resilience, and the determination to make a meaningful difference wherever life takes them."
          </h2>
        </div>
      </section>
    </div>
  );
}
