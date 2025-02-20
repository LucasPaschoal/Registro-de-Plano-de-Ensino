import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TeachingPlan } from '../types';
import { FileText, Plus, Download, Edit2, Trash2 } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

export function Dashboard() {
  const { user } = useAuth();
  const [plans, setPlans] = React.useState<TeachingPlan[]>([]);

  React.useEffect(() => {
    if (user) {
      const savedPlans = JSON.parse(localStorage.getItem(`plans_${user}`) || '[]');
      setPlans(savedPlans);
    }
  }, [user]);

  const deletePlan = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      const newPlans = plans.filter(plan => plan.id !== id);
      setPlans(newPlans);
      localStorage.setItem(`plans_${user}`, JSON.stringify(newPlans));
    }
  };

  const downloadPlan = (plan: TeachingPlan) => {
    const doc = generatePDF(plan);
    doc.save(`plano-${plan.identification.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-700 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Meus Planos de Ensino</h1>
          <p className="mt-2 text-blue-100">Bem-vindo, {user}!</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus size={20} />
            Novo Plano de Ensino
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="text-blue-600" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {plan.identification.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Última atualização: {new Date(plan.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/edit/${plan.id}`}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  <Edit2 size={16} />
                  Editar
                </Link>
                <button
                  onClick={() => downloadPlan(plan)}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-md"
                >
                  <Download size={16} />
                  Baixar PDF
                </button>
                <button
                  onClick={() => deletePlan(plan.id)}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  <Trash2 size={16} />
                  Excluir
                </button>
              </div>
            </div>
          ))}

          {plans.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              Nenhum plano de ensino encontrado. Crie um novo plano para começar!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}