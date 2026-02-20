import React from 'react';
import { Calendar, MoreVertical, Notebook } from 'lucide-react';

function NoteCard({ title, content, date}) {
    return (
        <div className="group relative bg-white border border-slate-200 p-5 rounded-2xl hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 flex flex-col h-full">
            {/* Header: Icon & Options */}
            <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <Notebook size={20} />
                </div>
                <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors">
                    <MoreVertical size={18} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {title || "Untitled Note"}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                    {content || "No content provided yet..."}
                </p>
            </div>

            {/* Footer: Metadata */}
            <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <div className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    <span>{date}</span>
                </div>
            </div>
        </div>
    );
}

export default NoteCard;