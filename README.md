# Assistant Atelier — ATP

Application terrain mobile-first pour digitaliser les demandes opérationnelles en entrepôt.

## Modules

| Module | Description | Intégration |
|---|---|---|
| **Action Rapide** | Remontée d'action terrain structurée | ClickUp |
| **Consommables** | Demande de consommables (cartons, scotch, film…) | ClickUp |
| **Anomalie** | Signalement d'anomalie avec photo | ClickUp |
| **Impression** | Demande d'impression étiquette ou document | Simulé (MVP) |

## Stack technique

- **Frontend** : React 18 + TypeScript + Vite + TailwindCSS
- **Backend** : Fastify + TypeScript + Zod
- **Intégration** : ClickUp API v2
- **Cible** : Mobile-first, terminal Android entrepôt

## Démarrage rapide

### Prérequis
- Node.js 18+
- npm

### Backend

```bash
cd backend
npm install
cp .env.example .env   # Renseigner CLICKUP_API_TOKEN et les LIST IDs
npm run dev
```

Le backend démarre sur `http://localhost:3001`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Le frontend démarre sur `http://localhost:5173`.

## Variables d'environnement (backend/.env)

```env
HOST=0.0.0.0
PORT=3001
NODE_ENV=development

# ClickUp API
CLICKUP_API_TOKEN=pk_VOTRE_TOKEN

# ClickUp List IDs par module
CLICKUP_LIST_ID_ACTIONS=VOTRE_LIST_ID
CLICKUP_LIST_ID_CONSUMABLES=VOTRE_LIST_ID
CLICKUP_LIST_ID_ANOMALIES=VOTRE_LIST_ID
```

## Architecture

```
assistant-atelier/
├── backend/
│   ├── config/          # Configurations JSON des modules (pilotées backend)
│   ├── src/
│   │   ├── api/         # Routes Fastify
│   │   ├── services/    # Services ClickUp
│   │   └── types/       # Schémas Zod
│   └── package.json
└── frontend/
    ├── src/
│   │   ├── components/  # Composants UI réutilisables + steps par module
│   │   ├── hooks/       # Hooks de gestion de formulaire par module
│   │   ├── services/    # apiClient Axios
│   │   ├── types/       # Types TypeScript
│   │   └── views/       # Vues principales (Home, QuickAction, Consumable…)
│   └── package.json
```

## Auteur

Hamid — Responsable SI, Atelier Picking (ATP)
