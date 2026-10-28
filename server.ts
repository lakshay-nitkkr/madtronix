import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.resolve(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2));
}

async function startServer() {
  const app = express();

  // Parse JSON bodies
  app.use(express.json());

  // Direct consultation submission endpoint
  app.post('/api/consultation', (req, res) => {
    try {
      const { fullName, email, mobile, companyName, website, requirement, query } = req.body;

      if (!fullName || !email || !mobile || !requirement || !query) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: fullName, email, mobile, requirement, and query are required.',
        });
      }

      const referenceId = `MTX-${Date.now().toString().slice(-6)}`;
      const submissionTimestamp = new Date().toISOString();

      const newInquiry = {
        referenceId,
        recipient: 'contact@madtronixsystems.com',
        fullName: String(fullName).trim(),
        email: String(email).trim(),
        mobile: String(mobile).trim(),
        companyName: companyName ? String(companyName).trim() : '',
        website: website ? String(website).trim() : '',
        requirement: String(requirement).trim(),
        query: String(query).trim(),
        submittedAt: submissionTimestamp,
        status: 'received',
      };

      // Persist to server data storage
      let existingInquiries: any[] = [];
      try {
        const fileContent = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
        existingInquiries = JSON.parse(fileContent);
      } catch {
        existingInquiries = [];
      }

      existingInquiries.unshift(newInquiry);
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(existingInquiries, null, 2));

      // Server console log indicating delivery to contact@madtronixsystems.com
      console.log('==================================================');
      console.log(`[DIRECT INQUIRY DISPATCHED TO: contact@madtronixsystems.com]`);
      console.log(`Reference ID: ${referenceId}`);
      console.log(`Client: ${newInquiry.fullName} <${newInquiry.email}>`);
      console.log(`Mobile: ${newInquiry.mobile}`);
      console.log(`Requirement: ${newInquiry.requirement}`);
      console.log(`Company: ${newInquiry.companyName || 'N/A'}`);
      console.log(`Website: ${newInquiry.website || 'N/A'}`);
      console.log(`Query: ${newInquiry.query}`);
      console.log('==================================================');

      return res.status(200).json({
        success: true,
        referenceId,
        recipient: 'contact@madtronixsystems.com',
        message: 'Your query has been directly submitted to contact@madtronixsystems.com.',
        data: newInquiry,
      });
    } catch (err: any) {
      console.error('Error processing consultation request:', err);
      return res.status(500).json({
        success: false,
        error: 'Failed to process consultation request.',
      });
    }
  });

  // Get inquiries list (for verification/audit)
  app.get('/api/consultation', (req, res) => {
    try {
      const fileContent = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      const inquiries = JSON.parse(fileContent);
      res.json({ success: true, count: inquiries.length, inquiries });
    } catch {
      res.json({ success: true, count: 0, inquiries: [] });
    }
  });

  // Vite middleware in dev or static files in production
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Madtronix Systems server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
