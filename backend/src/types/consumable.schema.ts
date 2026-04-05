import { z } from 'zod';

export const createConsumableSchema = z.object({
  item: z
    .string({ required_error: 'Le consommable est requis.' })
    .min(1, 'Le consommable ne peut pas être vide.'),
  itemLabel: z
    .string({ required_error: 'Le libellé du consommable est requis.' })
    .min(1, 'Le libellé ne peut pas être vide.'),
  unit: z
    .string({ required_error: "L'unité est requise." })
    .min(1, "L'unité ne peut pas être vide."),
  quantity: z
    .number({ required_error: 'La quantité est requise.' })
    .int('La quantité doit être un entier.')
    .positive('La quantité doit être supérieure à 0.'),
  demandeur: z
    .string({ required_error: 'Le demandeur est requis.' })
    .min(1, 'Le demandeur ne peut pas être vide.'),
  zone: z.string().optional(),
  comment: z.string().optional(),
});

export type CreateConsumablePayload = z.infer<typeof createConsumableSchema>;
