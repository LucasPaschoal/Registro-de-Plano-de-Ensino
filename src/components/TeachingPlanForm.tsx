import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Copy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CurriculumForm } from './CurriculumForm';
import { ExtensionActivities } from './ExtensionActivities';
import { Schedule } from './Schedule';
import { Bibliography } from './Bibliography';
import { Signatures } from './Signatures';
import { TeachingPlan } from '../types';

const emptyPlan: Omit<TeachingPlan, 'id' | 'createdAt' | 'updatedAt'> = {
  identification: {
    name: '',
    abbreviation: '',
    presentialHours: '',
    theoreticalHours: '',
    practicalHours: '',
    extensionHours: '',
    totalHours: '',
    weeklyHours: '',
    professorName: '',
    siapeCode: '',
    syllabus: '',
  },
  objectives: '',
  teachingModality: '',
  extensionActivities: {
    selectedActivities: [],
    justification: '',
  },
  content: {
    organization: '',
    interdisciplinaryRelation: '',
  },
  methodologicalProcedures: '',
  resources: '',
  technicalVisits: [],
  schedule: [],
  bibliography: {
    basic: '',
    complementary: '',
  },
  signatures: {
    professorName: '',
    coordinatorName: '',
    courseName: '',
  },
};

export function TeachingPlanForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<TeachingPlan>({
    ...emptyPlan,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [showReusePlanDialog, setShowReusePlanDialog] = useState(false);
  const [existingPlans, setExistingPlans] = useState<TeachingPlan[]>([]);

  useEffect(() => {
    if (user) {
      const plans = JSON.parse(localStorage.getItem(`plans_${user}`) || '[]') as TeachingPlan[];
      setExistingPlans(plans);
      
      if (id) {
        const plan = plans.find(p => p.id === id);
        if (plan) {
          setFormData(plan);
        }
      }
    }
  }, [id, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const plans = JSON.parse(localStorage.getItem(`plans_${user}`) || '[]') as TeachingPlan[];
    const updatedPlan = {
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    if (id) {
      const index = plans.findIndex(p => p.id === id);
      if (index !== -1) {
        plans[index] = updatedPlan;
      }
    } else {
      plans.push(updatedPlan);
    }

    localStorage.setItem(`plans_${user}`, JSON.stringify(plans));
    navigate('/dashboard');
  };

  const reusePlan = (selectedPlan: TeachingPlan) => {
    const newPlan = {
      ...selectedPlan,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      identification: {
        ...selectedPlan.identification,
        name: `Cópia de ${selectedPlan.identification.name}`,
      },
    };
    setFormData(newPlan);
    setShowReusePlanDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-700 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-blue-600 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold">
                {id ? 'Editar Plano de Ensino' : 'Novo Plano de Ensino'}
              </h1>
              <p className="mt-2 text-blue-100">
                {id ? 'Atualize as informações do plano' : 'Preencha as informações do novo plano'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!id && (
          <div className="mb-8">
            <button
              type="button"
              onClick={() => setShowReusePlanDialog(true)}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              <Copy size={20} />
              Reutilizar plano de ensino existente
            </button>
          </div>
        )}

        {showReusePlanDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Selecionar plano para reutilizar</h2>
                <div className="space-y-4">
                  {existingPlans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => reusePlan(plan)}
                      className="w-full text-left p-4 rounded-lg border hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <h3 className="font-semibold text-lg">{plan.identification.name}</h3>
                      <p className="text-sm text-gray-500">
                        Criado em: {new Date(plan.createdAt).toLocaleDateString()}
                      </p>
                    </button>
                  ))}
                  {existingPlans.length === 0 && (
                    <p className="text-center text-gray-500 py-4">
                      Nenhum plano de ensino encontrado para reutilizar.
                    </p>
                  )}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowReusePlanDialog(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <CurriculumForm
              data={formData.identification}
              onChange={(identification) =>
                setFormData((prev) => ({ ...prev, identification }))
              }
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Objetivos e Modalidade</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Objetivos do Componente Curricular
                </label>
                <textarea
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={4}
                  value={formData.objectives}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, objectives: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Justificativa da Utilização da Modalidade de Ensino
                </label>
                <textarea
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={4}
                  value={formData.teachingModality}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, teachingModality: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <ExtensionActivities
              data={formData.extensionActivities}
              onChange={(extensionActivities) =>
                setFormData((prev) => ({ ...prev, extensionActivities }))
              }
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Schedule
              data={formData.schedule}
              onChange={(schedule) =>
                setFormData((prev) => ({ ...prev, schedule }))
              }
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Bibliography
              data={formData.bibliography}
              onChange={(bibliography) =>
                setFormData((prev) => ({ ...prev, bibliography }))
              }
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Signatures
              data={formData.signatures}
              onChange={(signatures) =>
                setFormData((prev) => ({ ...prev, signatures }))
              }
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Save size={20} />
              {id ? 'Salvar Alterações' : 'Criar Plano de Ensino'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}