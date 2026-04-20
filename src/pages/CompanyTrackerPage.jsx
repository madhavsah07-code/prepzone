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
    <div className="max-w-7xl mx-auto space-y-8 px-6">

      {/* Title */}
      <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
        Target Companies
      </h1>

      {companies.length === 0 ? (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-10 rounded-2xl text-center text-gray-400">
          No companies tagged in your question bank yet.
        </div>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

          {companies.map(c => (

            <div
              key={c.name}
              onClick={() => handleCompanyClick(c.name)}
              className="group relative bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl cursor-pointer hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300"
            >

              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-600/5 opacity-0 group-hover:opacity-100 blur-xl transition"></div>

              <div className="relative z-10">

                <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition">
                  {c.name}
                </h3>

                <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center text-sm">

                  <span className="text-gray-400">
                    {c.total} {c.total === 1 ? 'Question' : 'Questions'}
                  </span>

                  <span className="text-green-400 bg-green-500/10 px-3 py-1 rounded-lg border border-green-500/20">
                    {Math.round((c.confident / c.total) * 100)}%
                  </span>

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