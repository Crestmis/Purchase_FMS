import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PropTypes from 'prop-types';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';

// Crest Purchase Pages
import Dashboard from './pages/Dashboard';
import IMS from './pages/IMS/IMS';
import ReceiveIndent from './pages/ReceiveIndent/ReceiveIndent';
import IndentApproval from './pages/IndentApproval/IndentApproval';
import GetQuotation from './pages/GetQuotation/GetQuotation';
import QuotationApproval from './pages/QuotationApproval/QuotationApproval';
import SentIntimationWhatsApp from './pages/SentIntimationWhatsApp/SentIntimationWhatsApp';
import SentDetailsVendor from './pages/SentDetailsVendor/SentDetailsVendor';
import LiftingMaterial from './pages/LiftingMaterial/LiftingMaterial';
import MaterialDispatched from './pages/MaterialDispatched/MaterialDispatched';
import GateInReporting from './pages/GateInReporting/GateInReporting';
import DocumentReporting from './pages/DocumentReporting/DocumentReporting';
import SampleTesting from './pages/SampleTesting/SampleTesting';
import UnloadingMaterial from './pages/UnloadingMaterial/UnloadingMaterial';
import DocumentReportingAccounts from './pages/DocumentReportingAccounts/DocumentReportingAccounts';
import QualityShortageDeduction from './pages/QualityShortageDeduction/QualityShortageDeduction';
import UploadKantaParchi from './pages/UploadKantaParchi/UploadKantaParchi';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-sm">Loading Crest Purchase...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

// Public Route (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired
};

// App Routes Component
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="ims" element={<IMS />} />
        <Route path="receive-indent" element={<ReceiveIndent />} />
        <Route path="indent-approval" element={<IndentApproval />} />
        <Route path="get-quotation" element={<GetQuotation />} />
        <Route path="quotation-approval" element={<QuotationApproval />} />
        <Route path="sent-intimation-whatsapp" element={<SentIntimationWhatsApp />} />
        <Route path="sent-details-vendor" element={<SentDetailsVendor />} />
        <Route path="lifting-material" element={<LiftingMaterial />} />
        <Route path="material-dispatched" element={<MaterialDispatched />} />
        <Route path="gate-in-reporting" element={<GateInReporting />} />
        <Route path="document-reporting" element={<DocumentReporting />} />
        <Route path="sample-testing" element={<SampleTesting />} />
        <Route path="unloading-material" element={<UnloadingMaterial />} />
        <Route path="document-reporting-accounts" element={<DocumentReportingAccounts />} />
        <Route path="quality-shortage-deduction" element={<QualityShortageDeduction />} />
        <Route path="upload-kanta-parchi" element={<UploadKantaParchi />} />
      </Route>

      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
