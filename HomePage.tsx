import React from 'react';
import Section from './components/Section';
import { GithubIcon, GlobeIcon, MailIcon, PhoneIcon, YoutubeIcon, UnrealIcon, HardwareIcon, SoftwareIcon, GameIcon, WebIcon } from './components/Icons';

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    tech: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, tech }) => (
    <div className="bg-gray-800/50 border border-cyan-400/20 p-6 rounded-lg h-full flex flex-col">
        <div className="text-cyan-400 mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-cyan-300 mb-3">{title}</h3>
        <p className="text-gray-300 mb-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2">
            {tech.map(t => (
                 <span key={t} className="bg-gray-700/50 text-cyan-200 text-xs font-medium px-2 py-1 rounded-full border border-gray-600">{t}</span>
            ))}
        </div>
    </div>
);


const HomePage: React.FC = () => {
    const skills = {
        "Languages": ["German", "English"],
        "Software": ["Office Packages", "OriginLab", "Matlab", "Scilab", "KiCad", "Unreal Editor"],
        "Coding": ["C/C++", "JavaScript", "TypeScript", "AVR Microcontroller", "STM Microcontroller", "Unreal Engine C++", "SQLite", "MySQL", "MongoDB", "LowDB"]
      };

    const services = [
        {
            icon: <HardwareIcon className="w-10 h-10" />,
            title: "Hardware Development",
            description: "From concept to reality. I design and develop custom hardware solutions, including PCB design with KiCad and firmware for AVR/STM microcontrollers.",
            tech: ["KiCad", "Embedded Systems", "C/C++", "AVR", "STM", "PCB Design"]
        },
        {
            icon: <SoftwareIcon className="w-10 h-10" />,
            title: "Software Engineering",
            description: "Building robust and high-performance applications. Specializing in C++ development for complex systems, backend services, and performance-critical software.",
            tech: ["C++", "REST APIs", "WebSockets", "MySQL", "MongoDB", "System Architecture"]
        },
        {
            icon: <GameIcon className="w-10 h-10" />,
            title: "Game Development",
            description: "Creating immersive games and simulations. I develop C++ plugins, gameplay mechanics, and complete templates for the Unreal Engine marketplace.",
            tech: ["Unreal Engine", "C++", "Blueprints", "Game Mechanics", "Simulations", "RTS"]
        },
        {
            icon: <WebIcon className="w-10 h-10" />,
            title: "Web & Frontend",
            description: "Crafting modern, responsive, and interactive web frontends. Proficient in developing dynamic user interfaces with React and TypeScript.",
            tech: ["React", "TypeScript", "JavaScript", "HTML5", "TailwindCSS", "AngularJS"]
        }
    ];

    return (
        <main className="relative z-10 overflow-y-auto h-screen snap-y snap-mandatory">
        
        {/* Hero Section */}
        <section id="home" className="h-screen flex flex-col items-center justify-center p-8 text-center snap-start relative">
          <div className="max-w-4xl mx-auto bg-black/50 backdrop-blur-md p-10 rounded-xl border border-cyan-400/20 shadow-xl shadow-cyan-500/10">
            <img src="https://i.ibb.co/7QrW6s7/profile-sketch.jpg" alt="A sketch of Silvan Teufel" className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-cyan-400/50 object-cover" />
            <h1 className="text-5xl md:text-7xl font-bold text-cyan-300 tracking-widest">SILVAN TEUFEL</h1>
            <p className="text-xl md:text-2xl mt-4 text-gray-300">Freelancer for Software, Hardware, Games & Simulations</p>
            <h2 className="text-2xl mt-4 text-cyan-400 font-semibold tracking-wider">Teufel-Engineering</h2>
            <div className="mt-8 text-sm text-cyan-200/50 animate-pulse">
                Use Arrow Keys & Space to play the game in the background.
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 animate-bounce">
                <span className="text-sm text-cyan-200/70">Scroll Down</span>
                <svg className="w-5 h-5 text-cyan-200/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </section>

        {/* About & Contact Section */}
        <Section title="About & Contact" id="about">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-2xl font-bold text-cyan-300 mb-4">Personal Data</h3>
                    <ul className="space-y-2 text-lg">
                        <li><strong>Date of Birth:</strong> 21.04.1988</li>
                        <li><strong>Nationality:</strong> German</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-cyan-300 mb-4">Contact Information</h3>
                    <ul className="space-y-3 text-lg">
                        <li className="flex items-center"><PhoneIcon className="w-5 h-5 mr-3 text-cyan-400" /> +49 160 51 70 640</li>
                        <li className="flex items-center"><MailIcon className="w-5 h-5 mr-3 text-cyan-400" /> <a href="mailto:info@teufel-engineering.com" className="hover:text-cyan-300 transition-colors">info@teufel-engineering.com</a></li>
                        <li className="flex items-center"><GlobeIcon className="w-5 h-5 mr-3 text-cyan-400" /> <a href="http://www.teufel-engineering.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">www.teufel-engineering.com</a></li>
                        <li className="flex items-center"><p className="w-5 h-5 mr-3 text-cyan-400 font-bold text-center">A</p> Zeller Straße 37a, 77833 Ottersweier, Germany</li>
                    </ul>
                </div>
            </div>
        </Section>
        
        {/* Skills Section */}
        <Section title="Skills" id="skills">
            {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="mb-6">
                    <h3 className="text-2xl font-bold text-cyan-300 mb-4">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                        {skillList.map(skill => (
                            <span key={skill} className="bg-gray-700/50 text-cyan-200 text-sm font-medium px-3 py-1 rounded-full border border-gray-600">{skill}</span>
                        ))}
                    </div>
                </div>
            ))}
        </Section>

        {/* Experience Section */}
        <Section title="Experience" id="experience">
            <div className="space-y-8 relative border-l-2 border-cyan-400/20 pl-8">
                <ExperienceItem
                    date="01/2020 - My own Products"
                    title="Plugin/Game C++ Development for the Unreal Marketplace"
                    details={[
                        "RTS Unit Template",
                        "RTS TopDownTemplate",
                        "RTS Camera",
                    ]}
                    links={[
                        { icon: <GithubIcon className="w-5 h-5"/>, url: "https://github.com/SilvanTeufel", text: "GitHub Profile" },
                        { icon: <UnrealIcon className="w-5 h-5"/>, url: "https://www.fab.com/sellers/Silvan%20Teufel", text: "Unreal Marketplace" },
                        { icon: <YoutubeIcon className="w-5 h-5"/>, url: "https://www.youtube.com/@WackyGameEngineer", text: "YouTube Channel" }
                    ]}
                />
                <ExperienceItem
                    date="01/2020 - 05/2025"
                    title="Embedded Linux with React Frontend"
                    company="Freelancing, RMA Rheinau GmbH & Co. KG, Rheinau"
                    details={[
                        "Developed for an embedded Linux device with a touchscreen.",
                        "Created C++ processes on Yocto Linux with WebSocket statemachine.",
                        "Built React frontend for live data measurement and visualization.",
                        "Implemented C++ drivers for USB, CAN, WebSockets, etc.",
                    ]}
                />
                <ExperienceItem
                    date="02/2019 - 04/2023"
                    title="Hardware and Software Development"
                    company="Freelancing, Gallenschtz GmbH, Bhl"
                    details={[
                        "Designed motor control PCBs with KiCad and developed C++ firmware.",
                        "Enabled Ethernet communication with a REST API & WebSocket backend.",
                        "Developed C++ drivers for various peripherals (I2C, SPI, CAN).",
                        "Created C++ Linux server backends (REST/WebSocket).",
                        "Developed React (TypeScript) frontends for web interfaces."
                    ]}
                />
                 <ExperienceItem
                    date="09/2018 - 03/2019"
                    title="React WebApp with PHP API and MySQL Database"
                    company="Freelancing, Freelance Junior, Remote"
                    details={[
                        "Frontend development with React (TypeScript).",
                        "API development with PHP using Contao (CMS) as an interface.",
                    ]}
                />
                <ExperienceItem
                    date="01/2018 - 09/2018"
                    title="Study to Compare Magnetic Sensors"
                    company="Jcon GmbH, Bühl"
                    details={[
                        "Created prototypes for position detection with Hall-Sensors.",
                        "Set up a reference measurement system.",
                        "Developed Microcontroller (C++) and Windows C++ console applications.",
                        "Visualized measurement data using Scilab/Matlab.",
                    ]}
                />
            </div>
        </Section>

        {/* Academics Section */}
        <Section title="Academics" id="academics">
            <div className="space-y-8 relative border-l-2 border-cyan-400/20 pl-8">
                 <ExperienceItem
                    date="05/2017 - 12/2017"
                    title="Master Thesis - Study of the Characteristics of Current Sensors"
                    company="Schaeffler-Gruppe, Bühl"
                    details={[
                        "Evaluated and selected various sensor technologies.",
                        "Studied and simulated magnetic circuits of Hall sensors.",
                        "Designed signal processing chains and filters in Matlab/Simulink.",
                    ]}
                />
                <ExperienceItem
                    date="09/2016 - 05/2017"
                    title="Project Master's Degree - Impedance Spectroscopy on Metal Oxide Gas Sensors"
                    company="University of Applied Sciences, Karlsruhe"
                    details={[
                        "Planned and implemented measurements for impedance spectroscopy.",
                        "Developed and simulated physically significant equivalent circuit diagrams.",
                        "Compared simulation results with measurement data.",
                    ]}
                />
            </div>
        </Section>
        
        {/* Services Section */}
        <Section title="Services" id="services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map(service => <ServiceCard key={service.title} {...service} />)}
            </div>
        </Section>

        {/* Philosophy Section */}
        <Section title="My Philosophy" id="philosophy">
            <div className="text-lg text-gray-300 space-y-4 leading-relaxed max-w-4xl mx-auto">
                <p>
                    As a freelance developer, I have never shied away from challenges. This has led me through a diverse range of experiences, from hardware design—crafting circuit boards, filters, and analyzing measurement data—to low-level software, programming microcontrollers. My journey continues up the stack to developing complex database systems with modern front-end technologies.
                </p>
                <p>
                    I've also channeled this passion into creating immersive worlds through game design and simulations, where I enjoy crafting intelligent AI that brings virtual environments to life. My core mission is to solve complex problems, and I've found my passion in doing so.
                </p>
                <p>
                    Curiosity, courage, and unconventional thinking are the tools I work with. If you also value these qualities, I would be delighted to collaborate with you.
                </p>
            </div>
        </Section>

      </main>
    );
};


interface ExperienceItemProps {
    date: string;
    title: string;
    company?: string;
    details: string[];
    links?: { icon: React.ReactNode; url: string; text: string }[];
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ date, title, company, details, links }) => (
    <div className="relative">
        <div className="absolute -left-[38px] top-1 w-4 h-4 bg-cyan-400 rounded-full border-4 border-gray-900"></div>
        <p className="text-sm text-cyan-400/80 mb-1">{date}</p>
        <h3 className="text-xl font-bold text-cyan-300">{title}</h3>
        {company && <p className="text-md text-gray-400 mb-2">{company}</p>}
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
            {details.map((detail, index) => <li key={index}>{detail}</li>)}
        </ul>
        {links && (
            <div className="flex flex-wrap gap-4 mt-4">
                {links.map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-cyan-300 transition-colors">
                        {link.icon}
                        <span>{link.text}</span>
                    </a>
                ))}
            </div>
        )}
    </div>
);


export default HomePage;