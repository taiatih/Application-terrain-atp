import axios from 'axios';
import { CreateConsumablePayload } from '../types/consumable.schema';

export async function createConsumableTask(payload: CreateConsumablePayload): Promise<{ id: string }> {
  const token = process.env.CLICKUP_API_TOKEN || '';
  const listId = process.env.CLICKUP_LIST_ID_CONSUMABLES || '';

  if (!token || !listId || token.includes('placeholder') || listId.includes('placeholder')) {
    throw new Error('CLICKUP_NOT_CONFIGURED');
  }

  const url = `https://api.clickup.com/api/v2/list/${listId}/task`;

  const lines = [
    `Consommable : ${payload.itemLabel}`,
    `Quantité : ${payload.quantity} ${payload.unit}`,
    `Demandeur : ${payload.demandeur}`,
    payload.zone ? `Zone : ${payload.zone}` : null,
    payload.comment?.trim() ? `Commentaire : ${payload.comment.trim()}` : null,
  ].filter(Boolean);

  const body = {
    name: `[Consommable] ${payload.itemLabel} × ${payload.quantity} — ${payload.demandeur}`,
    description: lines.join('\n'),
    priority: 3,
  };

  const response = await axios.post<{ id: string }>(url, body, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}
