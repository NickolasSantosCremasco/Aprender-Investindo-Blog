'use client'
import { Rocket, BarChart3, Bot, CodeXml } from 'lucide-react';

export default function Features() {
    const features = [
        {
            id: 1,
            title: 'Parcerias Tech',
            description: 'Desenvolvimento colaborativo e consultoria para startups em estágio inicial.',
            icon: <Rocket className="text-[#22c55e] w-8 h-8" />
        },
        {
            id: 2,
            title: 'Gestão de Dados',
            description: 'Arquitetura de sistemas financeiros com foco em performance e segurança.',
            icon: <BarChart3 className="text-[#22c55e] w-8 h-8" />
        },
        {
            id: 3,
            title: 'Automação (B2B)',
            description: 'Scripts de prospecção e automação de fluxos de trabalho (n8n/Python).',
            icon: <Bot className="text-[#22c55e] w-8 h-8" />
        },
        {
            id: 4,
            title: 'Fullstack Dev',
            description: 'Soluções sob medida: React, Next.js e integrações complexas de API.',
            icon: <CodeXml className="text-[#22c55e] w-8 h-8" />
        },
    ];

    return (
        <section className="w-full bg-[#0a0b10] py-24 px-6 md:px-12 border-t border-gray-900">
            <div className="max-w-screen-xl mx-auto">
                <div className="text-center mb-16">
                    <h3 className="text-[#22c55e] font-mono uppercase tracking-widest text-sm mb-2">Expertise</h3>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">Soluções de Engenharia</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="group flex flex-col items-center text-center bg-[#050505] p-8 rounded-xl border border-gray-800 hover:border-[#22c55e]/50 transition-all cursor-default"
                        >
                            <div className="mb-6 p-4 rounded-full bg-[#0a0b10] border border-gray-800 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h2 className="text-lg font-bold text-white mb-3">{feature.title}</h2>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}