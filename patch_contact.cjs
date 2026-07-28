const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const importResend = `import { Resend } from 'resend';\n`;
if (!code.includes("import { Resend } from 'resend';")) {
  code = importResend + code;
}

code = code.replace(`  // Contact Messages
  app.post('/api/contact', (req, res) => {
    try {
      addContactMessage(req.body);
      res.json({ success: true });
    } catch(err) {
      res.status(500).json({ success: false });
    }
  });`, `  // Contact Messages
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      
      // Basic validation
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
      }

      addContactMessage(req.body);

      // Send email using Resend
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        try {
          await resend.emails.send({
            from: 'onboarding@resend.dev', // Default testing email from Resend, update if custom domain is verified
            to: 'oyahkilome@gmail.com',
            subject: \`New Contact Form Submission: \${subject || 'No Subject'}\`,
            html: \`
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> \${name}</p>
              <p><strong>Email:</strong> \${email}</p>
              <p><strong>Phone:</strong> \${phone || 'N/A'}</p>
              <p><strong>Subject:</strong> \${subject || 'N/A'}</p>
              <h3>Message:</h3>
              <p>\${message.replace(/\\n/g, '<br>')}</p>
            \`
          });
          console.log('Email sent successfully to oyahkilome@gmail.com');
        } catch (emailErr) {
          console.error('Failed to send email:', emailErr);
          // Don't fail the request if just the email fails, or maybe we should?
          // For now, we just log it, but the DB insertion succeeded.
        }
      } else {
        console.warn('RESEND_API_KEY is not set. Contact form email was not sent.');
      }

      res.json({ success: true });
    } catch(err) {
      console.error('Contact Form Error:', err);
      res.status(500).json({ success: false, message: 'An error occurred while submitting your message.' });
    }
  });`);

fs.writeFileSync('server.ts', code);
