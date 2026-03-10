import React, { useState } from 'react';
import { Box, FileText } from 'lucide-react';
import DocumentForm from './DocumentForm';

const PendingDocumentReporting = ({ indents, onProcess }) => {
    const [selectedIndent, setSelectedIndent] = useState(null);

    return (
        <div className="flex-1 bg-white/90 backdrop-blur-sm border border-sky-100 rounded-2xl shadow-lg overflow-hidden flex flex-col">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto flex-1">
                <table className="w-full text-sm text-left">
                    <thead className="bg-sky-50 text-sky-700 font-medium border-b border-sky-100 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-center whitespace-nowrap">Action</th>
                            <th className="px-4 py-3 whitespace-nowrap">Serial No</th>
                            <th className="px-4 py-3 whitespace-nowrap">Vehicle No</th>
                            <th className="px-4 py-3 whitespace-nowrap">Gate-In Time</th>
                            <th className="px-4 py-3 whitespace-nowrap">Vendor</th>
                            <th className="px-4 py-3 whitespace-nowrap">SKU Code</th>
                            <th className="px-4 py-3 whitespace-nowrap">Item Name</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-sky-50">
                        {indents.map((item) => (
                            <tr key={item.id} className="hover:bg-sky-50/50 transition-colors">
                                <td className="px-4 py-3 text-center">
                                    <button 
                                        onClick={() => setSelectedIndent(item)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-500 to-sky-400 text-white rounded-lg text-xs font-medium hover:shadow-lg shadow-sky-500/30 transition-all hover:-translate-y-0.5"
                                    >
                                        <FileText size={14} />
                                        Verify Docs
                                    </button>
                                </td>
                                <td className="px-4 py-3 font-semibold text-sky-600 whitespace-nowrap">
                                    {item.serialNo}
                                </td>
                                <td className="px-4 py-3 font-bold text-slate-800 uppercase bg-slate-50/50">{item.vehicleNo || '-'}</td>
                                <td className="px-4 py-3 font-medium text-amber-600">
                                    {item.arrivalTime ? new Date(item.arrivalTime).toLocaleString() : '-'}
                                </td>
                                <td className="px-4 py-3 font-semibold text-sky-700">{item.vendorName || '-'}</td>
                                <td className="px-4 py-3 font-medium text-slate-800">{item.sku}</td>
                                <td className="px-4 py-3 text-slate-600">{item.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden flex-1 overflow-y-auto p-4 space-y-4">
                {indents.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4 space-y-4">
                        <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full uppercase">{item.serialNo}</span>
                                    <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full uppercase">{item.sku}</span>
                                </div>
                                <h3 className="font-bold text-slate-800 mt-2">{item.name}</h3>
                            </div>
                            <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-xl text-xs font-bold">
                                VERIFICATION PENDING
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-slate-50/50 p-2.5 rounded-xl">
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Vehicle No</label>
                                <span className="text-slate-800 font-bold uppercase">{item.vehicleNo || '-'}</span>
                            </div>
                            <div className="bg-slate-50/50 p-2.5 rounded-xl">
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Arrived At</label>
                                <span className="text-amber-600 font-bold whitespace-nowrap">
                                    {item.arrivalTime ? new Date(item.arrivalTime).toLocaleTimeString() : '-'}
                                </span>
                            </div>
                            <div className="bg-slate-50/50 p-2.5 rounded-xl col-span-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Vendor</label>
                                <span className="text-sky-700 font-bold">{item.vendorName || '-'}</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => setSelectedIndent(item)}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-sky-600 to-sky-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-sky-500/20 active:scale-[0.98] transition-all"
                        >
                            <FileText size={16} />
                            Verify Documents
                        </button>
                    </div>
                ))}
            </div>

            {indents.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                    <Box size={32} className="mx-auto mb-3 opacity-50" />
                    <p>No arrived vehicles pending document verification.</p>
                </div>
            )}

            {selectedIndent && (
                <DocumentForm 
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

export default PendingDocumentReporting;
