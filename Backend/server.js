import express from 'express';
import DBconnect from './config/db.js';
import cors from 'cors'; // Import the cors package
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import chatbotRoutes from "./routes/Chatbot.js"; // Import chatbot routes


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ // Enable CORS for your frontend origin
 origin: 'https://portfolio-frontend-mvet.onrender.com',
  methods: ['POST', 'GET', 'PUT', 'DELETE'], // Allow specific HTTP methods
  credentials: true, // Allow credentials (if you need them)
}));

app.use(express.json()); // For parsing application/json

app.use('/api/chatbot', chatbotRoutes); // Register chatbot routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  DBconnect()
});
