import { useState, useEffect } from 'react';
import { Database, Save, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function SupabaseSettings() {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [serviceRoleKey, setServiceRoleKey] = useState('');
  const [bucket, setBucket] = useState('media');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{success: boolean, message: string} | null>(null);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/supabase-settings', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.url) setUrl(data.url);
      if (data.anonKey) setAnonKey(data.anonKey);
      if (data.bucket) setBucket(data.bucket);
      // Service role key is write-only for security, but we show a placeholder if it exists
      if (data.hasServiceRoleKey) setServiceRoleKey('••••••••••••••••••••••••••••••••');
      setIsLoading(false);
    })
    .catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  }, []);

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const actualServiceKey = serviceRoleKey === '••••••••••••••••••••••••••••••••' ? undefined : serviceRoleKey;
      const res = await fetch('/api/admin/supabase-test', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}` 
        },
        body: JSON.stringify({ url, anonKey, serviceRoleKey: actualServiceKey, bucket })
      });
      const data = await res.json();
      setTestResult({ success: data.success, message: data.message });
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || 'Connection failed' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      const actualServiceKey = serviceRoleKey === '••••••••••••••••••••••••••••••••' ? undefined : serviceRoleKey;
      const res = await fetch('/api/admin/supabase-settings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}` 
        },
        body: JSON.stringify({ url, anonKey, serviceRoleKey: actualServiceKey, bucket })
      });
      const data = await res.json();
      if (data.success) {
        setSaveMessage('Settings saved successfully.');
        if (actualServiceKey) {
          setServiceRoleKey('••••••••••••••••••••••••••••••••');
        }
      } else {
        setSaveMessage('Failed to save settings.');
      }
    } catch (err) {
      setSaveMessage('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-blue-600 w-8 h-8" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 flex items-center">
          <Database className="mr-3 h-6 w-6 text-emerald-600" />
          Supabase Configuration
        </h2>
        <p className="text-slate-600 mt-1">Configure your Supabase connection for media storage and database access.</p>
      </div>

      <div className="bg-white shadow rounded-lg border border-slate-200 p-6 space-y-6">
        
        {saveMessage && (
          <div className="p-4 rounded-md bg-blue-50 text-blue-700 text-sm font-medium">
            {saveMessage}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project URL</label>
            <input 
              type="text" 
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://your-project.supabase.co"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Anon Public Key</label>
            <input 
              type="text" 
              value={anonKey}
              onChange={e => setAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <p className="text-xs text-slate-500 mt-1">Safe to expose in the browser.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Service Role Key</label>
            <input 
              type="password" 
              value={serviceRoleKey}
              onChange={e => setServiceRoleKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <p className="text-xs text-red-500 mt-1 font-medium">Keep this secret! Never expose this to the browser.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Storage Bucket Name</label>
            <input 
              type="text" 
              value={bucket}
              onChange={e => setBucket(e.target.value)}
              placeholder="media"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full">
            {testResult && (
              <div className={`flex items-center text-sm font-medium ${testResult.success ? 'text-green-600' : 'text-red-600'}`}>
                {testResult.success ? <CheckCircle className="w-5 h-5 mr-2" /> : <XCircle className="w-5 h-5 mr-2" />}
                {testResult.message}
              </div>
            )}
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleTest}
              disabled={isTesting}
              className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium rounded-md text-sm transition-colors flex-1 sm:flex-none flex items-center justify-center"
            >
              {isTesting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Test Connection
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-md text-sm transition-colors flex-1 sm:flex-none flex items-center justify-center"
            >
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
