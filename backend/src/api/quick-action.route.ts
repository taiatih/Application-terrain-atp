import { FastifyInstance } from 'fastify';
import { createClickUpTask } from '../services/clickup.service';
import { createQuickActionSchema } from '../types/quick-action.schema';

export async function quickActionRoutes(server: FastifyInstance): Promise<void> {
  server.post('/quick-action', async (request, reply) => {
    // 1. Validation Zod manuelle et explicite
    const parsed = createQuickActionSchema.safeParse(request.body);

    if (!parsed.success) {
      server.log.warn({ errors: parsed.error.flatten() }, 'Validation payload échouée');
      return reply.code(400).send({
        success: false,
        message: 'Données invalides.',
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    // 2. Appel service ClickUp
    try {
      const task = await createClickUpTask(parsed.data);
      server.log.info({ taskId: task.id }, 'Tâche ClickUp créée avec succès');
      return reply.code(201).send({
        success: true,
        message: 'Demande envoyée avec succès.',
        taskId: task.id,
      });
    } catch (err: unknown) {
      const error = err as { message?: string; response?: { data?: { err?: string } } };
      const detail = error?.response?.data?.err ?? error?.message ?? 'Erreur interne.';
      server.log.error({ err }, 'Erreur création tâche ClickUp');
      return reply.code(500).send({
        success: false,
        message: `Échec de la création : ${detail}`,
      });
    }
  });
}
