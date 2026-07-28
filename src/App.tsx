import React from 'react';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Mission from './pages/public/Mission';
import Vision from './pages/public/Vision';
import Contact from './pages/public/Contact';
import { AdminLayout } from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/Login';
import GenericEditor from './pages/admin/GenericEditor';
import GalleryManager from './pages/admin/GalleryManager';
import VideoManager from './pages/admin/VideoManager';
import MediaLibrary from './pages/admin/MediaLibrary';
import ContactViewer from './pages/admin/ContactViewer';
import SupabaseSettings from './pages/admin/SupabaseSettings';

import Gallery from './pages/public/Gallery';
import News from './pages/public/News';
import Admissions from './pages/public/Admissions';
import FloatingActions from './components/FloatingActions';

// Layout for public pages
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <FloatingActions />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/mission" element={<PublicLayout><Mission /></PublicLayout>} />
      <Route path="/vision" element={<PublicLayout><Vision /></PublicLayout>} />
      <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
      <Route path="/news" element={<PublicLayout><News /></PublicLayout>} />
      <Route path="/admissions" element={<PublicLayout><Admissions /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      
      {/* Admin Auth Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Protected Routes */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/home" element={<AdminLayout><GenericEditor page="home" title="Home Page Editor" /></AdminLayout>} />
      <Route path="/admin/about" element={<AdminLayout><GenericEditor page="about" title="About Page Editor" /></AdminLayout>} />
      <Route path="/admin/mission" element={<AdminLayout><GenericEditor page="mission" title="Mission Editor" /></AdminLayout>} />
      <Route path="/admin/vision" element={<AdminLayout><GenericEditor page="vision" title="Vision Editor" /></AdminLayout>} />
      <Route path="/admin/gallery" element={<AdminLayout><GalleryManager /></AdminLayout>} />
      <Route path="/admin/videos" element={<AdminLayout><VideoManager /></AdminLayout>} />
      <Route path="/admin/contact" element={<AdminLayout><ContactViewer /></AdminLayout>} />
      <Route path="/admin/media" element={<AdminLayout><MediaLibrary /></AdminLayout>} />
      <Route path="/admin/settings" element={<AdminLayout><SupabaseSettings /></AdminLayout>} />
      <Route path="/admin/*" element={<AdminLayout><div className="p-8 text-center">Page Under Construction</div></AdminLayout>} />
    </Routes>
  );
}

