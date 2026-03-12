import React from 'react';
import { Box, CheckCircle } from 'lucide-react';

const HistoryDocumentReporting = ({ indents, SortDropdown }) => {
    return (
        <div className="flex-1 bg-white/90 backdrop-blur-sm border border-sky-100 rounded-2xl shadow-lg overflow-hidden flex flex-col">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto flex-1">
                <table className="w-full text-sm text-left">
                    <thead className="bg-sky-50 text-sky-700 font-medium border-b border-sky-100 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                    Doc Status <SortDropdown columnKey="status" />
                                </div>
                            </th>
                            <th className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                    Invoice No <SortDropdown columnKey="invoiceNo" />
                                </div>
                            </th>
                            <th className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                    Vehicle No <SortDropdown columnKey="vehicleNo" />
                                </div>
                            </th>
                            <th className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                    Serial No <SortDropdown columnKey="serialNo" />
                                </div>
                            </th>
                            <th className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                    Vendor <SortDropdown columnKey="vendorName" />
                                </div>
                            </th>
                            <th className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                    SKU Code <SortDropdown columnKey="sku" />
                                </div>
                            </th>
                            <th className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                    Item Name <SortDropdown columnKey="name" />
                                </div>
                            </th>
                            <th className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                    Total Qty <SortDropdown columnKey="reorderQty" />
                                </div>
                            </th>
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
                                <td className="px-4 py-3 font-medium text-purple-700 bg-purple-50/50 uppercase">
                                    {item.invoiceNo || '-'}
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
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden flex-1 overflow-y-auto p-4 space-y-4">
                {indents.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4 space-y-4">
                        <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full uppercase">{item.serialNo}</span>
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-600">
                                        <CheckCircle size={10} />
                                        {item.status}
                                    </span>
                                </div>
                                <h3 className="font-bold text-slate-800 mt-2">{item.name}</h3>
                            </div>
                            <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-xl text-xs font-bold">
                                {item.reorderQty} {item.unit}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-slate-50/50 p-2.5 rounded-xl">
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Vehicle No</label>
                                <span className="text-slate-800 font-bold uppercase">{item.vehicleNo || '-'}</span>
                            </div>
                            <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                                <label className="text-[10px] font-bold text-purple-400 uppercase block mb-1">Invoice No</label>
                                <span className="text-purple-700 font-bold uppercase">{item.invoiceNo || '-'}</span>
                            </div>
                            <div className="bg-slate-50/50 p-2.5 rounded-xl col-span-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Vendor</label>
                                <span className="text-sky-700 font-bold">{item.vendorName || '-'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {indents.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                    <Box size={32} className="mx-auto mb-3 opacity-50" />
                    <p>No document verification history found.</p>
                </div>
            )}
        </div>
    );
};

export default HistoryDocumentReporting;
