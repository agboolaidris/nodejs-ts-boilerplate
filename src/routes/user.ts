import { Router } from 'express';
import { allUser, user } from '../controller/user';

const router = Router();

router.get('/', allUser);
router.get('/:id', user);

export default router;
