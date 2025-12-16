import express from 'express';
import leads from './leads.ts';
import deals from './deals.ts';
import clients from './clients.ts';
import revenue from './revenue.ts';
import activities from './activities.ts';
import reports from './reports.ts';

const router = express.Router();

router.use('/leads', leads);
router.use('/deals', deals);
router.use('/clients', clients);
router.use('/revenue', revenue);
router.use('/activities', activities);
router.use('/reports', reports);

export default router;

