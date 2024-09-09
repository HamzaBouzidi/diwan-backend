import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import sequelize from './config/database.js';
import userRoutes from './routes/user.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Sync the database
sequelize.sync()
 .then(() => {
  console.log('Database synced successfully.');
 })
 .catch((err) => {
  console.error('Failed to sync database:', err);
 });

// Default route to check if server is running
app.get('/', (req, res) => {
 res.send('Server is running!');
});


// Use the user routes
app.use('/api', userRoutes);

// Start the server
app.listen(PORT, () => {
 console.log(`Server is running on http://localhost:${PORT}`);
});
