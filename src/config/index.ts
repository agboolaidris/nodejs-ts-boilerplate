import dotenv from 'dotenv-safe';
dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL || '';
const JWT_SECRET = process.env.JWT_SECRET || '';
export { PORT, MONGODB_URL, JWT_SECRET };
