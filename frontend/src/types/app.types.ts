// ─── Config options ───────────────────────────────────────────────────────────

export interface ConfigOption {
  id: string;
  label: string;
}

// ─── Quick Action ─────────────────────────────────────────────────────────────

export interface QuickActionConfig {
  types: ConfigOption[];
  urgencies: ConfigOption[];
}

export interface QuickActionFormData {
  type: string;
  typeLabel: string;
  urgency: 'normal' | 'urgent' | '';
  comment: string;
}

// ─── Consumable ───────────────────────────────────────────────────────────────

export interface ConsumableItem {
  id: string;
  label: string;
  unit: string;
}

export interface ConsumableZone {
  id: string;
  label: string;
}

export interface ConsumableConfig {
  items: ConsumableItem[];
  quantities: number[];
  zones: ConsumableZone[];
}

export interface ConsumableFormData {
  demandeur: string;
  item: string;
  itemLabel: string;
  unit: string;
  quantity: number | null;
  zone: string;
  comment: string;
}

// ─── Anomaly ─────────────────────────────────────────────────────────────────

export interface AnomalyTypeOption {
  id: string;
  label: string;
}

export interface AnomalyZone {
  id: string;
  label: string;
}

export interface AnomalyConfig {
  types: AnomalyTypeOption[];
  zones: AnomalyZone[];
}

export interface AnomalyFormData {
  demandeur: string;
  type: string;
  typeLabel: string;
  reference: string;
  zone: string;
  zoneLabel: string;
  photoBase64: string;
  comment: string;
}

// ─── Printing ───────────────────────────────────────────────────────────────

export interface PrintingLabelType {
  id: string;
  label: string;
  description: string;
}

export interface PrintingDocumentType {
  id: string;
  label: string;
  description: string;
}

export interface PrintingZone {
  id: string;
  label: string;
}

export interface PrintingConfig {
  labelTypes: PrintingLabelType[];
  labelQuantities: number[];
  documentTypes: PrintingDocumentType[];
  documentCopies: number[];
  zones: PrintingZone[];
}

export type PrintingMode = 'label' | 'document' | null;

export interface PrintLabelFormData {
  demandeur: string;
  labelType: string;
  labelTypeLabel: string;
  reference: string;
  quantity: number | null;
  zone: string;
  zoneLabel: string;
  comment: string;
}

export interface PrintDocumentFormData {
  demandeur: string;
  documentType: string;
  documentTypeLabel: string;
  reference: string;
  copies: number;
  zone: string;
  zoneLabel: string;
  comment: string;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export interface ApiResult {
  success: boolean;
  message: string;
  taskId?: string;
}
