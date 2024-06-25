import React from 'react'

const loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex space-x-2 animate-pulse">
                <div className="w-8 h-8 bg-[--primary] rounded-full"></div>
                <div className="w-8 h-8 bg-[--primary] rounded-full"></div>
                <div className="w-8 h-8 bg-[--primary] rounded-full"></div>
            </div>
        </div>
    )
}

export default loading
