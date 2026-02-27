import React from 'react'
import { AlertTriangle, X } from 'lucide-react'

function ConfirmDelete({ item, onClose, onSave }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">

            {/* Modal Card */}
            <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in duration-200">

                {/* Header/Icon Area */}
                <div className="p-6 pb-0 flex justify-between items-start">
                    <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                        <AlertTriangle size={24} />
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                        Are you sure?
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        This action cannot be undone. This will permanently delete this {item} from the database.
                    </p>
                </div>

                {/* Actions */}
                <div className="p-6 pt-0 flex flex-col-reverse sm:flex-row gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-[0.98]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="flex-1 px-4 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-100 rounded-xl transition-all active:scale-[0.98]"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete