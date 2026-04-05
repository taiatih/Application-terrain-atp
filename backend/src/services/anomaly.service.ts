import axios from 'axios';
import { AnomalyPayload } from '../types/anomaly.schema';

export async function createAnomalyTask(payload: AnomalyPayload): Promise<string> {
  const token = process.env.CLICKUP_API_TOKEN || '';
  const listId = process.env.CLICKUP_LIST_ID_ANOMALIES || '';

  const isPlaceholder = (v: string) =>
    !v || v.includes('placeholder') || v.includes('your_clickup') || v === '';

  if (isPlaceholder(token) || isPlaceholder(listId)) {
    throw new Error('CLICKUP_NOT_CONFIGURED');
  }

  const refInfo = payload.reference ? ` | Réf : ${payload.reference}` : '';
  const taskName = `[Anomalie] ${payload.typeLabel}${refInfo} — ${payload.demandeur}`;

  const descriptionLines = [
    `Demandeur : ${payload.demandeur}`,
    `Type d'anomalie : ${payload.typeLabel}`,
    payload.reference ? `Référence : ${payload.reference}` : null,
    payload.zoneLabel ? `Zone : ${payload.zoneLabel}` : null,
    payload.comment ? `Commentaire : ${payload.comment}` : null,
    payload.photoBase64 ? `\nUne photo a été jointe à cette anomalie.` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const body: Record<string, unknown> = {
    name: taskName,
    description: descriptionLines,
    priority: 2,
  };

  const response = await axios.post(
    `https://api.clickup.com/api/v2/list/${listId}/task`,
    body,
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.id as string;
}
