import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';

export default function GenericEditor({ page, title }: { page: string, title: string }) {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`/api/content/${page}`)
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [page]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch(`/api/content/${page}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(content)
      });
      if (res.ok) {
        setMessage('Changes saved successfully!');
      } else {
        setMessage('Failed to save changes.');
      }
    } catch(err) {
      setMessage('Error saving changes.');
    }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChange = (key: string, value: string) => {
    setContent({ ...content, [key]: value });
  };

  if (loading) return <div className="p-8 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        {Object.keys(content).map((key) => {
          if (typeof content[key] === 'object') return null; // Skip complex objects for this simple editor
          return (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-700 mb-2 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              {content[key].length > 100 || key.includes('history') || key.includes('vision') || key.includes('mission') || key.includes('Text') ? (
                <textarea 
                  rows={5}
                  value={content[key]} 
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input 
                  type="text" 
                  value={content[key]} 
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          );
        })}
        {Object.keys(content).length === 0 && (
          <p className="text-slate-500">No editable content fields found for this page yet. Please ensure default content is set.</p>
        )}
      </div>
    </div>
  );
}
