import dotenv from 'dotenv-safe';
dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL || '';
export { PORT, MONGODB_URL };
