import React from 'react';
import { ScheduleEntry } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  data: ScheduleEntry[];
  onChange: (data: ScheduleEntry[]) => void;
}

export function Schedule({ data, onChange }: Props) {
  const addEntry = () => {
    onChange([...data, { date: '', activity: '' }]);
  };

  const removeEntry = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, field: keyof ScheduleEntry, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Cronograma de Desenvolvimento</h2>
      
      <div className="space-y-4">
        {data.map((entry, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data
              </label>
              <input
                type="date"
                value={entry.date}
                onChange={(e) => updateEntry(index, 'date', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex-[2]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Atividade
              </label>
              <input
                type="text"
                value={entry.activity}
                onChange={(e) => updateEntry(index, 'activity', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              onClick={() => removeEntry(index)}
              className="mt-7 p-2 text-red-600 hover:text-red-700 focus:outline-none"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addEntry}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none"
        >
          <Plus size={20} />
          Adicionar Atividade
        </button>
      </div>
    </div>
  );
}