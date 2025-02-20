import React from 'react';
import { BibliographyData } from '../types';

interface Props {
  data: BibliographyData;
  onChange: (data: BibliographyData) => void;
}

export function Bibliography({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Bibliografia</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bibliografia Básica
        </label>
        <textarea
          value={data.basic}
          onChange={(e) => onChange({ ...data, basic: e.target.value })}
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Digite as referências bibliográficas básicas..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bibliografia Complementar
        </label>
        <textarea
          value={data.complementary}
          onChange={(e) => onChange({ ...data, complementary: e.target.value })}
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Digite as referências bibliográficas complementares..."
        />
      </div>
    </div>
  );
}