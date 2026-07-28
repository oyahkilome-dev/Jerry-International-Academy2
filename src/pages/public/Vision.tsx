import React from 'react';
import { BookOpen, Lightbulb, Globe, Award, Sprout, Heart, Eye, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as motion from 'motion/react-client';

export default function Vision() {
  const practices = [
    { title: "Academic Excellence", desc: "Maintaining high standards that inspire every learner to reach their full academic potential.", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Innovation", desc: "Integrating modern technology and creative learning experiences into everyday education.", icon: Lightbulb, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Global Perspective", desc: "Developing students who appreciate diversity and contribute positively to the global community.", icon: Globe, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Leadership", desc: "Empowering young minds to become responsible, confident, and ethical leaders.", icon: Award, color: "text-rose-500", bg: "bg-rose-50" },
    { title: "Lifelong Learning", desc: "Encouraging curiosity, resilience, and a passion for continuous personal growth.", icon: Sprout, color: "text-green-600", bg: "bg-green-50" },
    { title: "Community Impact", desc: "Building graduates who positively influence their families, communities, and society.", icon: Heart, color: "text-orange-500", bg: "bg-orange-50" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-500 font-bold uppercase tracking-wider text-sm mb-4"
          >
            Our Vision
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Shaping the Leaders of Tomorrow
          </motion.h1>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-2xl mb-8">
              <Eye className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Vision Statement</h2>
            <div className="prose prose-lg text-slate-600 mx-auto space-y-6">
              <p>
                At Jerry International Academy, our vision is to become a leading international institution recognized for excellence in education, innovation, character development, and global citizenship.
              </p>
              <p>
                We aspire to nurture confident, creative, and compassionate learners who are equipped with the knowledge, skills, and values needed to thrive in an ever-changing world. Our goal is to inspire every child to dream boldly, think critically, lead responsibly, and make a positive impact wherever they go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Future Aspiration */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Preparing Learners for a Brighter Future</h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                We envision a school where every learner is encouraged to explore new ideas, embrace technology, celebrate diversity, and develop a lifelong passion for learning. Through continuous improvement, innovative teaching practices, and strong partnerships with parents and the community, we strive to provide an educational experience that prepares students for higher education, successful careers, and meaningful lives.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80" 
                alt="Students learning" 
                className="rounded-2xl shadow-lg w-full h-48 sm:h-64 object-cover" 
              />
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" 
                alt="Teamwork" 
                className="rounded-2xl shadow-lg w-full h-48 sm:h-64 object-cover mt-8" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision in Practice */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Vision in Practice</h2>
            <p className="text-lg text-slate-600">How we are building towards our future aspirations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practices.map((practice, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className={`${practice.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${practice.color}`}>
                  <practice.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{practice.title}</h3>
                <p className="text-slate-600">{practice.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise & CTA */}
      <section className="bg-orange-500 py-24 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Sparkles className="h-12 w-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Our Promise For The Future</h2>
          <p className="text-orange-50 text-xl font-light leading-relaxed mb-16 italic max-w-3xl mx-auto">
            "At Jerry International Academy, our vision is not only to educate children but to inspire them to become innovators, problem-solvers, compassionate leaders, and responsible citizens who are prepared to shape a better future for themselves and the world."
          </p>
          
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Together, Let's Build a Brighter Future</h3>
            <p className="text-orange-50 text-lg mb-10">
              Join a learning community where excellence, innovation, integrity, and leadership come together to help every child succeed academically and personally.
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
