import db from './src/db.ts';
try {
  db.exec('ALTER TABLE media ADD COLUMN description TEXT;');
  console.log("Column added.");
} catch (e) {
  console.log("Error or already exists:", e);
}
