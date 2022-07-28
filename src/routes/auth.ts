import { Router } from 'express';
import { register } from '../controller/auth';
import { registerValidation } from '../middleware/validations/auth';

const router = Router();

router.post('/register', [registerValidation], register);

export default router;
