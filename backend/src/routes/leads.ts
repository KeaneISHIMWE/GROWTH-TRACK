import { Router } from 'express';
import { prisma } from '../prisma';
import { leadSchema } from '../validators';
import { RequestWithUser } from '../middleware/auth';

const router = Router();

// List leads with optional filtering
router.get('/', async (req: RequestWithUser, res) => {
  const { status, ownerId } = req.query;
  const leads = await prisma.lead.findMany({
    where: {
      status: status ? String(status) : undefined,
      ownerId: ownerId ? String(ownerId) : undefined,
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(leads);
});

router.post('/', async (req: RequestWithUser, res) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  const lead = await prisma.lead.create({ data: parsed.data });
  res.status(201).json(lead);
});

router.get('/:id', async (req, res) => {
  const lead = await prisma.lead.findUnique({ where: { id: req.params.id } });
  if (!lead) return res.status(404).json({ error: 'Not found' });
  res.json(lead);
});

router.put('/:id', async (req, res) => {
  const parsed = leadSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  const lead = await prisma.lead.update({ where: { id: req.params.id }, data: parsed.data });
  res.json(lead);
});

router.delete('/:id', async (req, res) => {
  await prisma.lead.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

// Fetch upcoming follow-ups
router.get('/due/today', async (_req, res) => {
  const now = new Date();
  const leads = await prisma.lead.findMany({
    where: { nextFollowUpAt: { lte: now } },
    orderBy: { nextFollowUpAt: 'asc' },
  });
  res.json(leads);
});

export default router;

