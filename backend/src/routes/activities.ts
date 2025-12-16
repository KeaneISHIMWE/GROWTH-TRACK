import { Router } from 'express';
import { prisma } from '../prisma';
import { activitySchema } from '../validators';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await prisma.activity.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(activities);
});

router.post('/', async (req, res) => {
  const parsed = activitySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  const data = {
    ...parsed.data,
    mentionedUserIds: parsed.data.mentionedUserIds ?? [],
    attachments: parsed.data.attachments ?? [],
  };
  const activity = await prisma.activity.create({ data });
  res.status(201).json(activity);
});

router.get('/timeline/:leadId', async (req, res) => {
  const activities = await prisma.activity.findMany({
    where: { leadId: req.params.leadId },
    orderBy: { createdAt: 'desc' },
  });
  res.json(activities);
});

export default router;

