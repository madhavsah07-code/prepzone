import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import { QuestionProvider } from './context/QuestionContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import Spinner from './components/ui/Spinner';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import { Toaster } from 'react-hot-toast';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const QuestionBankPage = lazy(() => import('./pages/QuestionBankPage'));
const QuestionDetailPage = lazy(() => import('./pages/QuestionDetailPage'));
const CompanyTrackerPage = lazy(() => import('./pages/CompanyTrackerPage'));
const GoalsPage = lazy(() => import('./pages/GoalsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const AppLayout = ({ children }) => (
  <div className="min-h-screen relative bg-black text-white overflow-hidden flex flex-col">

    {/*  Glow Background */}
    <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-orange-500/20 blur-[120px] rounded-full"></div>
    <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-orange-600/20 blur-[120px] rounded-full"></div>

    <Navbar />

    <div className="flex flex-1 overflow-hidden relative z-10">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  </div>
);

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QuestionProvider>
          
          {/*  Toast Dark Theme */}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#111',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)'
              }
            }}
          />

          <Suspense 
            fallback={
              <div className="flex h-screen items-center justify-center bg-black">
                <Spinner size="lg" />
              </div>
            }
          >
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
                <Route path="/questions" element={<AppLayout><QuestionBankPage /></AppLayout>} />
                <Route path="/questions/:id" element={<AppLayout><QuestionDetailPage /></AppLayout>} />
                <Route path="/companies" element={<AppLayout><CompanyTrackerPage /></AppLayout>} />
                <Route path="/goals" element={<AppLayout><GoalsPage /></AppLayout>} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </QuestionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;