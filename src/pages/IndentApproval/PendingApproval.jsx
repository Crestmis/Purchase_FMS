import React, { useState } from 'react';
import { Box, CheckCircle } from 'lucide-react';
import ApprovalForm from './ApprovalForm';

const PendingApproval = ({ indents, onProcess }) => {
    const [selectedIndent, setSelectedIndent] = useState(null);

    return (
        <div className="flex-1 bg-white/90 backdrop-blur-sm border border-sky-100 rounded-2xl shadow-lg overflow-hidden flex flex-col">
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-sm text-left">
                    <thead className="bg-sky-50 text-sky-700 font-medium border-b border-sky-100 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-center whitespace-nowrap">Action</th>
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
                        {indents.map((item) => (
                            <tr key={item.id} className="hover:bg-sky-50/50 transition-colors">
                                <td className="px-4 py-3 text-center">
                                    <button 
                                        onClick={() => setSelectedIndent(item)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white rounded-lg text-xs font-medium hover:shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
                                    >
                                        <CheckCircle size={14} />
                                        Approve
                                    </button>
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
                
                {indents.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        <Box size={32} className="mx-auto mb-3 opacity-50" />
                        <p>No pending indents require approval.</p>
                    </div>
                )}
            </div>

            {selectedIndent && (
                <ApprovalForm 
                    data={selectedIndent} 
                    onClose={() => setSelectedIndent(null)} 
                    onSave={(processedData) => {
                        onProcess(processedData);
                        setSelectedIndent(null);
                    }} 
                />
            )}
        </div>
    );
};

export default PendingApproval;
