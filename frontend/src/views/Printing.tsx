import React, { useState } from 'react';
import { PrintingMode } from '../types/app.types';

// Label flow
import { usePrintLabelForm } from '../hooks/usePrintLabelForm';
import PrintStep1_Demandeur from '../components/printing/PrintStep1_Demandeur';
import PrintLabelStep2_SelectType from '../components/printing/PrintLabelStep2_SelectType';
import PrintLabelStep3_Reference from '../components/printing/PrintLabelStep3_Reference';
import PrintLabelStep4_Quantity from '../components/printing/PrintLabelStep4_Quantity';
import PrintStep5_Zone from '../components/printing/PrintStep5_Zone';
import PrintStep6_Comment from '../components/printing/PrintStep6_Comment';
import PrintLabelStep7_Summary from '../components/printing/PrintLabelStep7_Summary';

// Document flow
import { usePrintDocumentForm } from '../hooks/usePrintDocumentForm';
import PrintDocStep2_SelectType from '../components/printing/PrintDocStep2_SelectType';
import PrintDocStep3_Reference from '../components/printing/PrintDocStep3_Reference';
import PrintDocStep4_Copies from '../components/printing/PrintDocStep4_Copies';
import PrintDocStep7_Summary from '../components/printing/PrintDocStep7_Summary';

interface Props {
  onHome: () => void;
}

// ─── Écran de sélection du mode ──────────────────────────────────────────────
function ModeSelector({ onSelect }: { onSelect: (m: PrintingMode) => void }) {
  return (
    <div className="flex flex-col h-full p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Impression</h2>
      <p className="text-gray-500 text-center mb-8">Que souhaitez-vous imprimer ?</p>
      <div className="flex flex-col gap-4 flex-grow justify-center">
        <button
          onClick={() => onSelect('label')}
          className="w-full py-8 rounded-2xl bg-blue-600 text-white text-2xl font-bold shadow-md active:scale-95 transition-all"
        >
          🏷️ Étiquette
        </button>
        <button
          onClick={() => onSelect('document')}
          className="w-full py-8 rounded-2xl bg-gray-700 text-white text-2xl font-bold shadow-md active:scale-95 transition-all"
        >
          📄 Document
        </button>
      </div>
    </div>
  );
}

// ─── Écran résultat ───────────────────────────────────────────────────────────
function ResultScreen({
  status,
  message,
  jobId,
  onHome,
  onRetry,
}: {
  status: 'loading' | 'success' | 'error';
  message: string;
  jobId: string;
  onHome: () => void;
  onRetry: () => void;
}) {
  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 p-6">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg text-gray-600">Envoi en cours...</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-4xl">✓</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Demande envoyée</h3>
          <p className="text-gray-500">{message}</p>
          {jobId && <p className="text-xs text-gray-400 mt-2">Réf. job : {jobId}</p>}
        </div>
        <button
          onClick={onHome}
          className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl active:scale-95 transition-all"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-6 text-center">
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
        <span className="text-4xl text-red-500">✕</span>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Erreur</h3>
        <p className="text-gray-500">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="w-full py-4 bg-gray-200 text-gray-800 text-lg font-semibold rounded-xl active:scale-95 transition-all"
      >
        Réessayer
      </button>
      <button
        onClick={onHome}
        className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl active:scale-95 transition-all"
      >
        Retour à l'accueil
      </button>
    </div>
  );
}

// ─── Parcours Étiquette ───────────────────────────────────────────────────────
function LabelFlow({ onHome, onBack }: { onHome: () => void; onBack: () => void }) {
  const { step, form, config, status, resultMessage, jobId, update, next, back, submit, reset } = usePrintLabelForm();

  if (!config) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Chargement...</p>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <ResultScreen
        status={status === 'idle' ? 'loading' : status}
        message={resultMessage}
        jobId={jobId}
        onHome={onHome}
        onRetry={reset}
      />
    );
  }

  return (
    <>
      {step === 'demandeur' && (
        <PrintStep1_Demandeur
          demandeur={form.demandeur}
          onChange={(v) => update({ demandeur: v })}
          onNext={next}
          onBack={onBack}
        />
      )}
      {step === 'selectType' && (
        <PrintLabelStep2_SelectType
          labelTypes={config.labelTypes}
          selected={form.labelType}
          onSelect={(id, label) => update({ labelType: id, labelTypeLabel: label })}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 'reference' && (
        <PrintLabelStep3_Reference
          labelTypeLabel={form.labelTypeLabel}
          reference={form.reference}
          onChange={(v) => update({ reference: v })}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 'quantity' && (
        <PrintLabelStep4_Quantity
          quantities={config.labelQuantities}
          selected={form.quantity}
          onSelect={(q) => update({ quantity: q })}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 'zone' && (
        <PrintStep5_Zone
          zones={config.zones}
          selected={form.zone}
          onSelect={(id, label) => update({ zone: id, zoneLabel: label })}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 'comment' && (
        <PrintStep6_Comment
          comment={form.comment}
          onChange={(v) => update({ comment: v })}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 'summary' && (
        <PrintLabelStep7_Summary form={form} onConfirm={submit} onBack={back} />
      )}
    </>
  );
}

// ─── Parcours Document ────────────────────────────────────────────────────────
function DocumentFlow({ onHome, onBack }: { onHome: () => void; onBack: () => void }) {
  const { step, form, config, status, resultMessage, jobId, update, next, back, submit, reset } = usePrintDocumentForm();

  if (!config) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Chargement...</p>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <ResultScreen
        status={status === 'idle' ? 'loading' : status}
        message={resultMessage}
        jobId={jobId}
        onHome={onHome}
        onRetry={reset}
      />
    );
  }

  return (
    <>
      {step === 'demandeur' && (
        <PrintStep1_Demandeur
          demandeur={form.demandeur}
          onChange={(v) => update({ demandeur: v })}
          onNext={next}
          onBack={onBack}
        />
      )}
      {step === 'selectType' && (
        <PrintDocStep2_SelectType
          documentTypes={config.documentTypes}
          selected={form.documentType}
          onSelect={(id, label) => update({ documentType: id, documentTypeLabel: label })}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 'reference' && (
        <PrintDocStep3_Reference
          documentTypeLabel={form.documentTypeLabel}
          reference={form.reference}
          onChange={(v) => update({ reference: v })}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 'copies' && (
        <PrintDocStep4_Copies
          copies={config.documentCopies}
          selected={form.copies}
          onSelect={(n) => update({ copies: n })}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 'zone' && (
        <PrintStep5_Zone
          zones={config.zones}
          selected={form.zone}
          onSelect={(id, label) => update({ zone: id, zoneLabel: label })}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 'comment' && (
        <PrintStep6_Comment
          comment={form.comment}
          onChange={(v) => update({ comment: v })}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 'summary' && (
        <PrintDocStep7_Summary form={form} onConfirm={submit} onBack={back} />
      )}
    </>
  );
}

// ─── Vue principale ───────────────────────────────────────────────────────────
export default function Printing({ onHome }: Props) {
  const [mode, setMode] = useState<PrintingMode>(null);

  return (
    <div className="flex flex-col h-full">
      {mode === null && <ModeSelector onSelect={setMode} />}
      {mode === 'label' && <LabelFlow onHome={onHome} onBack={() => setMode(null)} />}
      {mode === 'document' && <DocumentFlow onHome={onHome} onBack={() => setMode(null)} />}
    </div>
  );
}
