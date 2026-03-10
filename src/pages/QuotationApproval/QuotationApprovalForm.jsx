import React, { useState } from 'react';
import { X, CheckCircle, XCircle, ShieldCheck, IndianRupee, MessageSquare, AlertCircle } from 'lucide-react';
import Portal from '../../components/Portal';

const QuotationApprovalForm = ({ data, onClose, onSave }) => {
    const [status, setStatus] = useState('Approve');
    const [remarks, setRemarks] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        onSave({ 
            ...data, 
            status,
            remarks
        });
    };

    if (!data) return null;

    return (
        <Portal>
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
                <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-[460px] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in slide-in-from-bottom-4 duration-300 border border-white/20">
                    {/* Header */}
                    <div className="bg-gradient-to-b from-sky-50 to-white border-b border-slate-100 px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center border border-sky-100">
                                <ShieldCheck className="text-sky-500" size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-extrabold text-slate-800">Approve Quote</h2>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{data.serialNo} • Final Selection</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-slate-400 hover:text-rose-500 transition-colors bg-white p-2 rounded-xl border border-slate-200 hover:border-rose-200 shadow-sm"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Form Body */}
                    <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                        
                        {/* Quotation Summary Card */}
                        <div className="bg-sky-50/50 rounded-[1.5rem] p-3.5 border border-sky-100/50">
                            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                                <div className="col-span-2">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Vendor Selection</label>
                                    <span className="font-extrabold text-slate-800 text-lg">{data.vendorName}</span>
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Quoted Price</label>
                                    <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold">
                                        <IndianRupee size={16} />
                                        <span>{data.quotedPrice}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Lead Time</label>
                                    <span className="font-bold text-slate-700">{data.leadTime} Days</span>
                                </div>
                                <div className="col-span-2 pt-3 border-t border-sky-100">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Item Review</label>
                                    <span className="text-sm font-medium text-slate-600">{data.sku} • {data.name} ({data.reorderQty} {data.unit})</span>
                                </div>
                            </div>
                        </div>

                        {/* Remarks Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block px-1">Approval Comments</label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-4 text-slate-300" size={18} />
                                <textarea 
                                    rows={2}
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 shadow-sm transition-all text-sm font-medium"
                                    placeholder="Add notes for the accounts team..."
                                />
                            </div>
                        </div>

                        {/* Action Section */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block px-1">Decision</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`
                                    group flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all active:scale-95
                                    ${status === 'Approve' 
                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-4 ring-emerald-500/10 shadow-md' 
                                        : 'bg-white border-slate-100 text-slate-500 hover:border-emerald-200 hover:bg-emerald-50/30'}
                                `}>
                                    <input 
                                        type="radio" 
                                        name="status" 
                                        value="Approve" 
                                        checked={status === 'Approve'} 
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="sr-only" 
                                    />
                                    <CheckCircle size={20} className={status === 'Approve' ? 'text-emerald-500' : 'text-slate-300 group-hover:text-emerald-400'} />
                                    <span className="font-extrabold text-sm uppercase tracking-tight">Approve Selection</span>
                                </label>

                                <label className={`
                                    group flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all active:scale-95
                                    ${status === 'Reject' 
                                        ? 'bg-rose-50 border-rose-500 text-rose-700 ring-4 ring-rose-500/10 shadow-md' 
                                        : 'bg-white border-slate-100 text-slate-500 hover:border-rose-200 hover:bg-rose-50/30'}
                                `}>
                                    <input 
                                        type="radio" 
                                        name="status" 
                                        value="Reject" 
                                        checked={status === 'Reject'} 
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="sr-only" 
                                    />
                                    <XCircle size={20} className={status === 'Reject' ? 'text-rose-500' : 'text-slate-300 group-hover:text-rose-400'} />
                                    <span className="font-extrabold text-sm uppercase tracking-tight">Reject Quote</span>
                                </label>
                            </div>
                        </div>
                    </form>

                    {/* Modal Footer */}
                    <div className="px-5 py-3.5 bg-slate-50/50 border-t border-slate-100 flex gap-2.5 justify-end">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-5 h-10.5 rounded-2xl border border-slate-200 bg-white text-slate-600 font-extrabold text-[10px] uppercase tracking-wider hover:bg-slate-50 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            className={`flex items-center gap-2 px-8 h-10.5 text-white rounded-2xl text-[10px] font-extrabold uppercase tracking-wider shadow-lg transition-all active:scale-95 hover:-translate-y-0.5
                                ${status === 'Approve' 
                                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-emerald-500/25 hover:shadow-emerald-500/40' 
                                    : 'bg-gradient-to-r from-rose-600 to-rose-500 shadow-rose-500/25 hover:shadow-rose-500/40'}
                            `}
                        >
                            {status === 'Approve' ? 'Confirm Approval' : 'Submit Rejection'}
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default QuotationApprovalForm;
