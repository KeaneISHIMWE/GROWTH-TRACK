import type { NextFunction, Response } from 'express';
import type { RequestWithUser } from './auth.ts';

export const requireRole = (roles: string[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    return next();
  };
};

