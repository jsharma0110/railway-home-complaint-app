// server.js
import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Create the __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Serve the frontend
app.use(express.static(path.resolve(__dirname, '../frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
