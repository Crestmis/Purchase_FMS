import React, { useState, useEffect } from 'react';
import { Package, Search, Box, Filter } from 'lucide-react';

const ReceiveIndent = () => {
    const [indents, setIndents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [stockFilter, setStockFilter] = useState('All');
    const [unitFilter, setUnitFilter] = useState('All');

    useEffect(() => {
        const initialized = localStorage.getItem('crest_purchase_receive_indent_v2_initialized');
        let existingIndents = JSON.parse(localStorage.getItem('crest_purchase_receive_indent_v2') || '[]');
        
        if (!initialized && existingIndents.length === 0) {
            existingIndents = Array.from({ length: 15 }).map((_, i) => {
                const day = String((i % 28) + 1).padStart(2, '0');
                return {
                    id: Date.now() + i,
                    timestamp: `${day}/03/2026 10:00:00`,
                    serialNo: `SN-${String(i + 1).padStart(3, '0')}`,
                    sku: `SKU${String(100 + i).padStart(3, '0')}`,
                    name: `Dummy Material ${i + 1}`,
                    unit: 'KL',
                    mcq: (i + 1) * 10,
                    maxLevel: (i + 1) * 100,
                    closingStock: (i + 1) * 2,
                    reorderQty: (i + 1) * 20
                };
            });
            existingIndents.reverse(); // Ensure newest (highest SN) is at the top
            
            localStorage.setItem('crest_purchase_receive_indent_v2', JSON.stringify(existingIndents));
            localStorage.setItem('crest_purchase_receive_indent_v2_initialized', 'true');
        }
        setIndents(existingIndents);
    }, []);

    const filteredIndents = indents.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.serialNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.sku.toLowerCase().includes(searchTerm.toLowerCase());
                              
        const isLowStock = item.closingStock <= (item.maxLevel * 0.2);
        const matchesStockFilter = stockFilter === 'All' || 
                                   (stockFilter === 'Low' && isLowStock) || 
                                   (stockFilter === 'Normal' && !isLowStock);
                                   
        const matchesUnitFilter = unitFilter === 'All' || item.unit === unitFilter;
                              
        return matchesSearch && matchesStockFilter && matchesUnitFilter;
    });

    // Extract unique units for the filter dropdown
    const uniqueUnits = [...new Set(indents.map(item => item.unit))];

    return (
        <div className="h-full flex flex-col p-4 lg:p-6 space-y-4">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-sky-100 shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Package className="text-sky-500" />
                        Receive Indent
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">View and manage material indents raised from the IMS</p>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search SN, SKU or Item Name..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-sky-50 border border-sky-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                    </div>
                    
                    <div className="relative shrink-0">
                        <select
                            value={stockFilter}
                            onChange={(e) => setStockFilter(e.target.value)}
                            className="appearance-none pl-9 pr-8 py-2 bg-white border border-sky-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-600 font-medium cursor-pointer hover:bg-sky-50 transition-colors shadow-sm"
                        >
                            <option value="All">All Stock</option>
                            <option value="Low">Low Stock</option>
                            <option value="Normal">Normal Stock</option>
                        </select>
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" size={14} />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    
                    <div className="relative shrink-0">
                        <select
                            value={unitFilter}
                            onChange={(e) => setUnitFilter(e.target.value)}
                            className="appearance-none pl-9 pr-8 py-2 bg-white border border-sky-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-600 font-medium cursor-pointer hover:bg-sky-50 transition-colors shadow-sm"
                        >
                            <option value="All">All Units</option>
                            {uniqueUnits.map(unit => (
                                <option key={unit} value={unit}>{unit}</option>
                            ))}
                        </select>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500 flex items-center justify-center font-bold text-[10px] w-4 h-4 border border-sky-500 rounded-full">
                            U
                        </div>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Area */}
            <div className="flex-1 bg-white/90 backdrop-blur-sm border border-sky-100 rounded-2xl shadow-lg overflow-hidden flex flex-col">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-sky-50 text-sky-700 font-medium border-b border-sky-100 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 whitespace-nowrap">Timestamp</th>
                                <th className="px-4 py-3 whitespace-nowrap">Serial No</th>
                                <th className="px-4 py-3 whitespace-nowrap">SKU Code</th>
                                <th className="px-4 py-3 whitespace-nowrap">Item Name</th>
                                <th className="px-4 py-3 whitespace-nowrap">Unit</th>
                                <th className="px-4 py-3 whitespace-nowrap">MCQ</th>
                                <th className="px-4 py-3 whitespace-nowrap">Max Level</th>
                                <th className="px-4 py-3 whitespace-nowrap">Closing Stock</th>
                                <th className="px-4 py-3 whitespace-nowrap">Reorder Qty</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sky-50">
                            {filteredIndents.map((item) => (
                                <tr key={item.id} className="hover:bg-sky-50/50 transition-colors">
                                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                                        {item.timestamp}
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-sky-600 whitespace-nowrap">
                                        {item.serialNo}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-800">{item.sku}</td>
                                    <td className="px-4 py-3 text-slate-600">{item.name}</td>
                                    <td className="px-4 py-3 text-slate-600">
                                        <span className="bg-sky-100 text-sky-700 px-2 py-0.5 rounded text-xs font-medium">
                                            {item.unit}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{item.mcq}</td>
                                    <td className="px-4 py-3 text-slate-600">{item.maxLevel}</td>
                                    <td className="px-4 py-3">
                                        <span className={`font-semibold ${item.closingStock <= (item.maxLevel * 0.2) ? 'text-rose-500' : 'text-emerald-600'}`}>
                                            {item.closingStock}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{item.reorderQty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {filteredIndents.length === 0 && (
                        <div className="text-center py-12 text-slate-400">
                            <Box size={32} className="mx-auto mb-3 opacity-50" />
                            <p>No indents found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReceiveIndent;
