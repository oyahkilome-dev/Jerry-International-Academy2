const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Contact.tsx', 'utf8');

code = code.replace(`      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setError('Failed to send message.');
      }`, `      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setError(data.message || 'Failed to send message.');
      }`);

fs.writeFileSync('src/pages/public/Contact.tsx', code);
