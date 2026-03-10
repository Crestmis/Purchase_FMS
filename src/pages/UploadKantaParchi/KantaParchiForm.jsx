import React, { useState } from 'react';
import { X, CheckCircle, Upload, Scale, Truck, FileText, FileDigit, Package } from 'lucide-react';
import Portal from '../../components/Portal';

const KantaParchiForm = ({ data, onClose, onSave }) => {
    const [status, setStatus] = useState('Uploaded');
    const [slipNumber, setSlipNumber] = useState('');
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        onSave({ 
            ...data, 
            status,
            slipNumber,
            fileStatus: 'Success',
            fileName: fileName || 'Weight_Slip.pdf'
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
                                <Scale className="text-sky-500" size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-extrabold text-slate-800">Weight Certificate</h2>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{data.serialNo} • Kanta Parchi Upload</p>
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
                        
                        {/* Logistical Context Card */}
                        <div className="bg-sky-50/50 rounded-[1.5rem] p-3.5 border border-sky-100/50">
                            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                                <div className="col-span-2">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Originator</label>
                                    <span className="font-extrabold text-slate-800 text-lg leading-tight block">{data.vendorName}</span>
                                </div>
                                
                                <div>
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Vehicle Registry</label>
                                    <div className="flex items-center gap-2 text-slate-700 font-bold uppercase italic">
                                        <Truck size={14} className="text-sky-400" />
                                        <span>{data.vehicleNo}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Warehouse Net</label>
                                    <div className="flex items-center gap-1.5 font-bold text-sky-600">
                                        <Package size={14} />
                                        <span>{data.unloadedQty} {data.unit}</span>
                                    </div>
                                </div>

                                <div className="col-span-2 pt-3 border-t border-sky-100/50 flex items-center gap-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                                    <FileText size={12} className="text-slate-300" />
                                    <span>Reference: {data.invoiceNo}</span>
                                </div>
                            </div>
                        </div>

                        {/* Documentation Inputs */}
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block px-1">Slip Serial Number</label>
                                <div className="relative group">
                                    <FileDigit className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input 
                                        type="text" 
                                        required
                                        value={slipNumber}
                                        onChange={(e) => setSlipNumber(e.target.value)}
                                        className="w-full pl-11 pr-4 h-10.5 bg-slate-50/50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 shadow-sm transition-all text-sm font-bold uppercase"
                                        placeholder="Enter slip ID..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block px-1">Physical Proof Upload</label>
                                <div className="relative group">
                                    <input 
                                        type="file" 
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                    />
                                    <div className={`
                                        border-2 border-dashed rounded-[1.5rem] p-5 flex flex-col items-center justify-center gap-2 transition-all active:scale-[0.98]
                                        ${fileName 
                                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700 ring-4 ring-emerald-500/5' 
                                            : 'bg-slate-50/50 border-slate-200 group-hover:border-sky-300 group-hover:bg-sky-50/50'}
                                    `}>
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${fileName ? 'bg-emerald-100 text-emerald-600' : 'bg-white shadow-sm text-slate-400 group-hover:text-sky-500'}`}>
                                            <Upload size={24} />
                                        </div>
                                        <div className="text-center">
                                            <p className={`text-sm font-extrabold ${fileName ? 'text-emerald-800' : 'text-slate-600 group-hover:text-sky-700'}`}>
                                                {fileName || 'Drop Weight Slip Document'}
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">PDF, JPG or PNG (Max 10MB)</p>
                                        </div>
                                        {fileName && (
                                            <div className="mt-2 px-3 py-1 bg-emerald-100/50 rounded-full text-[10px] font-extrabold text-emerald-600 uppercase">
                                                File Selected Successfully
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Section */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block px-1">Upload Confirmation</label>
                            <div className="grid grid-cols-1">
                                <label className={`
                                    group flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all active:scale-95
                                    ${status === 'Uploaded' 
                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-4 ring-emerald-500/10 shadow-md' 
                                        : 'bg-white border-slate-100 text-slate-500 hover:border-emerald-200 hover:bg-emerald-50/30'}
                                `}>
                                    <input 
                                        type="radio" 
                                        name="status" 
                                        value="Uploaded" 
                                        checked={status === 'Uploaded'} 
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="sr-only" 
                                    />
                                    <CheckCircle size={20} className={status === 'Uploaded' ? 'text-emerald-500' : 'text-slate-300 group-hover:text-emerald-400'} />
                                    <span className="font-extrabold text-sm uppercase tracking-tight">Verify Parchi as Uploaded</span>
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
                            className="flex items-center gap-2 px-8 h-10.5 text-white bg-gradient-to-r from-sky-600 to-sky-500 rounded-2xl text-[10px] font-extrabold uppercase tracking-wider shadow-lg shadow-sky-500/25 transition-all active:scale-95 hover:-translate-y-0.5 hover:shadow-sky-500/40"
                        >
                            Finalize Upload
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default KantaParchiForm;
