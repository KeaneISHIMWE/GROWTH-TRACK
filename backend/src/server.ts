import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { requireAuth } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import { config } from './config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/me', requireAuth, (req, res) => res.json({ user: req.user }));

app.use('/api', requireAuth, routes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`API listening on port ${config.port}`);
});

