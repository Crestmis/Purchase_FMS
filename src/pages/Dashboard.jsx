import { useState, useEffect } from 'react';
import {
    Package,
    Users,
    ShoppingCart,
    TrendingUp,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    IndianRupee,
    Boxes,
    Receipt,
    RotateCcw
} from 'lucide-react';

// Dummy data for localStorage
const initializeDummyData = () => {
    if (!localStorage.getItem('crest_purchase_initialized')) {
        const products = [
            { id: 'P001', name: 'Cotton Shirt', sku: 'CS-001', brand: 'Raymond', category: 'Shirts', price: 1299, stock: 45, minStock: 10 },
            { id: 'P002', name: 'Silk Saree', sku: 'SS-001', brand: 'Kanjeevaram', category: 'Sarees', price: 8999, stock: 12, minStock: 5 },
            { id: 'P003', name: 'Wool Blazer', sku: 'WB-001', brand: 'Peter England', category: 'Blazers', price: 4599, stock: 8, minStock: 10 },
            { id: 'P004', name: 'Linen Trouser', sku: 'LT-001', brand: 'Van Heusen', category: 'Trousers', price: 2199, stock: 32, minStock: 15 },
            { id: 'P005', name: 'Designer Kurta', sku: 'DK-001', brand: 'Manyavar', category: 'Ethnic', price: 3499, stock: 18, minStock: 8 }
        ];

        const vendors = [
            { id: 'V001', name: 'Fabric World', contact: 'Rajesh Kumar', phone: '9876543210', email: 'rajesh@fabricworld.com', gst: '07AABCU9603R1ZM', status: 'verified' },
            { id: 'V002', name: 'Textile Hub', contact: 'Priya Sharma', phone: '9876543211', email: 'priya@textilehub.com', gst: '07AABCU9603R1ZN', status: 'verified' },
            { id: 'V003', name: 'Thread Masters', contact: 'Amit Patel', phone: '9876543212', email: 'amit@threadmasters.com', gst: '07AABCU9603R1ZO', status: 'pending' }
        ];

        const customers = [
            { id: 'C001', name: 'Vikram Singh', phone: '9988776655', email: 'vikram@email.com', address: 'Delhi', creditLimit: 50000, outstanding: 12000 },
            { id: 'C002', name: 'Anita Desai', phone: '9988776656', email: 'anita@email.com', address: 'Mumbai', creditLimit: 75000, outstanding: 0 },
            { id: 'C003', name: 'Ravi Verma', phone: '9988776657', email: 'ravi@email.com', address: 'Bangalore', creditLimit: 30000, outstanding: 8500 }
        ];

        const purchaseOrders = [
            { id: 'PO001', vendorId: 'V001', vendorName: 'Fabric World', date: '2026-02-01', total: 125000, status: 'approved', items: 15 },
            { id: 'PO002', vendorId: 'V002', vendorName: 'Textile Hub', date: '2026-02-02', total: 85000, status: 'pending', items: 10 },
            { id: 'PO003', vendorId: 'V001', vendorName: 'Fabric World', date: '2026-02-03', total: 65000, status: 'draft', items: 8 }
        ];

        const sales = [
            { id: 'S001', customerId: 'C001', customerName: 'Vikram Singh', date: '2026-02-01', total: 15600, status: 'completed', items: 3 },
            { id: 'S002', customerId: 'C002', customerName: 'Anita Desai', date: '2026-02-02', total: 28900, status: 'completed', items: 5 },
            { id: 'S003', customerId: 'C003', customerName: 'Ravi Verma', date: '2026-02-03', total: 8500, status: 'pending', items: 2 }
        ];

        const recentActivity = [
            { id: 1, type: 'sale', message: 'New sale #S003 created for Ravi Verma', time: '10 mins ago' },
            { id: 2, type: 'stock', message: 'Low stock alert: Wool Blazer (8 units)', time: '25 mins ago' },
            { id: 3, type: 'po', message: 'PO #PO002 pending approval', time: '1 hour ago' },
            { id: 4, type: 'payment', message: 'Payment of ₹50,000 received from Fabric World', time: '2 hours ago' },
            { id: 5, type: 'return', message: 'Return request #R001 processed', time: '3 hours ago' }
        ];

        localStorage.setItem('crest_purchase_products', JSON.stringify(products));
        localStorage.setItem('crest_purchase_vendors', JSON.stringify(vendors));
        localStorage.setItem('crest_purchase_customers', JSON.stringify(customers));
        localStorage.setItem('crest_purchase_purchase_orders', JSON.stringify(purchaseOrders));
        localStorage.setItem('crest_purchase_sales', JSON.stringify(sales));
        localStorage.setItem('crest_purchase_activity', JSON.stringify(recentActivity));
        localStorage.setItem('crest_purchase_initialized', 'true');
    }
};

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalSales: 0,
        pendingOrders: 0,
        lowStock: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);

    useEffect(() => {
        initializeDummyData();

        const products = JSON.parse(localStorage.getItem('crest_purchase_products') || '[]');
        const sales = JSON.parse(localStorage.getItem('crest_purchase_sales') || '[]');
        const purchaseOrders = JSON.parse(localStorage.getItem('crest_purchase_purchase_orders') || '[]');
        const activity = JSON.parse(localStorage.getItem('crest_purchase_activity') || '[]');

        const lowStockItems = products.filter(p => p.stock <= p.minStock);
        const totalSalesValue = sales.reduce((sum, s) => sum + s.total, 0);
        const pendingPOs = purchaseOrders.filter(po => po.status === 'pending').length;

        setStats({
            totalProducts: products.length,
            totalSales: totalSalesValue,
            pendingOrders: pendingPOs,
            lowStock: lowStockItems.length
        });

        setRecentActivity(activity);
        setLowStockProducts(lowStockItems);
    }, []);

    const statsCards = [
        {
            title: 'Total Products',
            value: stats.totalProducts,
            icon: Package,
            trend: '+12%',
            trendUp: true,
            color: 'sky'
        },
        {
            title: 'Total Sales',
            value: `₹${(stats.totalSales / 1000).toFixed(1)}K`,
            icon: TrendingUp,
            trend: '+8.5%',
            trendUp: true,
            color: 'emerald'
        },
        {
            title: 'Pending Orders',
            value: stats.pendingOrders,
            icon: ShoppingCart,
            trend: '-2',
            trendUp: false,
            color: 'amber'
        },
        {
            title: 'Low Stock Items',
            value: stats.lowStock,
            icon: AlertTriangle,
            trend: '+1',
            trendUp: false,
            color: 'rose'
        }
    ];

    const quickActions = [
        { label: 'New Sale', icon: Receipt, path: '/sales-fms', color: 'sky' },
        { label: 'Add Product', icon: Package, path: '/products', color: 'emerald' },
        { label: 'Create PO', icon: ShoppingCart, path: '/purchase-order', color: 'amber' },
        { label: 'Process Return', icon: RotateCcw, path: '/return-fms', color: 'purple' }
    ];

    const getActivityIcon = (type) => {
        switch (type) {
            case 'sale': return <Receipt size={14} className="text-emerald-500" />;
            case 'stock': return <AlertTriangle size={14} className="text-amber-500" />;
            case 'po': return <ShoppingCart size={14} className="text-sky-500" />;
            case 'payment': return <IndianRupee size={14} className="text-green-500" />;
            case 'return': return <RotateCcw size={14} className="text-purple-500" />;
            default: return <Clock size={14} className="text-slate-400" />;
        }
    };

    return (
        <div className="h-full overflow-y-auto p-4 lg:p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white/80 backdrop-blur-sm border border-sky-100 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2.5 rounded-xl ${stat.color === 'sky' ? 'bg-sky-100' :
                                        stat.color === 'emerald' ? 'bg-emerald-100' :
                                            stat.color === 'amber' ? 'bg-amber-100' :
                                                'bg-rose-100'
                                    }`}>
                                    <Icon size={20} className={
                                        stat.color === 'sky' ? 'text-sky-600' :
                                            stat.color === 'emerald' ? 'text-emerald-600' :
                                                stat.color === 'amber' ? 'text-amber-600' :
                                                    'text-rose-600'
                                    } />
                                </div>
                                <div className={`flex items-center gap-0.5 text-xs font-medium ${stat.trendUp ? 'text-emerald-600' : 'text-rose-600'
                                    }`}>
                                    {stat.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                    {stat.trend}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                            <p className="text-xs text-slate-500 mt-1">{stat.title}</p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm border border-sky-100 rounded-2xl p-4 shadow-lg">
                <h3 className="text-sm font-semibold text-slate-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <a
                                key={index}
                                href={action.path}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 ${action.color === 'sky' ? 'bg-sky-50 hover:bg-sky-100 text-sky-700' :
                                        action.color === 'emerald' ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700' :
                                            action.color === 'amber' ? 'bg-amber-50 hover:bg-amber-100 text-amber-700' :
                                                'bg-purple-50 hover:bg-purple-100 text-purple-700'
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="text-sm font-medium">{action.label}</span>
                            </a>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white/80 backdrop-blur-sm border border-sky-100 rounded-2xl p-4 shadow-lg">
                    <h3 className="text-sm font-semibold text-slate-800 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {recentActivity.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start gap-3 p-3 bg-sky-50/50 rounded-xl"
                            >
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    {getActivityIcon(activity.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-slate-700 truncate">{activity.message}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="bg-white/80 backdrop-blur-sm border border-sky-100 rounded-2xl p-4 shadow-lg">
                    <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-amber-500" />
                        Low Stock Alerts
                    </h3>
                    {lowStockProducts.length > 0 ? (
                        <div className="space-y-3">
                            {lowStockProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between p-3 bg-amber-50/50 border border-amber-100 rounded-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-amber-100 rounded-lg">
                                            <Boxes size={16} className="text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-700">{product.name}</p>
                                            <p className="text-xs text-slate-500">{product.sku}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-amber-600">{product.stock} units</p>
                                        <p className="text-xs text-slate-400">Min: {product.minStock}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-400">
                            <Boxes size={32} className="mx-auto mb-2 opacity-50" />
                            <p className="text-sm">All products are well stocked!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-sky-500 to-sky-400 rounded-2xl p-5 text-white shadow-lg shadow-sky-500/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sky-100 text-sm">Today's Sales</p>
                            <h3 className="text-2xl font-bold mt-1">₹52,400</h3>
                            <p className="text-sky-100 text-xs mt-2">12 transactions</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Receipt size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-2xl p-5 text-white shadow-lg shadow-emerald-500/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-emerald-100 text-sm">Collections</p>
                            <h3 className="text-2xl font-bold mt-1">₹1,25,000</h3>
                            <p className="text-emerald-100 text-xs mt-2">This week</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-xl">
                            <IndianRupee size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-400 rounded-2xl p-5 text-white shadow-lg shadow-purple-500/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm">Active Customers</p>
                            <h3 className="text-2xl font-bold mt-1">156</h3>
                            <p className="text-purple-100 text-xs mt-2">+8 this month</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Users size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
