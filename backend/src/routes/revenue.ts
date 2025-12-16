import { Router } from 'express';
import { prisma } from '../prisma';
import { revenueSchema } from '../validators';

const router = Router();

router.get('/', async (_req, res) => {
  const rows = await prisma.revenue.findMany({ orderBy: { occurredOn: 'desc' } });
  res.json(rows);
});

router.post('/', async (req, res) => {
  const parsed = revenueSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  const row = await prisma.revenue.create({ data: parsed.data });
  res.status(201).json(row);
});

router.get('/aggregate/monthly', async (_req, res) => {
  const agg = await prisma.revenue.groupBy({
    by: ['periodYear', 'periodMonth'],
    _sum: { amount: true },
    orderBy: [{ periodYear: 'asc' }, { periodMonth: 'asc' }],
  });
  res.json(agg);
});

export default router;

