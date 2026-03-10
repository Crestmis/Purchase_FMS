import React from 'react';
import { Box, CheckCircle } from 'lucide-react';

const HistoryDeduction = ({ indents }) => {
    return (
        <div className="flex-1 bg-white/90 backdrop-blur-sm border border-sky-100 rounded-2xl shadow-lg overflow-hidden flex flex-col">
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-sm text-left">
                    <thead className="bg-sky-50 text-sky-700 font-medium border-b border-sky-100 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 whitespace-nowrap">Deduction Status</th>
                            <th className="px-4 py-3 whitespace-nowrap">Shortage Qty</th>
                            <th className="px-4 py-3 whitespace-nowrap">Deduction Amt</th>
                            <th className="px-4 py-3 whitespace-nowrap">Invoice No</th>
                            <th className="px-4 py-3 whitespace-nowrap">Serial No</th>
                            <th className="px-4 py-3 whitespace-nowrap">Vendor</th>
                            <th className="px-4 py-3 whitespace-nowrap">SKU Code</th>
                            <th className="px-4 py-3 text-right">Net Qty</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-sky-50">
                        {indents.map((item) => (
                            <tr key={item.id} className="hover:bg-sky-50/50 transition-colors">
                                <td className="px-4 py-3">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200">
                                        <CheckCircle size={12} />
                                        {item.remittanceStatus}
                                    </span>
                                </td>
                                <td className="px-4 py-3 font-medium text-rose-600">
                                    -{item.shortageQty} {item.unit}
                                </td>
                                <td className="px-4 py-3 font-bold text-slate-800">
                                    ₹{Number(item.deductionAmount).toLocaleString()}
                                </td>
                                <td className="px-4 py-3 font-medium text-purple-700 uppercase">
                                    {item.invoiceNo || '-'}
                                </td>
                                <td className="px-4 py-3 font-semibold text-slate-500 whitespace-nowrap">
                                    {item.serialNo}
                                </td>
                                <td className="px-4 py-3 font-semibold text-sky-700">{item.vendorName || '-'}</td>
                                <td className="px-4 py-3 font-medium text-slate-600">{item.sku}</td>
                                <td className="px-4 py-3 text-right font-bold text-emerald-700">
                                    {item.unloadedQty - item.shortageQty} {item.unit}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {indents.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        <Box size={32} className="mx-auto mb-3 opacity-50" />
                        <p>No deduction history found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryDeduction;
