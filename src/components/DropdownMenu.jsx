import React from 'react'

function DropdownMenu({ onEdit, onDelete }) {
    return (
        <div className="absolute top-6 right-2 w-30 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-40">
            <button type="button" className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50" onClick={onEdit}>Edit</button>
            <button type="button" className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50" onClick={onDelete}>Delete</button>
        </div>
    )
}

export default DropdownMenu