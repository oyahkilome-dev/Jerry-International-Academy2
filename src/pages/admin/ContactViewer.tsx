import { useState, useEffect } from 'react';
import { Mail, Loader2, Calendar } from 'lucide-react';

export default function ContactViewer() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/contact', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMessages(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium">
          Total: {messages.length}
        </div>
      </div>

      <div className="space-y-6">
        {messages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <Mail className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-600">No messages yet.</h3>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{msg.subject}</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                    <span className="font-medium text-slate-700">{msg.name}</span>
                    &bull; <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline">{msg.email}</a>
                    &bull; <a href={`tel:${msg.phone}`} className="text-slate-600 hover:underline">{msg.phone}</a>
                  </p>
                </div>
                <div className="text-xs text-slate-500 flex items-center bg-slate-50 px-3 py-1.5 rounded-full shrink-0">
                  <Calendar className="w-3 h-3 mr-1.5" />
                  {new Date(msg.created_at).toLocaleString()}
                </div>
              </div>
              <div className="prose text-slate-700 max-w-none">
                <p className="whitespace-pre-wrap">{msg.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
