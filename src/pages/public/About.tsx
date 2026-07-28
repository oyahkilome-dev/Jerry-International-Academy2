import React from 'react';
import { ArrowRight, BookOpen, BrainCircuit, Heart, Lightbulb, MonitorPlay, ShieldCheck, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as motion from 'motion/react-client';

export default function About() {
  const features = [
    { title: "Qualified Teachers", desc: "Our passionate educators inspire students through engaging, modern teaching methods.", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Safe Learning Environment", desc: "A secure and caring environment where every child feels respected and valued.", icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50" },
    { title: "Digital Learning", desc: "Technology-enhanced classrooms preparing learners for the future.", icon: MonitorPlay, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Holistic Development", desc: "Academic excellence combined with sports, arts, leadership, and creativity.", icon: BrainCircuit, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Parent Partnership", desc: "Strong collaboration between school and families to support every learner's success.", icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
    { title: "Future Ready", desc: "Preparing confident, responsible, and globally minded students.", icon: Target, color: "text-amber-500", bg: "bg-amber-50" }
  ];

  const philosophy = [
    "Student-centered learning",
    "Critical thinking",
    "Creativity and innovation",
    "Technology integration",
    "Character development",
    "Leadership skills",
    "Collaboration",
    "Effective communication"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-500 font-bold uppercase tracking-wider text-sm mb-4"
          >
            About Jerry International Academy
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Building Bright Minds, Shaping Great Futures
          </motion.h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-blue-100 rounded-3xl transform -rotate-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" 
                alt="Students learning in class" 
                className="relative rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Welcome to Our Community</h2>
              <div className="prose prose-lg text-slate-600">
                <p className="mb-4">
                  Jerry International Academy is a modern learning community committed to providing high-quality education for Nursery, Primary, and Secondary School learners. We believe every child is unique and deserves an environment that nurtures academic excellence, creativity, confidence, leadership, and strong moral character.
                </p>
                <p>
                  Our school combines innovative teaching methods, experienced educators, technology-driven learning, and a caring atmosphere to help every learner reach their full potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
              <div className="prose prose-lg text-slate-600">
                <p className="mb-4">
                  Founded with a passion for transforming lives through education, Jerry International Academy was established to provide children with a safe, inspiring, and supportive environment where learning becomes enjoyable and meaningful.
                </p>
                <p className="mb-4">
                  We believe education extends beyond textbooks. Every classroom experience is designed to encourage curiosity, creativity, teamwork, discipline, and independent thinking.
                </p>
                <p>
                  By partnering closely with parents, we create a strong foundation that prepares learners for success in school, higher education, and life.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80" 
                alt="Teacher interacting with pupils" 
                className="rounded-2xl shadow-md w-full h-48 sm:h-64 object-cover" 
              />
              <img 
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80" 
                alt="Happy parents and children" 
                className="rounded-2xl shadow-md w-full h-48 sm:h-64 object-cover mt-8" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Educational Philosophy */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Educational Philosophy</h2>
            <p className="text-xl text-blue-100">At Jerry International Academy, we believe that every child learns differently.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {philosophy.map((item, idx) => (
              <div key={idx} className="bg-blue-800/60 backdrop-blur-md border border-blue-700 p-6 rounded-xl text-center hover:bg-blue-700/60 transition-colors">
                <Lightbulb className="h-8 w-8 text-orange-400 mx-auto mb-4" />
                <h3 className="font-bold text-lg">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Makes Us Different</h2>
            <p className="text-lg text-slate-600">Discover the unique advantages of our educational approach.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
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

      {/* Images Row */}
      <section className="py-10 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img 
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80" 
              alt="School library" 
              className="rounded-xl shadow-sm w-full h-48 object-cover" 
            />
            <img 
              src="https://images.unsplash.com/photo-1571260899304-42507011ec7a?auto=format&fit=crop&w=600&q=80" 
              alt="ICT laboratory" 
              className="rounded-xl shadow-sm w-full h-48 object-cover" 
            />
            <img 
              src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=80" 
              alt="School playground" 
              className="rounded-xl shadow-sm w-full h-48 object-cover" 
            />
          </div>
        </div>
      </section>

      {/* Our Promise & CTA */}
      <section className="bg-orange-500 py-24 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <BookOpen className="h-12 w-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Our Promise</h2>
          <p className="text-orange-50 text-xl font-light leading-relaxed mb-16 italic max-w-3xl mx-auto">
            "At Jerry International Academy, we are committed to helping every learner discover their strengths, develop confidence, embrace lifelong learning, and become responsible citizens who positively impact their communities."
          </p>
          
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Join the Jerry International Academy Family</h3>
            <p className="text-orange-50 text-lg mb-10">
              We warmly welcome families who are seeking a school where academic excellence, innovation, discipline, and character development go hand in hand.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/admissions" 
                className="px-8 py-4 rounded-full font-bold text-orange-600 bg-white hover:bg-slate-50 shadow-lg transition-all hover:-translate-y-1"
              >
                Apply for Admission
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 rounded-full font-bold text-white bg-orange-600 hover:bg-orange-700 border border-orange-400 transition-all hover:-translate-y-1"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
