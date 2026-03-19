import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import propertyRoutes from './routes/property.routes';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true, service: 'Hornez Inmobiliaria API' }));

app.use('/api/properties', propertyRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
