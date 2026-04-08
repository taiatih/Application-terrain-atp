import axios from 'axios';
import FormData from 'form-data';

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

/**
 * Attache une image (encodée en base64) à une tâche ClickUp existante.
 * Le base64 peut inclure ou non le préfixe "data:image/...;base64,".
 * Retourne true si l'upload a réussi, false sinon (non bloquant).
 */
export async function attachPhotoToTask(params: {
  taskId: string;
  token: string;
  photoBase64: string;
  filename?: string;
}): Promise<boolean> {
  const { taskId, token, photoBase64, filename = 'anomalie' } = params;

  try {
    // Extraire le type MIME et les données binaires depuis le data URL
    let mimeType = 'image/jpeg';
    let rawBase64 = photoBase64;

    const dataUrlMatch = photoBase64.match(/^data:([^;]+);base64,(.+)$/);
    if (dataUrlMatch) {
      mimeType = dataUrlMatch[1];
      rawBase64 = dataUrlMatch[2];
    }

    // Déterminer l'extension à partir du type MIME
    const ext = mimeType.split('/')[1]?.replace('jpeg', 'jpg') ?? 'jpg';
    const finalFilename = `${filename}.${ext}`;

    const buffer = Buffer.from(rawBase64, 'base64');

    const form = new FormData();
    form.append('attachment', buffer, {
      filename: finalFilename,
      contentType: mimeType,
    });

    await axios.post(
      `${CLICKUP_API_BASE}/task/${taskId}/attachment`,
      form,
      {
        headers: {
          Authorization: token,
          ...form.getHeaders(),
        },
      }
    );

    return true;
  } catch (err) {
    // Non bloquant : la tâche est créée même si la photo échoue
    console.error('[ClickUp] Erreur upload pièce jointe :', err);
    return false;
  }
}
