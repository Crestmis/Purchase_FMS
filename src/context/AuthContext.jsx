import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

// Demo users for Crest Purchase
const DEMO_USERS = [
  { id: 'U001', username: 'admin', password: 'admin123', name: 'Admin User', role: 'admin', email: 'admin@crestpurchase.com' },
  { id: 'U002', username: 'manager', password: 'manager123', name: 'Store Manager', role: 'manager', email: 'manager@crestpurchase.com' },
  { id: 'U003', username: 'staff', password: 'staff123', name: 'Staff Member', role: 'staff', email: 'staff@crestpurchase.com' }
];

// Role permissions for Crest Purchase
const PERMISSIONS = {
  admin: {
    canManageProducts: true,
    canManageVendors: true,
    canManageCustomers: true,
    canCreatePO: true,
    canReceiveGoods: true,
    canManagePayments: true,
    canTransferStock: true,
    canMakeSales: true,
    canProcessReturns: true,
    canViewReports: true,
    canManageTasks: true,
    canApprove: true,
    canExport: true,
    isAdmin: true
  },
  manager: {
    canManageProducts: true,
    canManageVendors: true,
    canManageCustomers: true,
    canCreatePO: true,
    canReceiveGoods: true,
    canManagePayments: true,
    canTransferStock: true,
    canMakeSales: true,
    canProcessReturns: true,
    canViewReports: true,
    canManageTasks: true,
    canApprove: false,
    canExport: true,
    isAdmin: false
  },
  staff: {
    canManageProducts: false,
    canManageVendors: false,
    canManageCustomers: true,
    canCreatePO: false,
    canReceiveGoods: true,
    canManagePayments: false,
    canTransferStock: false,
    canMakeSales: true,
    canProcessReturns: true,
    canViewReports: false,
    canManageTasks: false,
    canApprove: false,
    canExport: false,
    isAdmin: false
  }
};

const AUTH_KEY = 'crest_purchase_auth_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem(AUTH_KEY);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem(AUTH_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const foundUser = DEMO_USERS.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.role,
        email: foundUser.email,
        permissions: PERMISSIONS[foundUser.role]
      };
      setUser(userData);
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
      return { success: true, user: userData };
    }

    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    return user.permissions?.[permission] === true;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isManager: user?.role === 'manager',
    isStaff: user?.role === 'staff'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
