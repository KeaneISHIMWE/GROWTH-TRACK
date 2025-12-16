import { Router } from 'express';
import leads from './leads';
import deals from './deals';
import clients from './clients';
import revenue from './revenue';
import activities from './activities';
import reports from './reports';

const router = Router();

router.use('/leads', leads);
router.use('/deals', deals);
router.use('/clients', clients);
router.use('/revenue', revenue);
router.use('/activities', activities);
router.use('/reports', reports);

export default router;

