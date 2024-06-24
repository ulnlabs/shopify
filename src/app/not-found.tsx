import React from 'react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-8">Page Not Found</p>
            <Link href="/">
                <button className="bg-green-400 text-white px-4 py-2 rounded-lg">
                    Go Home

                </button>
            </Link>
        </div>
    );
};

export default NotFound;
