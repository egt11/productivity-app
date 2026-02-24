import React from 'react';
import { Plus } from 'lucide-react';

function PageTitleButton({ title, button, onClick }) {
    return (
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/60">
            <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {title}
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                    Manage and organize your {title.toLowerCase()} efficiently.
                </p>
            </div>

            <button
                type="button"
                onClick={onClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 active:scale-95 transition-all shrink-0"
            >
                <Plus size={20} strokeWidth={3} />
                {button}
            </button>
        </header>
    );
}

export default PageTitleButton;