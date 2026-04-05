import { FastifyInstance } from 'fastify';
import { AnomalyPayloadSchema } from '../types/anomaly.schema';
import { createAnomalyTask } from '../services/anomaly.service';

export async function anomalyRoutes(server: FastifyInstance): Promise<void> {
  server.post('/anomaly', async (request, reply) => {
    // Validation Zod manuelle
    const parsed = AnomalyPayloadSchema.safeParse(request.body);

    if (!parsed.success) {
      const messages = parsed.error.errors.map((e) => e.message).join(', ');
      server.log.warn({ errors: parsed.error.errors }, 'Validation anomaly payload failed');
      return reply.status(400).send({
        success: false,
        message: `Données invalides : ${messages}`,
      });
    }

    try {
      const taskId = await createAnomalyTask(parsed.data);
      return reply.status(201).send({
        success: true,
        message: 'Anomalie signalée avec succès.',
        taskId,
      });
    } catch (err: unknown) {
      const error = err as Error;

      if (error.message === 'CLICKUP_NOT_CONFIGURED') {
        server.log.warn('ClickUp non configuré — anomalie non envoyée');
        return reply.status(503).send({
          success: false,
          message: "L'envoi n'est pas encore activé. Contactez votre responsable IT.",
        });
      }

      server.log.error({ err }, 'Erreur lors de la création de la tâche anomalie ClickUp');
      return reply.status(500).send({
        success: false,
        message: 'Une erreur est survenue. Réessayez ou contactez votre responsable IT.',
      });
    }
  });
}
