import { useQuestions } from '../context/QuestionContext';
import { useNavigate } from 'react-router-dom';

export const CompanyTrackerPage = () => {
  const { questions, setFilters } = useQuestions();
  const navigate = useNavigate();

  const companyData = questions.reduce((acc, q) => {
    if (!q.company) return acc;
    const comp = q.company.trim().toUpperCase();
    if (!acc[comp]) acc[comp] = { name: q.company, total: 0, confident: 0 };
    acc[comp].total++;
    if (q.status === 'confident') acc[comp].confident++;
    return acc;
  }, {});

  const companies = Object.values(companyData).sort((a, b) => b.total - a.total);

  const handleCompanyClick = (companyName) => {
    setFilters({ search: companyName });
    navigate('/questions');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-6 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Target Companies</h1>
      {companies.length === 0 ? (
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 p-10 rounded-2xl text-center text-gray-500 shadow-lg">
          No companies tagged in your question bank yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {companies.map(c => (
            <div
              key={c.name}
              onClick={() => handleCompanyClick(c.name)}
              className="group relative backdrop-blur-lg bg-white/80 border border-white/40 p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">{c.name}</h3>
                <div className="mt-5 pt-4 border-t border-gray-200 flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-700">{c.total} {c.total === 1 ? 'Question' : 'Questions'}</span>
                  <span className="font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-lg shadow-sm">{Math.round((c.confident / c.total) * 100)}% Mastered</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyTrackerPage;