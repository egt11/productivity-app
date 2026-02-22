import React from 'react';
import { CheckCircle2, Circle, Clock, MoreVertical, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';

function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
    const isCompleted = task.status === 'completed';
    const priorityColors = {
        High: 'bg-red-50 text-red-600',
        Medium: 'bg-blue-50 text-blue-600',
        Low: 'bg-slate-100 text-slate-500'
    };

    const date = task.date ? new Date(task.date).toLocaleDateString() : null;

    const [showOptions, setShowOptions] = useState(false);

    const showOptionsMenu = () => setShowOptions(!showOptions);

    const handleEdit = () => {
        setShowOptions(false);
        onEdit();
    }

    const handleDelete = () => {
        setShowOptions(false);
        onDelete();
    }

    return (
        <div className="group relative bg-white border border-slate-200 p-4 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex items-center gap-4 mb-4">
            {/* Status Toggle Button - shrink-0 prevents it from squishing */}
            <button
                className={`shrink-0 transition-colors ${isCompleted ? 'text-emerald-500' : 'text-slate-300 hover:text-indigo-500'}`}
                onClick={onToggleStatus}
            >
                {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
            </button>

            {/* Task Info - min-w-0 is the secret for flex child truncation */}
            <div className="flex-1 min-w-0">
                <h3 className={`font-bold truncate transition-all ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                    {task.title}
                </h3>

                <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[11px] font-bold uppercase text-slate-400 whitespace-nowrap">
                        <Clock size={12} />
                        {date || 'No Deadline'}
                    </span>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase whitespace-nowrap ${priorityColors[task.priority] || priorityColors.Low}`}>
                        {task.priority}
                    </span>
                </div>
            </div>

            {/* Hover Actions - shrink-0 ensures icons don't wrap */}
            <div className="hidden md:flex items-center gap-1 shrink-0">
                <button
                    onClick={onEdit}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Edit Task"
                >
                    <Edit2 size={18} />
                </button>
                <button
                    onClick={onDelete}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Task"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            {/* Mobile Options */}
            <div className='relative'>
                <button className="md:hidden p-2 text-slate-400 shrink-0 relative" onClick={showOptionsMenu}>
                    <MoreVertical size={18} />
                </button>
                {showOptions && (
                    <div className="absolute top-6 right-2 w-30 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-40 flex flex-col items-start">
                        <button onClick={handleEdit} className='block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50'>
                            Edit
                        </button>
                        <button onClick={handleDelete} className='block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50'>
                            Delete
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
}

export default TaskCard;