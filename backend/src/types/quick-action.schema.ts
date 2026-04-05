import { z } from 'zod';

export const createQuickActionSchema = z.object({
  type: z
    .string({ required_error: "Le type est requis." })
    .min(1, "Le type ne peut pas être vide."),
  typeLabel: z
    .string({ required_error: "Le libellé du type est requis." })
    .min(1, "Le libellé ne peut pas être vide."),
  urgency: z.enum(['normal', 'urgent'], {
    required_error: "L'urgence est requise.",
    invalid_type_error: "L'urgence doit être 'normal' ou 'urgent'.",
  }),
  comment: z.string().optional(),
});

export type CreateQuickActionPayload = z.infer<typeof createQuickActionSchema>;
