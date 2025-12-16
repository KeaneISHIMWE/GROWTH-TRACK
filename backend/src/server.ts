import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.ts';
import { requireAuth } from './middleware/auth.ts';
import { errorHandler } from './middleware/errorHandler.ts';
import { config } from './config.ts';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/me', requireAuth, (req, res) => res.json({ user: req.user }));

// Provide a root route so visiting `/` gives a helpful response
app.get('/', (_req, res) => res.redirect('/health'));

app.use('/api', requireAuth, routes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`API listening on port ${config.port}`);
});

