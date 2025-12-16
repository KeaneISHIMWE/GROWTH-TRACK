import { Router } from 'express';
import { prisma } from '../prisma';
import { reportSchema } from '../validators';

const router = Router();

router.get('/', async (_req, res) => {
  const reports = await prisma.report.findMany({ orderBy: { generatedAt: 'desc' } });
  res.json(reports);
});

router.post('/', async (req, res) => {
  const parsed = reportSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  // Placeholder: generate PDF and store path
  const fakePath = `reports/${Date.now()}.pdf`;
  const report = await prisma.report.create({
    data: {
      period: parsed.data.period,
      storagePath: fakePath,
      generatedById: req.body.generatedById ?? 'system',
      sentTo: parsed.data.sentTo,
      metadata: parsed.data.metadata ?? {},
      checksum: 'pending',
    },
  });
  res.status(201).json(report);
});

export default router;

