// pages/404.tsx
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';

const NotFound = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-[--primary] mb-4">404</h1>
            <p className="text-xl text-gray-700 mb-8">Oops! The page you're looking for doesn't exist.</p>
            <div className="flex gap-4">

                <Link href="/" >
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Go Back
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
