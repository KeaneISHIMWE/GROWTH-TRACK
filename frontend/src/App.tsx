import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LeadsPage from './pages/LeadsPage';
import ClientsPage from './pages/ClientsPage';
import DealsPage from './pages/DealsPage';
import ReportsPage from './pages/ReportsPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <Layout>
            <DashboardPage />
          </Layout>
        }
      />
      <Route
        path="/leads"
        element={
          <Layout>
            <LeadsPage />
          </Layout>
        }
      />
      <Route
        path="/clients"
        element={
          <Layout>
            <ClientsPage />
          </Layout>
        }
      />
      <Route
        path="/deals"
        element={
          <Layout>
            <DealsPage />
          </Layout>
        }
      />
      <Route
        path="/reports"
        element={
          <Layout>
            <ReportsPage />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

