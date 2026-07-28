import React from 'react';
import { Calendar, ArrowRight, Bell, Trophy, Star, Medal, Palette, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as motion from 'motion/react-client';

export default function News() {
  const latestNews = [
    {
      title: "New Academic Session Begins",
      date: "September 8, 2026",
      content: "Jerry International Academy warmly welcomes all new and returning students to another exciting academic session. We look forward to a year filled with learning, creativity, leadership, and excellence.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
      category: "Academic"
    },
    {
      title: "Coding & Robotics Club Launch",
      date: "September 18, 2026",
      content: "Students are introduced to coding, robotics, and digital innovation through hands-on learning experiences designed to prepare them for the future.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      category: "Extracurricular"
    },
    {
      title: "Inter-House Sports Competition",
      date: "October 15, 2026",
      content: "Our annual Inter-House Sports Competition encourages teamwork, discipline, healthy competition, and sportsmanship among students.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
      category: "Sports"
    },
    {
      title: "Cultural Day Celebration",
      date: "October 28, 2026",
      content: "Students proudly celebrate Nigeria's rich cultural diversity through traditional attire, music, dance, drama, and educational exhibitions.",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80",
      category: "Events"
    },
    {
      title: "Science & Innovation Fair",
      date: "November 14, 2026",
      content: "Students showcase creative science projects and innovative ideas while developing confidence, teamwork, and problem-solving skills.",
      image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=800&q=80",
      category: "Academic"
    },
    {
      title: "Christmas Carol & End-of-Term Celebration",
      date: "December 12, 2026",
      content: "Parents, students, and staff gather to celebrate the achievements of the term through music, performances, awards, and festive activities.",
      image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80",
      category: "Events"
    }
  ];

  const upcomingEvents = [
    { title: "Parents Orientation", date: "September 12, 2026" },
    { title: "Career Day", date: "October 5, 2026" },
    { title: "Children's Day Celebration", date: "May 27" },
    { title: "Mid-Term Examination", date: "November 2, 2026" },
    { title: "Graduation Ceremony", date: "July 25, 2027" },
    { title: "Entrance Examination", date: "Monthly" }
  ];

  const achievements = [
    { title: "Academic Excellence", icon: Star, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Leadership Awards", icon: Trophy, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Sports Success", icon: Medal, color: "text-green-500", bg: "bg-green-50" },
    { title: "Creative Arts", icon: Palette, color: "text-purple-500", bg: "bg-purple-50" }
  ];

  const gallery = [
    { alt: "Classroom Learning", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80" },
    { alt: "Science Practical", url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80" },
    { alt: "ICT Laboratory", url: "https://images.unsplash.com/photo-1571260899304-42507011ec7a?auto=format&fit=crop&w=600&q=80" },
    { alt: "Sports Activities", url: "https://images.unsplash.com/photo-1526676037587-54381bf3e9f0?auto=format&fit=crop&w=600&q=80" },
    { alt: "Cultural Day", url: "https://images.unsplash.com/photo-1533222481259-ce20eda1e20b?auto=format&fit=crop&w=600&q=80" },
    { alt: "Graduation Ceremony", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-500 font-bold uppercase tracking-wider text-sm mb-4"
          >
            News & Events
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Latest News & Upcoming Events
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
          >
            Stay informed with the latest activities, achievements, announcements, and exciting events happening at Jerry International Academy.
          </motion.p>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <Bell className="h-8 w-8 text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold text-slate-900">Latest News</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((news, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                <div className="relative h-56 overflow-hidden">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {news.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center text-slate-500 text-sm font-medium mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    {news.date}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug">{news.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6 flex-grow">{news.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-blue-100 text-lg">Mark your calendars for these important school dates.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="bg-blue-800/50 backdrop-blur-sm border border-blue-700/50 p-6 rounded-xl flex items-start space-x-4 hover:bg-blue-700/50 transition-colors">
                <div className="bg-blue-600 p-3 rounded-lg text-white">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white mb-1">{event.title}</h3>
                  <p className="text-blue-200 text-sm font-medium">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Celebrating Student Success</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              At Jerry International Academy, we celebrate every achievement—big and small. From academic excellence and sports competitions to leadership awards and creative arts, we encourage every learner to strive for personal growth and excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:shadow-md transition-shadow">
                <div className={`${achievement.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${achievement.color}`}>
                  <achievement.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{achievement.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Highlights */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Photo Highlights</h2>
            <Link to="/gallery" className="hidden sm:inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
              View All Photos <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((photo, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-slate-200">
                <img 
                  src={photo.url} 
                  alt={photo.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <span className="text-white font-medium p-4">{photo.alt}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/gallery" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
              View All Photos <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Send className="h-12 w-12 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Stay Connected</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Subscribe to receive updates about school activities, admissions, events, academic calendars, and important announcements.
          </p>
          <form className="flex flex-col sm:flex-row max-w-xl mx-auto gap-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow px-6 py-4 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
              required
            />
            <button 
              type="submit" 
              className="px-8 py-4 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-orange-500 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Never Miss an Update</h2>
          <p className="text-orange-50 text-lg mb-10 max-w-2xl mx-auto">
            Follow Jerry International Academy for the latest school news, exciting events, and student achievements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="px-8 py-4 rounded-full font-bold text-orange-600 bg-white hover:bg-slate-50 shadow-lg transition-all hover:-translate-y-1"
            >
              Contact Us
            </Link>
            <Link 
              to="/admissions" 
              className="px-8 py-4 rounded-full font-bold text-white bg-orange-600 hover:bg-orange-700 border border-orange-400 transition-all hover:-translate-y-1"
            >
              Apply for Admission
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
