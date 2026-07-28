import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

let _dirname = '';
try {
  _dirname = process.env.VERCEL ? '/tmp' : path.dirname(fileURLToPath(import.meta.url));
} catch (e) {
  _dirname = process.cwd();
}

// Vercel serverless functions have a read-only filesystem except for /tmp
const dbPath = process.env.VERCEL ? path.join('/tmp', 'data.db') : path.join(_dirname, '../data.db');
const db = new Database(dbPath, { verbose: console.log });

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS site_content (
    id TEXT PRIMARY KEY,
    data TEXT
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    subject TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS gallery_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    url TEXT,
    size INTEGER,
    description TEXT,
    originalName TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);


try {
  db.prepare('ALTER TABLE media ADD COLUMN originalName TEXT').run();
  db.prepare('UPDATE media SET originalName = name WHERE originalName IS NULL').run();
} catch(e) {
  if (!e.message.includes('duplicate column name')) console.error(e);
}

export const addMedia = (item: any) => {
  return db.prepare('INSERT INTO media (name, type, url, size, description, originalName) VALUES (?, ?, ?, ?, ?, ?)').run(item.name, item.type, item.url, item.size, item.description || '', item.originalName || item.name);
};

export const getMedia = () => {
  return db.prepare('SELECT * FROM media ORDER BY created_at DESC').all();
};

export const deleteMedia = (id: number) => {
  return db.prepare('DELETE FROM media WHERE id = ?').run(id);
};

export const getSiteContent = (id: string) => {
  const row = db.prepare('SELECT data FROM site_content WHERE id = ?').get(id) as { data: string } | undefined;
  return row ? JSON.parse(row.data) : null;
};

export const setSiteContent = (id: string, data: any) => {
  db.prepare('INSERT OR REPLACE INTO site_content (id, data) VALUES (?, ?)').run(id, JSON.stringify(data));
};

export const addContactMessage = (msg: any) => {
  return db.prepare('INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)').run(msg.name, msg.email, msg.phone, msg.subject, msg.message);
};

export const getContactMessages = () => {
  return db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all();
};

export const addGalleryImage = (img: any) => {
  return db.prepare('INSERT INTO gallery_images (url, category) VALUES (?, ?)').run(img.url, img.category);
};

export const getGalleryImages = () => {
  return db.prepare('SELECT * FROM gallery_images ORDER BY created_at DESC').all();
};

export const deleteGalleryImage = (id: number) => {
  return db.prepare('DELETE FROM gallery_images WHERE id = ?').run(id);
};

// Insert default content if none exists
const defaultHome = {
  heroTitle: 'Welcome to Jerry International Academy',
  heroSubtitle: 'Empowering Future Leaders Through Excellence in Education.',
  statsStudents: '1,200+', 
  statsTeachers: '85+', 
  statsPassRate: '100%', 
  statsClubs: '25+',
  principalMessage: 'Welcome to Jerry International Academy. We believe that every child has the potential to achieve greatness. Our dedicated staff and state-of-the-art facilities ensure that your child receives the best education possible in a nurturing and safe environment. Join us to give your child a head start in life.'
};
if (!getSiteContent('home')) setSiteContent('home', defaultHome);

const defaultAbout = {
  history: 'Jerry International Academy was founded with a singular vision: to provide world-class education that prepares students for the challenges of tomorrow. Over the years, we have grown from a small learning center into a comprehensive educational institution serving Nursery, Primary, and Secondary students. Our legacy is built on a foundation of academic excellence, moral integrity, and a commitment to nurturing the unique talents of every child.',
  coreValues: 'Excellence, Integrity, Respect, Innovation'
};
if (!getSiteContent('about')) setSiteContent('about', defaultAbout);

const defaultMission = {
  mission: 'Our mission at Jerry International Academy is to provide a safe, caring, and stimulating learning environment where every child is inspired to achieve academic excellence, develop strong moral values, discover their unique talents, and become confident lifelong learners prepared for global opportunities.',
  supportingText: 'We aim to foster a community of lifelong learners...'
};
if (!getSiteContent('mission')) setSiteContent('mission', defaultMission);

const defaultVision = {
  vision: 'Our vision is to become one of the leading international schools recognized for academic excellence, innovation, integrity, and holistic child development. We aspire to nurture future leaders who are intellectually competent, morally upright, technologically skilled, and globally competitive.',
  goals: 'Developing leaders, fostering creativity...'
};
if (!getSiteContent('vision')) setSiteContent('vision', defaultVision);

export default db;
