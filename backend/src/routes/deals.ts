import { Router } from 'express';
import { prisma } from '../prisma';
import { dealSchema } from '../validators';

const router = Router();

router.get('/', async (_req, res) => {
  const deals = await prisma.deal.findMany({ orderBy: { updatedAt: 'desc' } });
  res.json(deals);
});

router.post('/', async (req, res) => {
  const parsed = dealSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  const deal = await prisma.deal.create({ data: parsed.data });
  res.status(201).json(deal);
});

router.get('/summary/pipeline', async (_req, res) => {
  const aggregates = await prisma.deal.groupBy({
    by: ['stage'],
    _sum: { amount: true },
    _count: { _all: true },
  });
  res.json(aggregates);
});

router.put('/:id', async (req, res) => {
  const parsed = dealSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  const deal = await prisma.deal.update({ where: { id: req.params.id }, data: parsed.data });
  res.json(deal);
});

router.delete('/:id', async (req, res) => {
  await prisma.deal.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;

