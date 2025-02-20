import React from 'react';
import { ExtensionActivitiesData } from '../types';

interface Props {
  data: ExtensionActivitiesData;
  onChange: (data: ExtensionActivitiesData) => void;
}

const ACTIVITIES = [
  'Projetos como parte do currículo',
  'Programas como parte do currículo',
  'Prestação graciosa de serviços como parte do currículo',
  'Cursos e Oficinas como parte do currículo',
  'Eventos como parte do currículo',
];

export function ExtensionActivities({ data, onChange }: Props) {
  const handleActivityChange = (activity: string) => {
    const newActivities = data.selectedActivities.includes(activity)
      ? data.selectedActivities.filter((a) => a !== activity)
      : [...data.selectedActivities, activity];
    
    onChange({
      ...data,
      selectedActivities: newActivities,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Atividades Curriculares de Extensão</h2>
      
      <div className="space-y-4">
        {ACTIVITIES.map((activity) => (
          <div key={activity} className="flex items-start">
            <input
              type="checkbox"
              id={activity}
              checked={data.selectedActivities.includes(activity)}
              onChange={() => handleActivityChange(activity)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={activity} className="ml-3 text-sm text-gray-700">
              {activity}
            </label>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Justificativa, objetivos e envolvimento com a comunidade externa
        </label>
        <textarea
          value={data.justification}
          onChange={(e) => onChange({ ...data, justification: e.target.value })}
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}