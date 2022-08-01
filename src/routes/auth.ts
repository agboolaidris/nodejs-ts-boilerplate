import { Router } from 'express';
import { isme, login, register } from '../controller/auth';
import { isMeMiddleware } from '../middleware/auth/isme';
import { loginValidation, registerValidation } from '../middleware/validations/auth';

const router = Router();

router.post('/register', [registerValidation], register);
router.post('/login', [loginValidation], login);
router.get('/isme', [isMeMiddleware], isme);

export default router;
