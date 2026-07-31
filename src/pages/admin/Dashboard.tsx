import { Users, FileText, Image as ImageIcon, Video, ArrowUpRight, Clock, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [media, setMedia] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setMedia(data.slice(0, 5)); })
      .catch(console.error);
  }, []);

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  const stats = [
    { title: 'Total Images', value: '124', icon: ImageIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Total Videos', value: '18', icon: Video, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Total News', value: '45', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-100' },
    { title: 'Total Visitors', value: '12.5k', icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  const recentUploads = media;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Uploads */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Recent Uploads</h2>
            <Link to="/admin/media" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-sm text-slate-500">
                  <th className="pb-3 font-medium">File Name</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Size</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentUploads.map((file) => (
                  <tr key={file.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                    <td className="py-3 font-medium text-slate-900">{file.name}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        file.type === 'image' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {file.type}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500">{formatSize(file.size)}</td>
                    <td className="py-3 text-slate-500">{formatDate(file.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Recent Activities</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Updated Mission Statement</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" /> 1 hour ago
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-1">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Published new News article</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" /> 3 hours ago
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">New Contact message received</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" /> 5 hours ago
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-1">
                <Settings className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Updated Website Logo</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" /> 1 day ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
