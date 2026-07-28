import { CheckCircle2, FileText, Phone, Mail, MapPin, Download, ArrowRight, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admissions() {
  const steps = [
    { num: "01", title: "Inquiry", desc: "Contact our admissions office or fill out the online inquiry form." },
    { num: "02", title: "School Tour", desc: "Schedule a visit to explore our campus and meet our staff." },
    { num: "03", title: "Application", desc: "Submit the completed application form with required documents." },
    { num: "04", title: "Assessment", desc: "Applicants may be required to take a brief entrance assessment." },
    { num: "05", title: "Offer & Acceptance", desc: "Receive an offer letter and complete the enrollment process." }
  ];

  const documents = [
    "Completed Admission Form",
    "Two Recent Passport Photographs",
    "Birth Certificate or International Passport Data Page",
    "Previous Academic Records / Report Cards",
    "Medical Report / Immunization Records"
  ];

  const requirements = [
    { level: "Nursery", criteria: "Must be at least 3 years old by September of the admission year." },
    { level: "Primary", criteria: "Successful completion of nursery/kindergarten. Basic literacy and numeracy skills." },
    { level: "Secondary", criteria: "Successful completion of primary education. Satisfactory performance in the entrance examination." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <section className="bg-blue-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/30 rounded-xl backdrop-blur-sm mb-6">
            <UserPlus className="h-8 w-8 text-blue-200" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">Admissions</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
            Join the Jerry International Academy family. Your child's journey to excellence begins here.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Welcome to Our Admissions Process</h2>
              <div className="prose prose-lg text-slate-600 space-y-4">
                <p>
                  We are delighted that you are considering Jerry International Academy for your child's education. We welcome students from diverse backgrounds who demonstrate a passion for learning and a commitment to personal growth.
                </p>
                <p>
                  Our admissions process is designed to be transparent, straightforward, and welcoming. We look forward to guiding you through each step and answering any questions you may have.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Why Choose Jerry International Academy?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start"><CheckCircle2 className="h-6 w-6 text-green-500 mr-2 shrink-0" /><span>Academic Excellence & Innovative Curriculum</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-6 w-6 text-green-500 mr-2 shrink-0" /><span>State-of-the-art Facilities & Safe Environment</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-6 w-6 text-green-500 mr-2 shrink-0" /><span>Dedicated & Highly Qualified Educators</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-6 w-6 text-green-500 mr-2 shrink-0" /><span>Holistic Development & Extracurricular Activities</span></li>
                </ul>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80" alt="Students in class" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Admission Process</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Follow these simple steps to enroll your child at Jerry International Academy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center relative hover:-translate-y-1 transition-transform">
                <div className="text-5xl font-black text-slate-100 absolute top-4 right-4 -z-10">{step.num}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Admission Requirements</h2>
              <div className="space-y-6">
                {requirements.map((req, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 border-b border-slate-200 pb-2">{req.level}</h3>
                    <p className="text-slate-600">{req.criteria}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Required Documents</h2>
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <ul className="space-y-4 mb-8">
                  {documents.map((doc, idx) => (
                    <li key={idx} className="flex items-center text-slate-700 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                      <FileText className="h-5 w-5 text-blue-600 mr-3" />
                      {doc}
                    </li>
                  ))}
                </ul>
                <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Ready to Apply?</h3>
                  <p className="text-sm text-slate-600 mb-6">Download our application form or contact the admissions office directly.</p>
                  <button className="w-full inline-flex justify-center items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="h-5 w-5 mr-2" /> Download Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Admissions Office</h2>
            <p className="text-slate-300 mb-10 text-lg">Our admissions team is ready to assist you. Get in touch with us today.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center">
                <Phone className="h-8 w-8 text-blue-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Call Us</h4>
                <p className="text-slate-400">07030916304</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center">
                <Mail className="h-8 w-8 text-blue-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Email Us</h4>
                <p className="text-slate-400">info@jerryacademy.com</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center">
                <MapPin className="h-8 w-8 text-blue-400 mb-4" />
                <h4 className="font-bold text-lg mb-2">Visit Us</h4>
                <p className="text-slate-400">123 Education Avenue,<br />Ikeja, Lagos State, Nigeria.</p>
              </div>
            </div>
            <div className="mt-12">
              <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors text-lg">
                Send an Inquiry <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
