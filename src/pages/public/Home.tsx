import React from 'react';
import { ArrowRight, Monitor, ShieldCheck, UserCheck, Users, Award, Star, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as motion from 'motion/react-client';

export default function Home() {
  const whyChooseUs = [
    { title: "Experienced Teachers", desc: "Highly qualified and dedicated educators committed to your child's success.", icon: UserCheck, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Modern Classrooms", desc: "State-of-the-art facilities equipped with modern learning tools.", icon: Monitor, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Safe Learning Environment", desc: "A secure and nurturing campus where students feel safe and supported.", icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50" },
    { title: "ICT & Digital Learning", desc: "Integrating technology to prepare students for a digital future.", icon: Monitor, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Small Class Sizes", desc: "Ensuring personalized attention and tailored instruction for every student.", icon: Users, color: "text-rose-500", bg: "bg-rose-50" },
    { title: "Excellent Academic Standards", desc: "A rigorous curriculum designed to challenge and inspire excellence.", icon: Award, color: "text-amber-500", bg: "bg-amber-50" }
  ];

  const coreValues = [
    "Excellence", "Integrity", "Respect", "Innovation",
    "Leadership", "Responsibility", "Compassion", "Teamwork"
  ];

  const quickFacts = [
    "Nursery School", "Primary School", "Secondary School", "Qualified Teachers",
    "Modern Learning Facilities", "Digital Learning", "Safe Environment", "Character Development"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-32 lg:py-48">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-slate-900/80 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-60 z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl leading-tight"
          >
            Welcome to Jerry International Academy
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl font-medium leading-relaxed"
          >
            Providing quality Nursery, Primary, and Secondary education in a safe, caring, and inspiring learning environment where every child is encouraged to achieve excellence, build confidence, and become a future leader.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              to="/admissions" 
              className="inline-flex justify-center items-center px-8 py-4 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1"
            >
              Apply for Admission <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex justify-center items-center px-8 py-4 rounded-full font-bold text-slate-900 bg-white hover:bg-slate-50 shadow-lg transition-all hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-100 rounded-3xl transform rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" 
                  alt="Students learning together" 
                  className="relative rounded-2xl shadow-xl w-full h-[500px] object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h4 className="text-orange-500 font-bold uppercase tracking-wider text-sm mb-2">Learning Today, Leading Tomorrow.</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">A Place Where Every Child Thrives</h2>
              <div className="prose prose-lg text-slate-600">
                <p className="mb-4">
                  At Jerry International Academy, we believe education goes beyond the classroom. Our commitment is to nurture every child's academic ability, creativity, confidence, discipline, and leadership potential.
                </p>
                <p>
                  Through innovative teaching methods, experienced educators, modern facilities, and strong moral values, we prepare our pupils and students to excel academically and become responsible citizens in an ever-changing world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-slate-600">Discover the advantages of a Jerry International Academy education.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
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

      {/* Core Values */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-blue-100">The guiding principles that shape our school community.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => (
              <div key={idx} className="bg-blue-800/50 backdrop-blur-sm border border-blue-700 p-6 rounded-xl text-center hover:bg-blue-700/50 transition-colors">
                <Star className="h-6 w-6 text-orange-400 mx-auto mb-3" />
                <h3 className="font-bold text-lg">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Quick Facts</h2>
            <p className="text-lg text-slate-600">What makes Jerry International Academy stand out.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickFacts.map((fact, idx) => (
              <div key={idx} className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                <span className="font-bold text-slate-800">{fact}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Child's Journey Today</h2>
          <p className="text-orange-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Admissions are open. Join a school where excellence, innovation, and character development come together to shape tomorrow's leaders.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/admissions" 
              className="px-8 py-4 rounded-full font-bold text-orange-600 bg-white hover:bg-slate-50 shadow-lg transition-all hover:-translate-y-1"
            >
              Apply Now
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 rounded-full font-bold text-white bg-orange-600 hover:bg-orange-700 border border-orange-400 transition-all hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
