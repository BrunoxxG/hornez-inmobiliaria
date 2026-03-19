import { Request, Response } from 'express';
import propertyService from '../services/property.service';
import { Property } from '../models/property.model';

class PropertyController {
  async create(req: Request, res: Response) {
    const data: Property = req.body;
    if (!data.title || !data.price || !data.location || !data.type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // images from multer/cloudinary
    if (req.files && Array.isArray(req.files)) {
      data.images = (req.files as any[]).map((f) => (f as any).path || (f as any).secure_url);
    }
    const created = await propertyService.createProperty(data);
    res.status(201).json(created);
  }

  async list(req: Request, res: Response) {
    const items = await propertyService.getAllProperties();
    res.json(items);
  }

  async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await propertyService.getPropertyById(id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data: Partial<Property> = req.body;
    if (req.files && Array.isArray(req.files)) {
      data.images = (req.files as any[]).map((f) => (f as any).path || (f as any).secure_url);
    }
    const updated = await propertyService.updateProperty(id, data);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  }

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const success = await propertyService.deleteProperty(id);
    if (!success) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  }
}

export default new PropertyController();
