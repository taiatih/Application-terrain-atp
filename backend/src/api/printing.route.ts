import { FastifyInstance } from 'fastify';
import { PrintLabelSchema, PrintDocumentSchema } from '../types/printing.schema';
import { simulatePrintLabel, simulatePrintDocument } from '../services/printing.service';

export async function printingRoutes(server: FastifyInstance): Promise<void> {

  // POST /api/print/label
  server.post('/print/label', async (request, reply) => {
    const result = PrintLabelSchema.safeParse(request.body);

    if (!result.success) {
      const errors = result.error.errors.map((e) => e.message);
      return reply.status(400).send({
        success: false,
        message: 'Données invalides.',
        errors,
      });
    }

    try {
      const { jobId, summary } = simulatePrintLabel(result.data);
      return reply.send({
        success: true,
        message: 'Demande d\'impression envoyée.',
        jobId,
        summary,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('[PRINT][LABEL] Erreur :', message);
      return reply.status(500).send({
        success: false,
        message: 'Une erreur est survenue. Réessayez ou contactez votre responsable IT.',
      });
    }
  });

  // POST /api/print/document
  server.post('/print/document', async (request, reply) => {
    const result = PrintDocumentSchema.safeParse(request.body);

    if (!result.success) {
      const errors = result.error.errors.map((e) => e.message);
      return reply.status(400).send({
        success: false,
        message: 'Données invalides.',
        errors,
      });
    }

    try {
      const { jobId, summary } = simulatePrintDocument(result.data);
      return reply.send({
        success: true,
        message: 'Demande d\'impression envoyée.',
        jobId,
        summary,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('[PRINT][DOC] Erreur :', message);
      return reply.status(500).send({
        success: false,
        message: 'Une erreur est survenue. Réessayez ou contactez votre responsable IT.',
      });
    }
  });
}
