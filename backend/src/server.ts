import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { configRoutes } from './api/config.route';
import { quickActionRoutes } from './api/quick-action.route';
import { consumableRoutes } from './api/consumable.route';
import { anomalyRoutes } from './api/anomaly.route';
import { printingRoutes } from './api/printing.route';
import { operatorsRoutes } from './api/operators.route';

const server = Fastify({
  logger: true,
  bodyLimit: 10 * 1024 * 1024, // 10 MB — nécessaire pour les photos base64 prises sur mobile
});

// CORS — ouvert en développement
server.register(cors, { origin: '*' });

// Health check
server.get('/api/health', async (_request, reply) => {
  return reply.send({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes applicatives
server.register(configRoutes, { prefix: '/api' });
server.register(quickActionRoutes, { prefix: '/api' });
server.register(consumableRoutes, { prefix: '/api' });
server.register(anomalyRoutes, { prefix: '/api' });
server.register(printingRoutes, { prefix: '/api' });
server.register(operatorsRoutes, { prefix: '/api' });

const start = async () => {
  const port = Number(process.env.PORT) || 3001;
  const host = process.env.HOST || '0.0.0.0';
  try {
    await server.listen({ port, host });
    server.log.info(`Backend démarré sur http://${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
