import React from 'react';
import { X, ShoppingCart, Save } from 'lucide-react';
import Portal from '../../components/Portal';

const IMSOrderForm = ({ formData, onFormChange, onClose, onSave }) => {
    if (!formData) return null;

    return (
        <Portal>
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
                <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-[460px] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in slide-in-from-bottom-4 duration-300 border border-white/20">
                    {/* Modal Header */}
                    <div className="bg-gradient-to-b from-sky-50 to-white border-b border-slate-100 px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center border border-sky-100">
                                <ShoppingCart className="text-sky-500" size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-extrabold text-slate-800">Place Order</h2>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Inventory Request</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-slate-400 hover:text-rose-500 transition-colors bg-white p-2 rounded-xl border border-slate-200 hover:border-rose-200 shadow-sm"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <form onSubmit={onSave} className="flex-1 overflow-y-auto p-5 space-y-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                        <div className="bg-sky-50/50 rounded-[1.5rem] p-3.5 border border-sky-100/50 space-y-2.5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">SKU Code</label>
                                    <input 
                                        type="text" 
                                        name="sku" 
                                        value={formData.sku} 
                                        onChange={onFormChange} 
                                        required 
                                        className="w-full px-4 h-10.5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 shadow-sm transition-all text-sm font-medium text-slate-700" 
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Unit</label>
                                    <input 
                                        type="text" 
                                        name="unit" 
                                        value={formData.unit} 
                                        onChange={onFormChange} 
                                        required 
                                        className="w-full px-4 h-10.5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 shadow-sm transition-all text-sm font-medium text-slate-700" 
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Item Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={onFormChange} 
                                    required 
                                    className="w-full px-4 h-10.5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 shadow-sm transition-all text-sm font-medium text-slate-700" 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">MCQ</label>
                                <input 
                                    type="number" 
                                    name="mcq" 
                                    value={formData.mcq} 
                                    onChange={onFormChange} 
                                    required 
                                    className="w-full px-4 h-12 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 shadow-sm transition-all text-sm font-medium text-slate-700" 
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Max Level</label>
                                <input 
                                    type="number" 
                                    name="maxLevel" 
                                    value={formData.maxLevel} 
                                    onChange={onFormChange} 
                                    required 
                                    className="w-full px-4 h-12 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 shadow-sm transition-all text-sm font-medium text-slate-700" 
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Closing Stock</label>
                                <input 
                                    type="number" 
                                    name="closingStock" 
                                    value={formData.closingStock} 
                                    onChange={onFormChange} 
                                    required 
                                    className="w-full px-4 h-12 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 shadow-sm transition-all text-sm font-medium text-slate-700" 
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Reorder Qty</label>
                                <input 
                                    type="number" 
                                    name="reorderQty" 
                                    value={formData.reorderQty} 
                                    onChange={onFormChange} 
                                    required 
                                    className="w-full px-4 h-12 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 shadow-sm transition-all text-sm font-medium text-slate-700" 
                                />
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
                            onClick={onSave}
                            className="flex items-center gap-2 px-8 h-10.5 bg-gradient-to-r from-sky-600 to-sky-500 text-white rounded-2xl text-[10px] font-extrabold uppercase tracking-wider shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all active:scale-95"
                        >
                            <Save size={16} />
                            Confirm Order
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default IMSOrderForm;
