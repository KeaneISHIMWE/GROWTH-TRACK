import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(1),
  company: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  source: z.string().optional(),
  status: z.enum(['new', 'working', 'qualified', 'won', 'lost']).optional(),
  nextFollowUpAt: z.string().datetime().nullable().optional(),
  ownerId: z.string().min(1),
});

export const dealSchema = z.object({
  leadId: z.string().min(1),
  stage: z.enum(['prospect', 'negotiation', 'closed_won', 'closed_lost']).optional(),
  amount: z.number().positive(),
  probability: z.number().min(0).max(100),
  closeDate: z.string().datetime().nullable().optional(),
  ownerId: z.string().min(1),
});

export const clientSchema = z.object({
  leadId: z.string().min(1),
  accountName: z.string().min(1),
  contractValue: z.number().nonnegative(),
  renewalDate: z.string().datetime().nullable().optional(),
  ownerId: z.string().min(1),
});

export const revenueSchema = z.object({
  dealId: z.string().min(1),
  amount: z.number().nonnegative(),
  currency: z.string().min(1).optional(),
  occurredOn: z.string().datetime(),
  periodMonth: z.number().min(1).max(12),
  periodYear: z.number().min(2000).max(3000),
});

export const activitySchema = z.object({
  leadId: z.string().optional(),
  clientId: z.string().optional(),
  type: z.enum(['call', 'meeting', 'email', 'note']),
  content: z.string().min(1),
  nextFollowUpAt: z.string().datetime().nullable().optional(),
  mentionedUserIds: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional(),
});

export const reportSchema = z.object({
  period: z.enum(['week', 'month']),
  sentTo: z.array(z.string().email()),
  metadata: z.record(z.any()).optional(),
});

