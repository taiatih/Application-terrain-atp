import { FastifyInstance } from 'fastify';
import quickActionsConfig from '../../config/quick-actions.config.json';
import consumablesConfig from '../../config/consumables.config.json';
import anomalyConfig from '../../config/anomaly.config.json';
import printingConfig from '../../config/printing.config.json';

export async function configRoutes(server: FastifyInstance): Promise<void> {
  server.get('/config/quick-actions', async (_request, reply) => {
    return reply.send(quickActionsConfig);
  });

  server.get('/config/consumables', async (_request, reply) => {
    return reply.send(consumablesConfig);
  });

  server.get('/config/anomaly', async (_request, reply) => {
    return reply.send(anomalyConfig);
  });

  server.get('/config/printing', async (_request, reply) => {
    return reply.send(printingConfig);
  });
}
