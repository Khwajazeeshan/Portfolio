import express from 'express';
import DBconnect from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import chatbotRoutes from "./routes/Chatbot.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow all necessary methods including OPTIONS
app.use(cors({
  origin: 'https://portfolio-frontend-mvet.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Handle preflight requests globally
app.options('*', cors());

app.use(express.json());
app.use('/api/chatbot', chatbotRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  DBconnect();
});
