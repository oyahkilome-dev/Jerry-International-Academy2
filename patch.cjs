const fs = require('fs');
const file = '/app/applet/src/pages/admin/Login.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Incorrect password.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    }`;

const replacement = `    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(\`The server returned an invalid response (not JSON). This usually means the API is not running or the request was redirected to the frontend.\`);
      }

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Incorrect password.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login. Please try again.');
    }`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
