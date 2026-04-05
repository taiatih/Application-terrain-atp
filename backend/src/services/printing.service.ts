import { PrintLabelPayload, PrintDocumentPayload } from '../types/printing.schema';

// Génère un ID de job simulé
function generateJobId(): string {
  return `PRINT-${Date.now().toString(36).toUpperCase()}`;
}

export function simulatePrintLabel(payload: PrintLabelPayload): {
  jobId: string;
  summary: string;
} {
  const jobId = generateJobId();
  const ref = payload.reference ? ` — Réf : ${payload.reference}` : '';
  const zone = payload.zoneLabel ? ` (${payload.zoneLabel})` : '';
  const summary = `${payload.quantity}× ${payload.labelTypeLabel}${ref}${zone} — demandé par ${payload.demandeur}`;

  console.log(`[PRINT][LABEL] Job ${jobId} : ${summary}`);

  return { jobId, summary };
}

export function simulatePrintDocument(payload: PrintDocumentPayload): {
  jobId: string;
  summary: string;
} {
  const jobId = generateJobId();
  const ref = payload.reference ? ` — Réf : ${payload.reference}` : '';
  const zone = payload.zoneLabel ? ` (${payload.zoneLabel})` : '';
  const copies = payload.copies === 1 ? '1 exemplaire' : `${payload.copies} exemplaires`;
  const summary = `${payload.documentTypeLabel}${ref} — ${copies}${zone} — demandé par ${payload.demandeur}`;

  console.log(`[PRINT][DOC] Job ${jobId} : ${summary}`);

  return { jobId, summary };
}
