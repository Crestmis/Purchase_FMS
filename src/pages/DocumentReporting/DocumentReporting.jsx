import React, { useState, useEffect } from 'react';
import { ClipboardList, Clock, FileText } from 'lucide-react';
import PendingDocumentReporting from './PendingDocumentReporting';
import HistoryDocumentReporting from './HistoryDocumentReporting';

const DocumentReporting = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [pendingIndents, setPendingIndents] = useState([]);
    const [historyIndents, setHistoryIndents] = useState([]);

    useEffect(() => {
        // Mock data initialization for the Document Reporting Flow
        const initializeDocumentReporting = () => {
            const hasInitialized = localStorage.getItem('crest_purchase_documents_initialized');
            
            if (!hasInitialized) {
                // Generate 5 pending items (mocking gate-in arrived vehicles)
                const pending = Array.from({ length: 5 }).map((_, i) => ({
                    id: Date.now() + i,
                    serialNo: `SN-P${String(i + 1).padStart(3, '0')}`,
                    sku: `SKU${String(1100 + i).padStart(3, '0')}`,
                    name: `Pending Material ${i + 1}`,
                    unit: 'KL',
                    mcq: (i + 1) * 20,
                    maxLevel: (i + 1) * 200,
                    closingStock: (i + 1) * 15,
                    reorderQty: (i + 1) * 40,
                    vendorName: `Supplier ${i + 1} Pvt Ltd`,
                    quotedPrice: (i + 1) * 1100,
                    leadTime: (i % 3) + 2,
                    vehicleNo: `MH 12 AB ${4000 + i}`,
                    placementDate: new Date(Date.now() - (i * 86400000)).toISOString(),
                    dispatchDate: new Date(Date.now() - ((i + 1) * 86400000)).toISOString(),
                    expectedArrival: new Date(Date.now() + ((i) * 3600000)).toISOString(),
                    status: 'Arrived',
                    arrivalTime: new Date(Date.now() - ((i + 1) * 1800000)).toISOString()
                }));
                
                // Generate 5 history items
                const history = Array.from({ length: 5 }).map((_, i) => ({
                    id: Date.now() + 100 + i,
                    serialNo: `SN-H${String(i + 1).padStart(3, '0')}`,
                    sku: `SKU${String(1200 + i).padStart(3, '0')}`,
                    name: `History Material ${i + 1}`,
                    unit: 'KL',
                    mcq: (i + 1) * 15,
                    maxLevel: (i + 1) * 150,
                    closingStock: (i + 1) * 10,
                    reorderQty: (i + 1) * 30,
                    vendorName: `Supplier ${i + 5} Pvt Ltd`,
                    quotedPrice: (i + 1) * 950,
                    leadTime: (i % 3) + 1,
                    vehicleNo: `MH 12 CD ${5000 + i}`,
                    placementDate: new Date(Date.now() - ((i + 2) * 86400000)).toISOString(),
                    dispatchDate: new Date(Date.now() - ((i + 1) * 86400000)).toISOString(),
                    expectedArrival: new Date(Date.now() - ((i) * 3600000)).toISOString(),
                    arrivalTime: new Date(Date.now() - ((i + 2) * 1800000)).toISOString(),
                    status: 'Verified',
                    invoiceNo: `INV-24-${1000 + i}`
                }));

                localStorage.setItem('crest_purchase_pending_docs', JSON.stringify(pending));
                localStorage.setItem('crest_purchase_history_docs', JSON.stringify(history));
                localStorage.setItem('crest_purchase_documents_initialized', 'true');
                
                setPendingIndents(pending);
                setHistoryIndents(history);
            } else {
                setPendingIndents(JSON.parse(localStorage.getItem('crest_purchase_pending_docs') || '[]'));
                setHistoryIndents(JSON.parse(localStorage.getItem('crest_purchase_history_docs') || '[]'));
            }
        };

        initializeDocumentReporting();
    }, []);

    const processIndent = (processedData) => {
        // Remove from pending
        const updatedPending = pendingIndents.filter(item => item.id !== processedData.id);
        
        // Add to history at the top
        const updatedHistory = [processedData, ...historyIndents];

        // Update state and storage
        setPendingIndents(updatedPending);
        setHistoryIndents(updatedHistory);
        localStorage.setItem('crest_purchase_pending_docs', JSON.stringify(updatedPending));
        localStorage.setItem('crest_purchase_history_docs', JSON.stringify(updatedHistory));
    };

    return (
        <div className="h-full flex flex-col p-4 lg:p-6 space-y-4">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-sky-100 shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <FileText className="text-sky-500" />
                        Document Reporting
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Verify physical shipping documents and invoices at ops center</p>
                </div>
                
                {/* Custom Tab Navigation */}
                <div className="flex p-1 bg-sky-50/80 backdrop-blur-sm rounded-xl border border-sky-100/50 w-full sm:w-auto self-start sm:self-auto">
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`
                            flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all
                            ${activeTab === 'pending' 
                                ? 'bg-white text-sky-700 shadow-sm border border-sky-100' 
                                : 'text-slate-500 hover:text-slate-700 hover:bg-sky-100/50'}
                        `}
                    >
                        <Clock size={16} className={activeTab === 'pending' ? 'text-sky-500' : 'text-slate-400'} />
                        Pending
                        {pendingIndents.length > 0 && (
                            <span className={`
                                px-2 py-0.5 rounded-full text-xs ml-1
                                ${activeTab === 'pending' ? 'bg-rose-100 text-rose-600' : 'bg-slate-200 text-slate-500'}
                            `}>
                                {pendingIndents.length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`
                            flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all
                            ${activeTab === 'history' 
                                ? 'bg-white text-sky-700 shadow-sm border border-sky-100' 
                                : 'text-slate-500 hover:text-slate-700 hover:bg-sky-100/50'}
                        `}
                    >
                        <ClipboardList size={16} className={activeTab === 'history' ? 'text-sky-500' : 'text-slate-400'} />
                        History
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-h-0 animate-in fade-in duration-300">
                {activeTab === 'pending' ? (
                    <PendingDocumentReporting indents={pendingIndents} onProcess={processIndent} />
                ) : (
                    <HistoryDocumentReporting indents={historyIndents} />
                )}
            </div>
        </div>
    );
};

export default DocumentReporting;
