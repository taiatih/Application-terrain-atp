import { z } from 'zod';

// --- Schéma Étiquette ---
export const PrintLabelSchema = z.object({
  demandeur: z.string().min(1, 'Le demandeur est requis'),
  labelType: z.string().min(1, 'Le type d\'étiquette est requis'),
  labelTypeLabel: z.string().min(1),
  reference: z.string().optional(),
  quantity: z.number().int().min(1, 'La quantité doit être au moins 1').max(999),
  zone: z.string().optional(),
  zoneLabel: z.string().optional(),
  comment: z.string().optional(),
});

export type PrintLabelPayload = z.infer<typeof PrintLabelSchema>;

// --- Schéma Document ---
export const PrintDocumentSchema = z.object({
  demandeur: z.string().min(1, 'Le demandeur est requis'),
  documentType: z.string().min(1, 'Le type de document est requis'),
  documentTypeLabel: z.string().min(1),
  reference: z.string().optional(),
  copies: z.number().int().min(1).max(10),
  zone: z.string().optional(),
  zoneLabel: z.string().optional(),
  comment: z.string().optional(),
});

export type PrintDocumentPayload = z.infer<typeof PrintDocumentSchema>;
