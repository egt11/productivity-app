import React from 'react';
import { X, Calendar, Notebook } from 'lucide-react';

function ViewNote({ note, onClose }) {
    if (!note) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-60 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">

                {/* Sticky Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                            <Notebook size={18} />
                        </div>
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Reading Mode</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Content Area */}
                <div className="p-8 overflow-y-auto custom-scrollbar">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                        {note.title}
                    </h2>

                    {/* Meta Tags */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-500 text-xs font-semibold">
                            <Calendar size={14} />
                            <span>Created: {note.date}</span>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-slate-700 whitespace-pre-wrap leading-relaxed">
                            {note.content}
                        </p>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 border-t border-slate-50 bg-slate-50/50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                    >
                        Close Note
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ViewNote;