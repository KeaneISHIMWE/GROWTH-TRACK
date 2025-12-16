import express from 'express';
import { prisma } from '../prisma.ts';
import { clientSchema } from '../validators.ts';

const router = express.Router();

router.get('/', async (_req, res) => {
  const clients = await prisma.client.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(clients);
});

router.post('/', async (req, res) => {
  const parsed = clientSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  const client = await prisma.client.create({ data: parsed.data });
  res.status(201).json(client);
});

router.get('/:id', async (req, res) => {
  const client = await prisma.client.findUnique({ where: { id: req.params.id } });
  if (!client) return res.status(404).json({ error: 'Not found' });
  res.json(client);
});

router.put('/:id', async (req, res) => {
  const parsed = clientSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  const client = await prisma.client.update({ where: { id: req.params.id }, data: parsed.data });
  res.json(client);
});

router.delete('/:id', async (req, res) => {
  await prisma.client.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;

