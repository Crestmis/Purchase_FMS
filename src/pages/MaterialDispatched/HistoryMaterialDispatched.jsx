import React from 'react';
import { Box, CheckCircle } from 'lucide-react';

const HistoryMaterialDispatched = ({ indents }) => {
    return (
        <div className="flex-1 bg-white/90 backdrop-blur-sm border border-sky-100 rounded-2xl shadow-lg overflow-hidden flex flex-col">
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-sm text-left">
                    <thead className="bg-sky-50 text-sky-700 font-medium border-b border-sky-100 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 whitespace-nowrap">Status</th>
                            <th className="px-4 py-3 whitespace-nowrap">Dispatch Date</th>
                            <th className="px-4 py-3 whitespace-nowrap">Expected Arrival</th>
                            <th className="px-4 py-3 whitespace-nowrap">Vehicle No</th>
                            <th className="px-4 py-3 whitespace-nowrap">Serial No</th>
                            <th className="px-4 py-3 whitespace-nowrap">Vendor</th>
                            <th className="px-4 py-3 whitespace-nowrap">SKU Code</th>
                            <th className="px-4 py-3 whitespace-nowrap">Item Name</th>
                            <th className="px-4 py-3 whitespace-nowrap">Total Qty</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-sky-50">
                        {indents.map((item) => (
                            <tr key={item.id} className="hover:bg-sky-50/50 transition-colors">
                                <td className="px-4 py-3">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                                        <CheckCircle size={12} />
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 font-medium text-slate-600">
                                    {item.dispatchDate ? new Date(item.dispatchDate).toLocaleString() : '-'}
                                </td>
                                <td className="px-4 py-3 font-medium text-amber-600 bg-amber-50/50">
                                    {item.expectedArrival ? new Date(item.expectedArrival).toLocaleString() : '-'}
                                </td>
                                <td className="px-4 py-3 font-bold text-slate-800 uppercase bg-slate-50/50">{item.vehicleNo || '-'}</td>
                                <td className="px-4 py-3 font-semibold text-slate-500 whitespace-nowrap">
                                    {item.serialNo}
                                </td>
                                <td className="px-4 py-3 font-semibold text-sky-700">{item.vendorName || '-'}</td>
                                <td className="px-4 py-3 font-medium text-slate-600">{item.sku}</td>
                                <td className="px-4 py-3 text-slate-600">{item.name}</td>
                                <td className="px-4 py-3 text-slate-600 font-semibold">{item.reorderQty} {item.unit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {indents.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        <Box size={32} className="mx-auto mb-3 opacity-50" />
                        <p>No material dispatch history found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryMaterialDispatched;
