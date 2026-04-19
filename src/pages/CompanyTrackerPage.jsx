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
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Target Companies</h1>
      {companies.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-500 shadow-sm">
          No companies tagged in your question bank yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {companies.map(c => (
            <div
              key={c.name}
              onClick={() => handleCompanyClick(c.name)}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">{c.name}</h3>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                <span className="font-medium text-gray-600">{c.total} {c.total === 1 ? 'Question' : 'Questions'}</span>
                <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded">{Math.round((c.confident / c.total) * 100)}% Mastered</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyTrackerPage;