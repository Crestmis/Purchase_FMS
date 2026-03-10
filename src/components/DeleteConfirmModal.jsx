import { AlertTriangle } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 animate-fade-in">
        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-red-50">
          <AlertTriangle size={28} className="text-red-500" />
        </div>

        {/* Title */}
        <h3 className="text-center text-base font-bold text-slate-800 mb-2">
          Delete Confirmation
        </h3>

        {/* Message */}
        <p className="text-center text-sm text-slate-500 mb-6">
          {message || 'Are you sure you want to delete this record? This action cannot be undone.'}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-sky-200 text-sky-600 font-medium text-sm hover:bg-sky-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition-colors shadow-md shadow-red-500/25"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
