import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  Users,
  UserCheck,
  ShoppingCart,
  PackageCheck,
  CreditCard,
  ArrowLeftRight,
  Receipt,
  Truck,
  Warehouse,
  RotateCcw,
  Tag,
  Wallet,
  ClipboardList,
  Store,
  XCircle,
  Menu,
  X,
  LogOut,
  User,
  ChevronDown,
  Shield,
  Scissors,
  FileText,
  FileSearch,
  CheckSquare,
  Send,
  FileCheck,
  ClipboardCheck,
  TestTube,
  ArrowDownToLine,
  Scale
} from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin, isManager } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showUserMenu && !e.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => sidebarOpen && setSidebarOpen(false);
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Role badge colors
  const roleColors = {
    admin: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    manager: 'bg-sky-100 text-sky-700 border-sky-200',
    staff: 'bg-purple-100 text-purple-700 border-purple-200'
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'manager', 'staff'] },
    { path: '/ims', label: 'IMS', icon: Warehouse, roles: ['admin', 'manager', 'staff'] },
    { path: '/receive-indent', label: 'Receive Indent', icon: Package, roles: ['admin', 'manager', 'staff'] },
    { path: '/indent-approval', label: 'Indent Approval', icon: CheckSquare, roles: ['admin', 'manager'] },
    { path: '/get-quotation', label: 'Get Quotation', icon: FileSearch, roles: ['admin', 'manager', 'staff'] },
    { path: '/quotation-approval', label: 'Quotation Approval', icon: ClipboardCheck, roles: ['admin', 'manager'] },
    { path: '/sent-intimation-whatsapp', label: 'Sent Intimation to WhatsApp Group', icon: Send, roles: ['admin', 'manager', 'staff'] },
    { path: '/sent-details-vendor', label: 'Sent Details to Vendor', icon: Send, roles: ['admin', 'manager', 'staff'] },
    { path: '/lifting-material', label: 'Lifting Material', icon: Truck, roles: ['admin', 'manager', 'staff'] },
    { path: '/material-dispatched', label: 'Material Dispatched', icon: Truck, roles: ['admin', 'manager', 'staff'] },
    { path: '/gate-in-reporting', label: 'Gate In Reporting', icon: FileCheck, roles: ['admin', 'manager', 'staff'] },
    { path: '/document-reporting', label: 'Document Reporting', icon: FileText, roles: ['admin', 'manager', 'staff'] },
    { path: '/sample-testing', label: 'Sample Testing', icon: TestTube, roles: ['admin', 'manager', 'staff'] },
    { path: '/unloading-material', label: 'Unloading of Material', icon: ArrowDownToLine, roles: ['admin', 'manager', 'staff'] },
    { path: '/document-reporting-accounts', label: 'Document Reporting to Accounts', icon: FileText, roles: ['admin', 'manager', 'staff'] },
    { path: '/quality-shortage-deduction', label: 'Quality & Shortage Deduction', icon: Scale, roles: ['admin', 'manager', 'staff'] },
    { path: '/upload-kanta-parchi', label: 'Upload kanta parchi', icon: FileText, roles: ['admin', 'manager', 'staff'] }
  ];

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item =>
    item.roles.includes(user?.role)
  );

  const getPageTitle = () => {
    const item = navItems.find(item => location.pathname === item.path);
    return item ? item.label : 'Dashboard';
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-sky-50 via-white to-sky-100 overflow-hidden">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-sky-200/50 fixed top-0 left-0 right-0 z-30 h-14 shadow-sm">
        <div className="px-4 lg:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 -ml-2 text-sky-600 hover:text-sky-700 hover:bg-sky-100 rounded-lg transition-colors"
            >
              <Menu size={22} />
            </button>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
                {getPageTitle()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Role Badge */}
            <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium ${roleColors[user?.role] || roleColors.staff}`}>
              <Shield size={12} />
              {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
            </div>

            {/* User Menu */}
            <div className="relative user-menu-container">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 rounded-xl border border-sky-200/50 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-sky-400 flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-medium text-slate-700">{user?.name}</p>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-sky-100 rounded-xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-sky-100">
                    <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                    <span className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-[10px] font-medium border ${roleColors[user?.role]}`}>
                      <Shield size={10} />
                      {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 pt-14 overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 lg:hidden transition-opacity"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:fixed top-0 lg:top-14 bottom-0 left-0 z-50
            bg-white/95 backdrop-blur-md border-r border-sky-200/50
            transition-all duration-300 ease-in-out shadow-xl lg:shadow-sm
            lg:translate-x-0 lg:w-64
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            w-64
          `}
        >
          {/* Mobile Sidebar Header */}
          <div className="lg:hidden h-14 flex items-center justify-between px-4 border-b border-sky-100 bg-white">
            <div className="flex items-center gap-2 leading-none">
              <Scissors className="text-sky-500" size={20} />
              <span className="text-base font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">Crest Purchase</span>
            </div>
            <button onClick={closeSidebar} className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50">
              <X size={18} />
            </button>
          </div>

          <div className="h-full overflow-y-auto pb-20 pt-3 lg:pt-4 overflow-x-hidden">
            <nav className="px-2 space-y-1">
              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={(e) => {
                      closeSidebar();
                    }}
                    className={`
                      group flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200 
                      text-xs font-medium relative whitespace-nowrap overflow-hidden cursor-pointer
                      ${active
                        ? 'bg-gradient-to-r from-sky-500 to-sky-400 text-white shadow-lg shadow-sky-500/30'
                        : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'
                      }
                    `}
                  >
                    <Icon
                      size={18}
                      className={`shrink-0 ${active ? 'text-white' : 'text-sky-400 group-hover:text-sky-500'} transition-colors`}
                    />
                    <span className="block">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 bg-transparent relative z-0 overflow-hidden lg:ml-64 pb-12">
          <div className="h-full overflow-hidden">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 right-0 z-20 left-0 lg:left-64 bg-white/90 backdrop-blur-md border-t border-sky-100 py-2 px-4">
          <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
            <span>Powered By</span>
            <a
              href="https://www.botivate.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:text-sky-700 font-semibold hover:underline transition-colors"
            >
              Botivate
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;