import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Save, Search, Box, Filter } from 'lucide-react';

import IMSOrderForm from './IMSOrderForm';

const dummyIMSData = [
    { id: 1, serial: 1, sku: 'SKU001', name: 'Steel Rod 10mm', unit: 'KL', mcq: 50, maxLevel: 500, closingStock: 120, reorderQty: 200 },
    { id: 2, serial: 2, sku: 'SKU002', name: 'Cement Bag 50kg', unit: 'KL', mcq: 100, maxLevel: 1000, closingStock: 350, reorderQty: 400 },
    { id: 3, serial: 3, sku: 'SKU003', name: 'Bricks', unit: 'KL', mcq: 5000, maxLevel: 50000, closingStock: 15000, reorderQty: 20000 },
    { id: 4, serial: 4, sku: 'SKU004', name: 'Sand', unit: 'KL', mcq: 1000, maxLevel: 10000, closingStock: 2500, reorderQty: 4000 },
    { id: 5, serial: 5, sku: 'SKU005', name: 'Aggregate 20mm', unit: 'KL', mcq: 1000, maxLevel: 8000, closingStock: 3000, reorderQty: 4000 },
    { id: 6, serial: 6, sku: 'SKU006', name: 'Binding Wire', unit: 'KL', mcq: 50, maxLevel: 500, closingStock: 80, reorderQty: 150 },
    { id: 7, serial: 7, sku: 'SKU007', name: 'Paint White', unit: 'KL', mcq: 20, maxLevel: 200, closingStock: 45, reorderQty: 80 },
    { id: 8, serial: 8, sku: 'SKU008', name: 'Plywood 18mm', unit: 'KL', mcq: 10, maxLevel: 100, closingStock: 25, reorderQty: 40 },
    { id: 9, serial: 9, sku: 'SKU009', name: 'Nails 2 inch', unit: 'KL', mcq: 10, maxLevel: 100, closingStock: 30, reorderQty: 50 },
    { id: 10, serial: 10, sku: 'SKU010', name: 'Safety Helmets', unit: 'KL', mcq: 20, maxLevel: 150, closingStock: 40, reorderQty: 60 },
];

const IMS = () => {
    const [imsData, setImsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [stockFilter, setStockFilter] = useState('All');
    const [unitFilter, setUnitFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        // Load initial dummy data if none exists
        const stored = localStorage.getItem('crest_purchase_ims_data_v2');
        if (!stored) {
            localStorage.setItem('crest_purchase_ims_data_v2', JSON.stringify(dummyIMSData));
            setImsData(dummyIMSData);
        } else {
            setImsData(JSON.parse(stored));
        }
    }, []);

    const handlePlaceOrder = (item) => {
        setFormData({ ...item });
        setShowModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'mcq' || name === 'maxLevel' || name === 'closingStock' || name === 'reorderQty' 
                ? Number(value) : value
        }));
    };

    const handleSaveOrder = (e) => {
        if (e) e.preventDefault();

        // Ensure Receive Indent dummy data generates if missing first
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
            existingIndents.reverse(); // Newest first
            localStorage.setItem('crest_purchase_receive_indent_v2_initialized', 'true');
        }

        // Generate ID formatting
        const currentCount = existingIndents.length;
        const serialNo = `SN-${String(currentCount + 1).padStart(3, '0')}`;
        
        const now = new Date();
        const timestamp = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth()+1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const newIndent = {
            id: Date.now(),
            timestamp,
            serialNo,
            sku: formData.sku,
            name: formData.name,
            unit: formData.unit,
            mcq: formData.mcq,
            maxLevel: formData.maxLevel,
            closingStock: formData.closingStock,
            reorderQty: formData.reorderQty
        };

        const updatedIndents = [newIndent, ...existingIndents];
        localStorage.setItem('crest_purchase_receive_indent_v2', JSON.stringify(updatedIndents));

        setShowModal(false);
        // Using a more modern notification would be better, but keeping functionality for now
        alert(`Order successfully placed! Forwarded to Receive Indent as ${serialNo}`);
    };

    const filteredData = imsData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.sku.toLowerCase().includes(searchTerm.toLowerCase());
        
        const isLowStock = item.closingStock <= (item.maxLevel * 0.2);
        const matchesStockFilter = stockFilter === 'All' || 
                                   (stockFilter === 'Low' && isLowStock) || 
                                   (stockFilter === 'Normal' && !isLowStock);
                                   
        const matchesUnitFilter = unitFilter === 'All' || item.unit === unitFilter;
                              
        return matchesSearch && matchesStockFilter && matchesUnitFilter;
    });

    // Extract unique units for the filter dropdown
    const uniqueUnits = [...new Set(imsData.map(item => item.unit))];

    return (
        <div className="h-full flex flex-col p-4 lg:p-6 space-y-4">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-sky-100 shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Box className="text-sky-500" />
                        Inventory Management System (IMS)
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Manage stock levels and place material orders</p>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search SKU or Item Name..." 
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

            {/* Desktop Table Area */}
            <div className="hidden lg:flex flex-1 bg-white/90 backdrop-blur-sm border border-sky-100 rounded-2xl shadow-lg overflow-hidden flex-col">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-sky-50 text-sky-700 font-medium border-b border-sky-100 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 whitespace-nowrap">Serial NO</th>
                                <th className="px-4 py-3 whitespace-nowrap">SKU Code</th>
                                <th className="px-4 py-3 whitespace-nowrap">Item Name</th>
                                <th className="px-4 py-3 whitespace-nowrap">Unit</th>
                                <th className="px-4 py-3 whitespace-nowrap">MCQ</th>
                                <th className="px-4 py-3 whitespace-nowrap">Max Level</th>
                                <th className="px-4 py-3 whitespace-nowrap">Closing Stock</th>
                                <th className="px-4 py-3 whitespace-nowrap">Reorder Qty</th>
                                <th className="px-4 py-3 text-center whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sky-50">
                            {filteredData.map((item) => (
                                <tr key={item.id} className="hover:bg-sky-50/50 transition-colors">
                                    <td className="px-4 py-3 text-slate-600">{item.serial}</td>
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
                                    <td className="px-4 py-3 text-center">
                                        <button 
                                            onClick={() => handlePlaceOrder(item)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-500 to-sky-400 text-white rounded-lg text-xs font-medium hover:shadow-lg shadow-sky-500/30 transition-all hover:-translate-y-0.5"
                                        >
                                            <ShoppingCart size={14} />
                                            Place Order
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredData.length === 0 && (
                        <div className="text-center py-12 text-slate-400">
                            <Box size={32} className="mx-auto mb-3 opacity-50" />
                            <p>No inventory items found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden flex-1 overflow-y-auto space-y-4 pb-4">
                {filteredData.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4 space-y-4">
                        <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full uppercase">S.No {item.serial}</span>
                                    <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full uppercase">{item.sku}</span>
                                </div>
                                <h3 className="font-bold text-slate-800 mt-2">{item.name}</h3>
                            </div>
                            <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-xl text-xs font-bold">
                                {item.unit}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-slate-50/50 p-2.5 rounded-xl">
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Max Level</label>
                                <span className="text-slate-700 font-semibold">{item.maxLevel}</span>
                            </div>
                            <div className="bg-slate-50/50 p-2.5 rounded-xl">
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Stock</label>
                                <span className={`font-bold ${item.closingStock <= (item.maxLevel * 0.2) ? 'text-rose-500' : 'text-emerald-600'}`}>
                                    {item.closingStock}
                                </span>
                            </div>
                            <div className="bg-slate-50/50 p-2.5 rounded-xl">
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">MCQ</label>
                                <span className="text-slate-700 font-semibold">{item.mcq}</span>
                            </div>
                            <div className="bg-slate-50/50 p-2.5 rounded-xl">
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Reorder Qty</label>
                                <span className="text-slate-700 font-semibold">{item.reorderQty}</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => handlePlaceOrder(item)}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-sky-600 to-sky-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-sky-500/20 active:scale-[0.98] transition-all"
                        >
                            <ShoppingCart size={16} />
                            Place Material Order
                        </button>
                    </div>
                ))}
                
                {filteredData.length === 0 && (
                    <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-sky-100 shadow-sm">
                        <Box size={32} className="mx-auto mb-3 opacity-50" />
                        <p className="text-sm">No items found.</p>
                    </div>
                )}
            </div>

            {/* Place Order Modal */}
            {showModal && (
                <IMSOrderForm 
                    formData={formData} 
                    onFormChange={handleFormChange} 
                    onClose={() => setShowModal(false)} 
                    onSave={handleSaveOrder} 
                />
            )}
        </div>
    );
};

export default IMS;
