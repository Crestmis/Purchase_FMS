import React, { useState, useEffect } from 'react';
import { ClipboardList, Clock, Send, Search, Filter, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import PendingIntimation from './PendingIntimation';
import HistoryIntimation from './HistoryIntimation';

const SentIntimationWhatsApp = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [pendingIndents, setPendingIndents] = useState([]);
    const [historyIndents, setHistoryIndents] = useState([]);
    const [vendorFilter, setVendorFilter] = useState('All');
    const [skuFilter, setSkuFilter] = useState('All');
    const [itemNameFilter, setItemNameFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        // Mock data initialization for the WhatsApp Intimation Flow
        const initializeIntimations = () => {
            const hasInitialized = localStorage.getItem('crest_purchase_whatsapp_initialized');
            
            if (!hasInitialized) {
                // Generate 5 pending items (mocking approved quotations arriving here)
                const pending = Array.from({ length: 5 }).map((_, i) => ({
                    id: Date.now() + i,
                    serialNo: `SN-P${String(i + 1).padStart(3, '0')}`,
                    sku: `SKU${String(600 + i).padStart(3, '0')}`,
                    name: `Pending Material ${i + 1}`,
                    unit: 'KL',
                    mcq: (i + 1) * 20,
                    maxLevel: (i + 1) * 200,
                    closingStock: (i + 1) * 15,
                    reorderQty: (i + 1) * 40,
                    vendorName: `Supplier ${i + 1} Pvt Ltd`,
                    quotedPrice: (i + 1) * 1100,
                    leadTime: (i % 3) + 2
                }));
                
                // Generate 5 history items
                const history = Array.from({ length: 5 }).map((_, i) => ({
                    id: Date.now() + 100 + i,
                    serialNo: `SN-H${String(i + 1).padStart(3, '0')}`,
                    sku: `SKU${String(700 + i).padStart(3, '0')}`,
                    name: `History Material ${i + 1}`,
                    unit: 'KL',
                    mcq: (i + 1) * 15,
                    maxLevel: (i + 1) * 150,
                    closingStock: (i + 1) * 10,
                    reorderQty: (i + 1) * 30,
                    vendorName: `Supplier ${i + 5} Pvt Ltd`,
                    quotedPrice: (i + 1) * 950,
                    leadTime: (i % 3) + 1,
                    status: i % 4 === 0 ? 'Failed' : 'Sent',
                    groupName: i % 4 === 0 ? '' : 'Official Purchase Group'
                }));

                localStorage.setItem('crest_purchase_pending_whatsapp', JSON.stringify(pending));
                localStorage.setItem('crest_purchase_history_whatsapp', JSON.stringify(history));
                localStorage.setItem('crest_purchase_whatsapp_initialized', 'true');
                
                setPendingIndents(pending);
                setHistoryIndents(history);
            } else {
                setPendingIndents(JSON.parse(localStorage.getItem('crest_purchase_pending_whatsapp') || '[]'));
                setHistoryIndents(JSON.parse(localStorage.getItem('crest_purchase_history_whatsapp') || '[]'));
            }
        };

        initializeIntimations();
    }, []);

    const processIndent = (processedData) => {
        // Remove from pending
        const updatedPending = pendingIndents.filter(item => item.id !== processedData.id);
        
        // Add to history at the top
        const updatedHistory = [processedData, ...historyIndents];

        // Update state and storage
        setPendingIndents(updatedPending);
        setHistoryIndents(updatedHistory);
        localStorage.setItem('crest_purchase_pending_whatsapp', JSON.stringify(updatedPending));
        localStorage.setItem('crest_purchase_history_whatsapp', JSON.stringify(updatedHistory));
    };

    const filterData = (data) => {
        return data.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  item.serialNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  (item.vendorName && item.vendorName.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesVendorFilter = vendorFilter === 'All' || item.vendorName === vendorFilter;
            const matchesSkuFilter = skuFilter === 'All' || item.sku === skuFilter;
            const matchesItemNameFilter = itemNameFilter === 'All' || item.name === itemNameFilter;

            return matchesSearch && matchesVendorFilter && matchesSkuFilter && matchesItemNameFilter;
        });
    };

    const currentTabData = activeTab === 'pending' ? pendingIndents : historyIndents;
    const uniqueVendors = [...new Set(currentTabData.map(item => item.vendorName).filter(Boolean))].sort();
    const uniqueSkus = [...new Set(currentTabData.map(item => item.sku))].sort();
    const uniqueNames = [...new Set(currentTabData.map(item => item.name))].sort();

    useEffect(() => {
        setVendorFilter('All');
        setSkuFilter('All');
        setItemNameFilter('All');
        setSearchTerm('');
        setSortConfig({ key: null, direction: 'asc' });
    }, [activeTab]);

        const toggleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleSort = (key, direction) => {
        setSortConfig({ key, direction });
    };

    const sortData = (data) => {
        return [...data].sort((a, b) => {
            if (!sortConfig.key) return 0;
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const filteredPending = sortData(filterData(pendingIndents));
    const filteredHistory = sortData(filterData(historyIndents));

        const SortDropdown = ({ columnKey }) => {
        if (sortConfig.key !== columnKey) return null;
        return (
            <span className="inline-flex items-center ml-1">
                {sortConfig.direction === 'asc' 
                    ? <ArrowUp size={14} className="text-sky-600" />
                    : <ArrowDown size={14} className="text-sky-600" />
                }
            </span>
        );
    };

    return (
        <div className="h-full flex flex-col p-4 lg:p-6 space-y-4">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-sky-100 shadow-sm">
                <div className="flex-1">
                    <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Send className="text-sky-500" />
                        Sent Intimation to WhatsApp Group
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Notify the internal teams regarding approved purchase actions</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <div className="relative w-full lg:w-48">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-sky-50 border border-sky-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                    </div>

                    <div className="relative shrink-0">
                        <select
                            value={vendorFilter}
                            onChange={(e) => setVendorFilter(e.target.value)}
                            className="appearance-none pl-9 pr-8 py-2 bg-white border border-sky-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-600 font-medium cursor-pointer hover:bg-sky-50 transition-colors shadow-sm w-full sm:w-40"
                        >
                            <option value="All">Vendor: All</option>
                            {uniqueVendors.map(vendor => (
                                <option key={vendor} value={vendor}>{vendor}</option>
                            ))}
                        </select>
                        <Send className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" size={14} />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    <div className="relative shrink-0">
                        <select
                            value={skuFilter}
                            onChange={(e) => setSkuFilter(e.target.value)}
                            className="appearance-none pl-9 pr-8 py-2 bg-white border border-sky-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-600 font-medium cursor-pointer hover:bg-sky-50 transition-colors shadow-sm w-full sm:w-32"
                        >
                            <option value="All">SKU: All</option>
                            {uniqueSkus.map(sku => (
                                <option key={sku} value={sku}>{sku}</option>
                            ))}
                        </select>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500 flex items-center justify-center font-bold text-[10px] w-4 h-4 border border-sky-500 rounded-full">
                            S
                        </div>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    <div className="relative shrink-0">
                        <select
                            value={itemNameFilter}
                            onChange={(e) => setItemNameFilter(e.target.value)}
                            className="appearance-none pl-9 pr-8 py-2 bg-white border border-sky-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-600 font-medium cursor-pointer hover:bg-sky-50 transition-colors shadow-sm w-full sm:w-40"
                        >
                            <option value="All">Item: All</option>
                            {uniqueNames.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500 flex items-center justify-center font-bold text-[10px] w-4 h-4 border border-sky-500 rounded-full">
                            I
                        </div>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
                
                {/* Custom Tab Navigation */}
                <div className="flex p-1 bg-sky-50/80 backdrop-blur-sm rounded-xl border border-sky-100/50 w-full sm:w-auto self-start sm:self-auto">
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`
                            flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all
                            ${activeTab === 'pending' 
                                ? 'bg-white text-sky-700 shadow-sm border border-sky-100' 
                                : 'text-slate-500 hover:text-slate-700 hover:bg-sky-100/50'}
                        `}
                    >
                        <Clock size={16} className={activeTab === 'pending' ? 'text-sky-500' : 'text-slate-400'} />
                        Pending
                        {pendingIndents.length > 0 && (
                            <span className={`
                                px-2 py-0.5 rounded-full text-xs ml-1
                                ${activeTab === 'pending' ? 'bg-rose-100 text-rose-600' : 'bg-slate-200 text-slate-500'}
                            `}>
                                {pendingIndents.length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`
                            flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all
                            ${activeTab === 'history' 
                                ? 'bg-white text-sky-700 shadow-sm border border-sky-100' 
                                : 'text-slate-500 hover:text-slate-700 hover:bg-sky-100/50'}
                        `}
                    >
                        <ClipboardList size={16} className={activeTab === 'history' ? 'text-sky-500' : 'text-slate-400'} />
                        History
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-h-0 animate-in fade-in duration-300">
                {activeTab === 'pending' ? (
                    <PendingIntimation indents={filteredPending} onProcess={processIndent} SortDropdown={SortDropdown} onSort={toggleSort} sortConfig={sortConfig} />
                ) : (
                    <HistoryIntimation indents={filteredHistory} SortDropdown={SortDropdown} onSort={toggleSort} sortConfig={sortConfig} />
                )}
            </div>
        </div>
    );
};

export default SentIntimationWhatsApp;
