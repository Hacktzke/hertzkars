import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import vehicleRoutes from './routes/vehicles.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import manufactureRoutes from './routes/manufactures.js';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import cors from 'cors';

import { createProxyMiddleware } from 'http-proxy-middleware';

const PORT = process.env.PORT || 3001;
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/hertzcars';

const app = express();
app.use(cors());

// Configuration: this is only when you use "type":"module" and use import instead of require.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.set('strictQuery', false);

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.join(__dirname, '.env') });
}
// TEST
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

app.use(express.json());
app.use(cookieParser());
app.use(ExpressMongoSanitize());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
// TEST

// Serve static files from the React app
if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '/public')));
}

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/manufactures', manufactureRoutes);

// Request below deals with cors issue for Manufacture logos
// const proxy = createProxyMiddleware({
//   target: 'https://www.car-logos.org',
//   changeOrigin: true,
// });
// app.use('/wp-content', proxy);

const logoProxy = createProxyMiddleware({
  target: 'https://www.carlogos.org',
  changeOrigin: true,
});
app.use('/car-logos', logoProxy);

if (process.env.NODE_ENV !== 'development') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
