'use client'

import { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when the user scrolls down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="fixed bottom-4 right-5 z-10">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="bg-blue-300 text-black p-4 rounded-full shadow-xl hover:bg-blue-400 transition duration-300 ease-in-out"
                >
                    <FaChevronUp size={16} />
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;
