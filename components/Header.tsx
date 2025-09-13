import React, { useState, useEffect } from 'react';

const navItems = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'skills', title: 'Skills' },
    { id: 'experience', title: 'Experience' },
    { id: 'academics', title: 'Academics' },
    { id: 'services', title: 'Services' },
    { id: 'philosophy', title: 'Philosophy' },
];

const Header: React.FC = () => {
    const [activeSection, setActiveSection] = useState('home');
    const linkClasses = "px-3 py-2 rounded-md text-sm md:text-base transition-all duration-300 whitespace-nowrap";
    const activeLinkClasses = "bg-cyan-400/20 text-cyan-300 shadow-md shadow-cyan-500/10";
    const inactiveLinkClasses = "text-gray-300 hover:bg-gray-700/50 hover:text-cyan-300";

    useEffect(() => {
        const scrollContainer = document.querySelector('main');
        if (!scrollContainer) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { root: scrollContainer, rootMargin: '-50% 0px -50% 0px' } 
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => observer.observe(section));

        return () => sections.forEach(section => observer.unobserve(section));
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-20 flex justify-center p-4">
            <nav className="bg-black/50 backdrop-blur-md p-2 rounded-xl border border-cyan-400/20 shadow-lg shadow-cyan-500/10 w-full max-w-max">
                <div className="overflow-x-auto">
                    <ul className="flex items-center gap-2 md:gap-4">
                        {navItems.map(item => (
                             <li key={item.id}>
                                <a 
                                    href={`#${item.id}`}
                                    className={`${linkClasses} ${activeSection === item.id ? activeLinkClasses : inactiveLinkClasses} pointer-events-none`}
                                >
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;