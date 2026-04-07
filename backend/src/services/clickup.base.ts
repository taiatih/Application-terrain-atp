import axios from 'axios';

const CLICKUP_API_BASE = 'https://api.clickup.com/api/v2';

/**
 * Vérifie si une valeur d'environnement est un placeholder non configuré.
 */
export function isNotConfigured(value: string | undefined): boolean {
  if (!value) return true;
  const v = value.toLowerCase().trim();
  return v === '' || v.includes('placeholder') || v.includes('your_clickup') || v.includes('your-clickup');
}

/**
 * Appelle l'API ClickUp pour créer une tâche dans une liste.
 * Retourne l'ID de la tâche créée.
 */
export async function createClickUpTask(params: {
  listId: string;
  token: string;
  name: string;
  description: string;
  priority?: number; // 1=urgent, 2=high, 3=normal, 4=low
}): Promise<string> {
  const { listId, token, name, description, priority } = params;

  const body: Record<string, unknown> = {
    name,
    description,
  };

  if (priority !== undefined) {
    body.priority = priority;
  }

  const response = await axios.post(
    `${CLICKUP_API_BASE}/list/${listId}/task`,
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
