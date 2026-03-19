import { Router } from 'express';
import propertyController from '../controllers/property.controller';
import { upload } from '../middleware/upload';
import uploadMiddleware from '../middleware/upload';

const router = Router();

router.post('/', upload.array('images', 6), uploadMiddleware, propertyController.create.bind(propertyController));
router.get('/', propertyController.list.bind(propertyController));
router.get('/:id', propertyController.get.bind(propertyController));
router.put('/:id', upload.array('images', 6), uploadMiddleware, propertyController.update.bind(propertyController));
router.delete('/:id', propertyController.remove.bind(propertyController));

export default router;
