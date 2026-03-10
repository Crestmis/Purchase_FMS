import React, { useState } from 'react';
import { X, CheckCircle, XCircle, Send, Users, IndianRupee, Package } from 'lucide-react';
import Portal from '../../components/Portal';

const IntimationForm = ({ data, onClose, onSave }) => {
    const [status, setStatus] = useState('Sent');
    const [groupName, setGroupName] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        onSave({ 
            ...data, 
            status,
            groupName
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
                                <Send className="text-sky-500" size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-extrabold text-slate-800">WhatsApp Intimation</h2>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{data.serialNo} • Notification Dispatch</p>
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
                        
                        {/* Order Summary Card */}
                        <div className="bg-sky-50/50 rounded-[1.5rem] p-3.5 border border-sky-100/50">
                            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                                <div className="col-span-2">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Approved Vendor</label>
                                    <span className="font-extrabold text-slate-800 text-lg">{data.vendorName}</span>
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Material Details</label>
                                    <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                                        <Package size={14} className="text-sky-400" />
                                        <span>{data.name}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Value Approved</label>
                                    <div className="flex items-center gap-1 text-emerald-600 font-extrabold">
                                        <IndianRupee size={14} />
                                        <span>{data.quotedPrice}</span>
                                    </div>
                                </div>
                                <div className="col-span-2 pt-3 border-t border-sky-100">
                                    <span className="bg-sky-100/50 text-sky-700 px-3 py-1.5 rounded-xl text-xs font-bold block text-center">
                                        Total Quantity: {data.reorderQty} {data.unit}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Group Name Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block px-1">WhatsApp Recipient Group</label>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input 
                                    type="text" 
                                    required
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    className="w-full pl-11 pr-4 h-10.5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 shadow-sm transition-all text-sm font-medium"
                                    placeholder="Enter group name (e.g. Purchase Dept)"
                                />
                            </div>
                        </div>

                        {/* Action Section */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block px-1">Message Status</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`
                                    group flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all active:scale-95
                                    ${status === 'Sent' 
                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-4 ring-emerald-500/10 shadow-md' 
                                        : 'bg-white border-slate-100 text-slate-500 hover:border-emerald-200 hover:bg-emerald-50/30'}
                                `}>
                                    <input 
                                        type="radio" 
                                        name="status" 
                                        value="Sent" 
                                        checked={status === 'Sent'} 
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="sr-only" 
                                    />
                                    <CheckCircle size={20} className={status === 'Sent' ? 'text-emerald-500' : 'text-slate-300 group-hover:text-emerald-400'} />
                                    <span className="font-extrabold text-sm uppercase tracking-tight">Mark Sent</span>
                                </label>

                                <label className={`
                                    group flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all active:scale-95
                                    ${status === 'Failed' 
                                        ? 'bg-rose-50 border-rose-500 text-rose-700 ring-4 ring-rose-500/10 shadow-md' 
                                        : 'bg-white border-slate-100 text-slate-500 hover:border-rose-200 hover:bg-rose-50/30'}
                                `}>
                                    <input 
                                        type="radio" 
                                        name="status" 
                                        value="Failed" 
                                        checked={status === 'Failed'} 
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="sr-only" 
                                    />
                                    <XCircle size={20} className={status === 'Failed' ? 'text-rose-500' : 'text-slate-300 group-hover:text-rose-400'} />
                                    <span className="font-extrabold text-sm uppercase tracking-tight">Mark Failed</span>
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
                                ${status === 'Sent' 
                                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-emerald-500/25 hover:shadow-emerald-500/40' 
                                    : 'bg-gradient-to-r from-rose-600 to-rose-500 shadow-rose-500/25 hover:shadow-rose-500/40'}
                            `}
                        >
                            {status === 'Sent' ? 'Confirm Dispatch' : 'Confirm Failure'}
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default IntimationForm;
