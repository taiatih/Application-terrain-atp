import { AnomalyPayload } from '../types/anomaly.schema';
import { isNotConfigured, createClickUpTask, attachPhotoToTask } from './clickup.base';

export async function createAnomalyTask(payload: AnomalyPayload): Promise<{ id: string }> {
  const token = process.env.CLICKUP_API_TOKEN || '';
  const listId = process.env.CLICKUP_LIST_ID_ANOMALIES || '';

  if (isNotConfigured(token) || isNotConfigured(listId)) {
    throw new Error('CLICKUP_NOT_CONFIGURED');
  }

  const refInfo = payload.reference ? ` | Réf : ${payload.reference}` : '';
  const taskName = `[Anomalie] ${payload.typeLabel}${refInfo} — ${payload.demandeur}`;

  const lines = [
    `Demandeur : ${payload.demandeur}`,
    `Type d'anomalie : ${payload.typeLabel}`,
    payload.reference ? `Référence : ${payload.reference}` : null,
    payload.zoneLabel ? `Zone : ${payload.zoneLabel}` : null,
    payload.comment ? `Commentaire : ${payload.comment}` : null,
    payload.photoBase64 ? `\nUne photo a été jointe à cette anomalie.` : null,
  ].filter(Boolean) as string[];

  const taskId = await createClickUpTask({
    listId,
    token,
    name: taskName,
    description: lines.join('\n'),
    priority: 2,
  });

  // Upload de la photo en pièce jointe si présente
  if (payload.photoBase64) {
    await attachPhotoToTask({
      taskId,
      token,
      photoBase64: payload.photoBase64,
      filename: `anomalie-${Date.now()}`,
    });
  }

  return { id: taskId };
}
