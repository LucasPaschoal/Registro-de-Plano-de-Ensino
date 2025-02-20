import React from 'react';
import { SignaturesData } from '../types';

interface Props {
  data: SignaturesData;
  onChange: (data: SignaturesData) => void;
}

export function Signatures({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Assinaturas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Professor
          </label>
          <input
            type="text"
            value={data.professorName}
            onChange={(e) => onChange({ ...data, professorName: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Coordenador
          </label>
          <input
            type="text"
            value={data.coordinatorName}
            onChange={(e) => onChange({ ...data, coordinatorName: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Curso
          </label>
          <input
            type="text"
            value={data.courseName}
            onChange={(e) => onChange({ ...data, courseName: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}