import { FastifyInstance } from 'fastify';
import operatorsData from '../../config/operators.json';
import sessionConfig from '../../config/session.config.json';

export async function operatorsRoutes(server: FastifyInstance): Promise<void> {
  // GET /api/operators — liste complète pour le fallback manuel
  server.get('/operators', async (_request, reply) => {
    return reply.send({ operators: operatorsData.operators });
  });

  // GET /api/session-config — config de session (heures de déconnexion)
  server.get('/session-config', async (_request, reply) => {
    return reply.send(sessionConfig);
  });

  // GET /api/operators/:badge — résolution par scan badge
  server.get<{ Params: { badge: string } }>(
    '/operators/:badge',
    async (request, reply) => {
      const { badge } = request.params;
      const operator = operatorsData.operators.find(
        (op) => op.badge.toLowerCase() === badge.trim().toLowerCase()
      );

      if (!operator) {
        return reply.status(404).send({
          success: false,
          message: 'Badge non reconnu. Vérifiez votre badge ou sélectionnez votre nom manuellement.',
        });
      }

      return reply.send({ success: true, operator });
    }
  );
}
