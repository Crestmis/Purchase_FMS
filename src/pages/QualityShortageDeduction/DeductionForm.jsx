import React, { useState } from 'react';
import { X, CheckCircle, Calculator, Truck, FileText, IndianRupee, MessageSquare, Package } from 'lucide-react';
import Portal from '../../components/Portal';

const DeductionForm = ({ data, onClose, onSave }) => {
    const [deductionAmount, setDeductionAmount] = useState(0);
    const [otherDeductions, setOtherDeductions] = useState(0);
    const [remarks, setRemarks] = useState('');
    const [status, setStatus] = useState('Deduction Applied');

    const handleSave = (e) => {
        e.preventDefault();
        onSave({ 
            ...data, 
            deductionAmount,
            otherDeductions,
            remarks,
            status
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
                                <Calculator className="text-sky-500" size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-extrabold text-slate-800">Remittance Adjustment</h2>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{data.serialNo} • Final Settlement</p>
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
                    <form onSubmit={handleSave} className="flex-1 min-h-0 overflow-y-auto p-5 space-y-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                        
                        {/* Adjustment Context Card */}
                        <div className="bg-sky-50/50 rounded-[1.5rem] p-3.5 border border-sky-100/50">
                            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                                <div className="col-span-2">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Beneficiary Entity</label>
                                    <span className="font-extrabold text-slate-800 text-lg">{data.vendorName}</span>
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Vehicle Ref</label>
                                    <div className="flex items-center gap-2 text-slate-700 font-bold uppercase">
                                        <Truck size={14} className="text-sky-400" />
                                        <span>{data.vehicleNo}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Invoiced ID</label>
                                    <div className="flex items-center gap-1.5 font-bold text-slate-700 uppercase">
                                        <FileText size={14} className="text-slate-400" />
                                        <span>{data.invoiceNo}</span>
                                    </div>
                                </div>
                                <div className="col-span-2 pt-3 border-t border-sky-100 flex items-center gap-2">
                                    <Package size={14} className="text-sky-400" />
                                    <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">{data.name} • {data.reorderQty} {data.unit}</span>
                                </div>
                            </div>
                        </div>

                        {/* Financial Inputs */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block px-1">Quality Shortage</label>
                                <div className="relative group">
                                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-400 transition-colors" size={16} />
                                    <input 
                                        type="number" 
                                        required
                                        value={deductionAmount}
                                        onChange={(e) => setDeductionAmount(e.target.value)}
                                        className="w-full pl-10 pr-4 h-11 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 shadow-sm transition-all text-sm font-bold text-rose-600"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block px-1">Other Adjustments</label>
                                <div className="relative group">
                                    <Calculator className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-400 transition-colors" size={16} />
                                    <input 
                                        type="number" 
                                        value={otherDeductions}
                                        onChange={(e) => setOtherDeductions(e.target.value)}
                                        className="w-full pl-10 pr-4 h-11 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 shadow-sm transition-all text-sm font-bold text-slate-700"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Audit Remarks */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block px-1">Reason for Adjustment</label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-4 text-slate-300" size={18} />
                                <textarea 
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 shadow-sm transition-all text-sm font-medium min-h-[80px] resize-none"
                                    placeholder="Explain variance in quantity or quality parameters..."
                                />
                            </div>
                        </div>

                        {/* Confirmation */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block px-1">Reconciliation Status</label>
                            <div className="grid grid-cols-1">
                                <label className={`
                                    group flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all active:scale-95
                                    ${status === 'Deduction Applied' 
                                        ? 'bg-rose-50 border-rose-500 text-rose-700 ring-4 ring-rose-500/10 shadow-md' 
                                        : 'bg-white border-slate-100 text-slate-500 hover:border-rose-200 hover:bg-rose-50/30'}
                                `}>
                                    <input 
                                        type="radio" 
                                        name="status" 
                                        value="Deduction Applied" 
                                        checked={status === 'Deduction Applied'} 
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="sr-only" 
                                    />
                                    <CheckCircle size={20} className={status === 'Deduction Applied' ? 'text-rose-500' : 'text-slate-300 group-hover:text-rose-400'} />
                                    <span className="font-extrabold text-sm uppercase tracking-tight">Finalize Adjustments</span>
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
                            className="flex items-center gap-2 px-8 h-10.5 text-white bg-gradient-to-r from-rose-600 to-rose-500 rounded-2xl text-[10px] font-extrabold uppercase tracking-wider shadow-lg shadow-rose-500/25 transition-all active:scale-95 hover:-translate-y-0.5 hover:shadow-rose-500/40"
                        >
                            Process Settlement
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default DeductionForm;
