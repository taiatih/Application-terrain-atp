import { CreateConsumablePayload } from '../types/consumable.schema';
import { isNotConfigured, createClickUpTask } from './clickup.base';

export async function createConsumableTask(payload: CreateConsumablePayload): Promise<{ id: string }> {
  const token = process.env.CLICKUP_API_TOKEN || '';
  const listId = process.env.CLICKUP_LIST_ID_CONSUMABLES || '';

  if (isNotConfigured(token) || isNotConfigured(listId)) {
    throw new Error('CLICKUP_NOT_CONFIGURED');
  }

  const lines = [
    `Consommable : ${payload.itemLabel}`,
    `Quantité : ${payload.quantity} ${payload.unit}`,
    `Demandeur : ${payload.demandeur}`,
    payload.zone ? `Zone : ${payload.zone}` : null,
    payload.comment?.trim() ? `Commentaire : ${payload.comment.trim()}` : null,
  ].filter(Boolean) as string[];

  const id = await createClickUpTask({
    listId,
    token,
    name: `[Consommable] ${payload.itemLabel} × ${payload.quantity} — ${payload.demandeur}`,
    description: lines.join('\n'),
    priority: 3,
  });

  return { id };
}
