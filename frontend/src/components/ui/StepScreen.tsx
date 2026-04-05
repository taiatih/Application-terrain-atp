import React from 'react';

interface StepScreenProps {
  title: string;
  children: React.ReactNode;
}

export default function StepScreen({ title, children }: StepScreenProps) {
  return (
    <div className="flex flex-col h-full p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-8 leading-tight">
        {title}
      </h2>
      <div className="flex flex-col flex-grow gap-4">{children}</div>
    </div>
  );
}
