import React from 'react';
import { X, Calendar, Flag, AlignLeft } from 'lucide-react';
import { useState } from 'react';

function TaskModal({ onClose, priority, onSave, selectedTask }) {
    const [title, setTitle] = useState(selectedTask?.title || '');
    const [priorityLevel, setPriorityLevel] = useState(selectedTask?.priorityLevel || priority[0]);
    const [date, setDate] = useState(selectedTask?.date || '');

    const handleSubmit = e => {
        e.preventDefault();
        if (!title.trim()) return
        onSave({ title, priorityLevel, date });
    }


    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-60 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
                    <h2 className="text-xl font-extrabold text-slate-900">{selectedTask ? 'Edit Task' : 'Add New Task'}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form Body */}
                <form className="p-6 space-y-5" onSubmit={handleSubmit}>
                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Task Title</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Add task to do"
                                className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Priority & Date Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Priority</label>
                            <div className="relative">
                                <Flag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none text-slate-600 font-medium cursor-pointer"
                                    value={priorityLevel}
                                    onChange={(e) => setPriorityLevel(e.target.value)}
                                >
                                    {priority.map((level) => (
                                        <option key={level} value={level}>
                                            {level}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Deadline</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="date"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-600 font-medium"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3.5 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                        >
                            {selectedTask ? "Save Changes" : "Add Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskModal;