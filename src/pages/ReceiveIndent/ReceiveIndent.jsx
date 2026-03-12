import React, { useState, useEffect } from 'react';
import { Package, Search, Box, Filter, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';

const ReceiveIndent = () => {
    const [indents, setIndents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [stockFilter, setStockFilter] = useState('All');
    const [unitFilter, setUnitFilter] = useState('All');
    const [itemNameFilter, setItemNameFilter] = useState('All');
    const [skuFilter, setSkuFilter] = useState('All');
    const [maxLevelFilter, setMaxLevelFilter] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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
        const matchesItemNameFilter = itemNameFilter === 'All' || item.name === itemNameFilter;
        const matchesSkuFilter = skuFilter === 'All' || item.sku === skuFilter;
        const matchesMaxLevelFilter = maxLevelFilter === 'All' || String(item.maxLevel) === maxLevelFilter;
                              
        return matchesSearch && matchesStockFilter && matchesUnitFilter && matchesItemNameFilter && matchesSkuFilter && matchesMaxLevelFilter;
    });

    // Extract unique values for the filter dropdowns
    const uniqueUnits = [...new Set(indents.map(item => item.unit))].sort();
    const uniqueNames = [...new Set(indents.map(item => item.name))].sort();
    const uniqueSkus = [...new Set(indents.map(item => item.sku))].sort();
    const uniqueMaxLevels = [...new Set(indents.map(item => item.maxLevel))].sort((a, b) => a - b);

    const parseDate = (dateStr) => {
        if (!dateStr || typeof dateStr !== 'string') return new Date(0);
        const [datePart, timePart] = dateStr.split(' ');
        const [day, month, year] = datePart.split('/').map(Number);
        if (!timePart) return new Date(year, month - 1, day);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        return new Date(year, month - 1, day, hours, minutes, seconds);
    };

        const toggleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleSort = (key, direction) => {
        setSortConfig({ key, direction });
    };

    const sortedIndents = [...filteredIndents].sort((a, b) => {
        if (!sortConfig.key) return 0;
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'timestamp') {
            aValue = parseDate(aValue);
            bValue = parseDate(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

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
                            placeholder="Search..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-sky-50 border border-sky-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                    </div>
                    
                    <div className="relative shrink-0">
                        <select
                            value={itemNameFilter}
                            onChange={(e) => setItemNameFilter(e.target.value)}
                            className="appearance-none pl-9 pr-8 py-2 bg-white border border-sky-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-600 font-medium cursor-pointer hover:bg-sky-50 transition-colors shadow-sm w-full sm:w-40"
                        >
                            <option value="All">Item Name: All</option>
                            {uniqueNames.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" size={14} />
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
                        <Box className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" size={14} />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    <div className="relative shrink-0">
                        <select
                            value={maxLevelFilter}
                            onChange={(e) => setMaxLevelFilter(e.target.value)}
                            className="appearance-none pl-9 pr-8 py-2 bg-white border border-sky-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-600 font-medium cursor-pointer hover:bg-sky-50 transition-colors shadow-sm w-full sm:w-32"
                        >
                            <option value="All">Max: All</option>
                            {uniqueMaxLevels.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500 flex items-center justify-center font-bold text-[10px] w-4 h-4 border border-sky-500 rounded-full">
                            M
                        </div>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    
                    <div className="relative shrink-0">
                        <select
                            value={stockFilter}
                            onChange={(e) => setStockFilter(e.target.value)}
                            className="appearance-none pl-9 pr-8 py-2 bg-white border border-sky-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-600 font-medium cursor-pointer hover:bg-sky-50 transition-colors shadow-sm"
                        >
                            <option value="All">Stock: All</option>
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
                            <option value="All">Unit: All</option>
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

            {/* Desktop Table Area */}
            <div className="hidden lg:flex flex-1 bg-white/90 backdrop-blur-sm border border-sky-100 rounded-2xl shadow-lg overflow-hidden flex-col">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-sky-50 text-sky-700 font-medium border-b border-sky-100 sticky top-0 z-10">
                            <tr>
                                <th 
                                className="px-4 py-3 whitespace-nowrap cursor-pointer hover:bg-sky-100 transition-colors select-none"
                                onClick={() => toggleSort("timestamp")}
                            >
                                <div className="flex items-center">
                                    Timestamp <SortDropdown columnKey="timestamp" />
                                </div>
                            </th>
                                <th 
                                className="px-4 py-3 whitespace-nowrap cursor-pointer hover:bg-sky-100 transition-colors select-none"
                                onClick={() => toggleSort("serialNo")}
                            >
                                <div className="flex items-center">
                                    Serial No <SortDropdown columnKey="serialNo" />
                                </div>
                            </th>
                                <th 
                                className="px-4 py-3 whitespace-nowrap cursor-pointer hover:bg-sky-100 transition-colors select-none"
                                onClick={() => toggleSort("sku")}
                            >
                                <div className="flex items-center">
                                    SKU Code <SortDropdown columnKey="sku" />
                                </div>
                            </th>
                                <th 
                                className="px-4 py-3 whitespace-nowrap cursor-pointer hover:bg-sky-100 transition-colors select-none"
                                onClick={() => toggleSort("name")}
                            >
                                <div className="flex items-center">
                                    Item Name <SortDropdown columnKey="name" />
                                </div>
                            </th>
                                <th 
                                className="px-4 py-3 whitespace-nowrap cursor-pointer hover:bg-sky-100 transition-colors select-none"
                                onClick={() => toggleSort("unit")}
                            >
                                <div className="flex items-center">
                                    Unit <SortDropdown columnKey="unit" />
                                </div>
                            </th>
                                <th 
                                className="px-4 py-3 whitespace-nowrap cursor-pointer hover:bg-sky-100 transition-colors select-none"
                                onClick={() => toggleSort("mcq")}
                            >
                                <div className="flex items-center">
                                    MCQ <SortDropdown columnKey="mcq" />
                                </div>
                            </th>
                                <th 
                                className="px-4 py-3 whitespace-nowrap cursor-pointer hover:bg-sky-100 transition-colors select-none"
                                onClick={() => toggleSort("maxLevel")}
                            >
                                <div className="flex items-center">
                                    Max Level <SortDropdown columnKey="maxLevel" />
                                </div>
                            </th>
                                <th 
                                className="px-4 py-3 whitespace-nowrap cursor-pointer hover:bg-sky-100 transition-colors select-none"
                                onClick={() => toggleSort("closingStock")}
                            >
                                <div className="flex items-center">
                                    Closing Stock <SortDropdown columnKey="closingStock" />
                                </div>
                            </th>
                                <th 
                                className="px-4 py-3 whitespace-nowrap cursor-pointer hover:bg-sky-100 transition-colors select-none"
                                onClick={() => toggleSort("reorderQty")}
                            >
                                <div className="flex items-center">
                                    Reorder Qty <SortDropdown columnKey="reorderQty" />
                                </div>
                            </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sky-50">
                            {sortedIndents.map((item) => (
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

            {/* Mobile Card View */}
            <div className="lg:hidden flex-1 overflow-y-auto space-y-4 pb-4">
                {sortedIndents.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4 space-y-4">
                        <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full uppercase">Ref: {item.serialNo}</span>
                                    <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full uppercase">{item.sku}</span>
                                </div>
                                <h3 className="font-bold text-slate-800 mt-2">{item.name}</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Requested: {item.timestamp}</p>
                            </div>
                            <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-xl text-xs font-bold">
                                {item.unit}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-slate-50/50 p-2.5 rounded-xl">
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Stock Level</label>
                                <span className={`font-bold ${item.closingStock <= (item.maxLevel * 0.2) ? 'text-rose-500' : 'text-emerald-600'}`}>
                                    {item.closingStock} / {item.maxLevel}
                                </span>
                            </div>
                            <div className="bg-slate-50/50 p-2.5 rounded-xl">
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Reorder Qty</label>
                                <span className="text-slate-700 font-bold">{item.reorderQty}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredIndents.length === 0 && (
                    <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-sky-100 shadow-sm">
                        <Box size={32} className="mx-auto mb-3 opacity-50" />
                        <p className="text-sm">No indents found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReceiveIndent;
