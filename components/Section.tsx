
import React from 'react';

interface SectionProps {
  title: string;
  id: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, id, children }) => {
  return (
    <section id={id} className="h-screen flex flex-col items-center justify-center p-8 snap-start">
      <div className="w-full max-w-4xl mx-auto bg-black/60 backdrop-blur-md p-8 rounded-xl border border-cyan-400/20 shadow-lg shadow-cyan-500/10">
        <h2 className="text-3xl font-bold mb-6 text-cyan-300 tracking-wider">{title}</h2>
        {children}
      </div>
    </section>
  );
};

export default Section;
