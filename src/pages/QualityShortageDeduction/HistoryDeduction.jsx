import React from 'react';
import { Box, CheckCircle } from 'lucide-react';

const HistoryDeduction = ({ indents }) => {
    return (
        <div className="flex-1 bg-white/90 backdrop-blur-sm border border-sky-100 rounded-2xl shadow-lg overflow-hidden flex flex-col">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto flex-1">
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
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden flex-1 overflow-y-auto p-4 space-y-4">
                {indents.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4 space-y-4">
                        <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full uppercase">{item.serialNo}</span>
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-50 text-rose-600 border border-rose-100">
                                        <CheckCircle size={10} />
                                        {item.remittanceStatus}
                                    </span>
                                </div>
                                <h3 className="font-bold text-slate-800 mt-2">{item.name}</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                                <label className="text-[10px] font-bold text-rose-400 uppercase block mb-1">Shortage</label>
                                <span className="text-rose-700 font-bold">-{item.shortageQty} {item.unit}</span>
                            </div>
                            <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                                <label className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">Net Weight</label>
                                <span className="text-emerald-700 font-bold">{item.unloadedQty - item.shortageQty} {item.unit}</span>
                            </div>
                            <div className="bg-slate-50/50 p-2.5 rounded-xl col-span-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Deduction Amount</label>
                                <span className="text-slate-900 font-bold text-lg">₹{Number(item.deductionAmount).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {indents.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                    <Box size={32} className="mx-auto mb-3 opacity-50" />
                    <p>No deduction history found.</p>
                </div>
            )}
        </div>
    );
};

export default HistoryDeduction;
