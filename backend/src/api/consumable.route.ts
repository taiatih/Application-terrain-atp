import { FastifyInstance } from 'fastify';
import { createConsumableTask } from '../services/consumable.service';
import { createConsumableSchema } from '../types/consumable.schema';

export async function consumableRoutes(server: FastifyInstance): Promise<void> {
  server.post('/consumable', async (request, reply) => {
    // 1. Validation Zod manuelle et explicite
    const parsed = createConsumableSchema.safeParse(request.body);

    if (!parsed.success) {
      server.log.warn({ errors: parsed.error.flatten() }, 'Validation payload consommable échouée');
      return reply.code(400).send({
        success: false,
        message: 'Certains champs sont manquants ou incorrects. Vérifiez le formulaire.',
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    // 2. Appel service ClickUp
    try {
      const task = await createConsumableTask(parsed.data);
      server.log.info({ taskId: task.id }, 'Tâche ClickUp consommable créée');
      return reply.code(201).send({
        success: true,
        message: 'Demande envoyée avec succès.',
        taskId: task.id,
      });
    } catch (err: unknown) {
      const error = err as { message?: string };
      server.log.error({ err }, 'Erreur création tâche ClickUp consommable');

      // Message utilisateur simple, jamais technique
      const userMessage =
        error?.message === 'CLICKUP_NOT_CONFIGURED'
          ? "L'envoi n'est pas encore activé. Contactez votre responsable IT."
          : "La demande n'a pas pu être envoyée. Réessayez dans quelques instants.";

      return reply.code(500).send({
        success: false,
        message: userMessage,
      });
    }
  });
}
