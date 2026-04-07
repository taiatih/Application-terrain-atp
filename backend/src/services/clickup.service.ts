import { CreateQuickActionPayload } from '../types/quick-action.schema';
import { isNotConfigured, createClickUpTask } from './clickup.base';

const PRIORITY_MAP: Record<string, number> = {
  urgent: 1,
  normal: 3,
};

export async function createQuickActionTask(payload: CreateQuickActionPayload): Promise<{ id: string }> {
  const token = process.env.CLICKUP_API_TOKEN || '';
  const listId = process.env.CLICKUP_LIST_ID_ACTIONS || '';

  if (isNotConfigured(token) || isNotConfigured(listId)) {
    throw new Error('CLICKUP_NOT_CONFIGURED');
  }

  const lines: string[] = [
    `Action : ${payload.typeLabel}`,
    `Urgence : ${payload.urgency === 'urgent' ? 'Urgente' : 'Normale'}`,
  ];
  if (payload.comment?.trim()) lines.push(`Commentaire : ${payload.comment.trim()}`);

  const id = await createClickUpTask({
    listId,
    token,
    name: `[Action] ${payload.typeLabel}`,
    description: lines.join('\n'),
    priority: PRIORITY_MAP[payload.urgency] ?? 3,
  });

  return { id };
}
