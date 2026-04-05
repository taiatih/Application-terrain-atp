import { z } from 'zod';

export const AnomalyPayloadSchema = z.object({
  demandeur: z.string().min(1, 'Le demandeur est requis'),
  type: z.string().min(1, 'Le type d\'anomalie est requis'),
  typeLabel: z.string().min(1, 'Le libellé du type est requis'),
  reference: z.string().optional().default(''),
  zone: z.string().optional().default(''),
  zoneLabel: z.string().optional().default(''),
  comment: z.string().optional().default(''),
  photoBase64: z.string().optional().default(''),
});

export type AnomalyPayload = z.infer<typeof AnomalyPayloadSchema>;
