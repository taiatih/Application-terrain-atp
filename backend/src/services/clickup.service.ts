import axios from 'axios';
import { CreateQuickActionPayload } from '../types/quick-action.schema';

const PRIORITY_MAP: Record<string, number> = {
  urgent: 1,
  normal: 3,
};

export async function createClickUpTask(payload: CreateQuickActionPayload): Promise<{ id: string }> {
  const token = process.env.CLICKUP_API_TOKEN || '';
  const listId = process.env.CLICKUP_LIST_ID_ACTIONS || '';

  if (!token || !listId || token.includes('placeholder') || listId.includes('placeholder')) {
    throw new Error('CLICKUP_NOT_CONFIGURED');
  }

  const url = `https://api.clickup.com/api/v2/list/${listId}/task`;

  const body = {
    name: `[Action] ${payload.typeLabel}`,
    description: payload.comment?.trim() || 'Aucun commentaire.',
    priority: PRIORITY_MAP[payload.urgency] ?? 3,
  };

  const response = await axios.post<{ id: string }>(url, body, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}
