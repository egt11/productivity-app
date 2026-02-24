import React from 'react'

function Error({message}) {
    return (
        <div className="bg-red-50 border border-red-200 text-red-700 text-center px-4 py-3 rounded mb-4">
            {message}
        </div>
    )
}

export default Error