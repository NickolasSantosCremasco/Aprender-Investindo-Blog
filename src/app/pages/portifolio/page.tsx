'use client'
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import {
    ExternalLink, Github, ArrowLeft, Zap, Layers,
    GitBranch, ShieldCheck, Users, TrendingUp,
    Terminal, Activity
} from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description: string;
    stack: string[];
    successMetric: string;
    successDetail: string;
    status: 'PRODUCTION' | 'BETA' | 'MVP';
    validationNote: string;
    complexity: number;
    phase: string;
    link: string;
    githubLink?: string;
    accentColor: string;
    category: string;
}

const StatusConfig = {
    PRODUCTION: { dot: 'bg-[#22c55e]', label: 'text-[#22c55e]', border: 'border-[#22c55e]/30', pulse: true },
    BETA: { dot: 'bg-amber-400', label: 'text-amber-400', border: 'border-amber-400/30', pulse: true },
    MVP: { dot: 'bg-blue-400', label: 'text-blue-400', border: 'border-blue-400/30', pulse: false },
};

function ComplexityBar({ level, max = 5, color }: { level: number; max?: number; color: string }) {
    return (
        <div className="flex items-center gap-1.5">
            {Array.from({ length: max }).map((_, i) => (
                <div
                    key={i}
                    className={`h-1.5 w-5 rounded-full transition-all duration-300 ${i < level ? color : 'bg-gray-800'}`}
                />
            ))}
        </div>
    );
}

export default function Projects() {
    const router = useRouter();

    const projectList: Project[] = [
        {
            id: 1,
            title: 'Beegis SaaS',
            description: 'Plataforma de coleta e qualificação de leads B2B com filtros avançados, pipeline de enriquecimento de dados e dashboard analítico em tempo real.',
            stack: ['Django', 'Python', 'React', 'PostgreSQL', 'Celery', 'Redis'],
            successMetric: '30+ CFOs Validados',
            successDetail: 'Traction comprovada com decisores C-level em ciclo de discovery de 3 semanas.',
            status: 'PRODUCTION',
            validationNote: 'Testado por 30+ fundadores e CFOs',
            complexity: 4,
            phase: 'Go-to-Market',
            link: '#',
            accentColor: 'group-hover:border-[#22c55e]/60',
            category: 'SaaS / B2B',
        },
        {
            id: 2,
            title: 'Fin-Automation',
            description: 'Sistema de automação bancária com orquestração via n8n, captura de eventos por MacroDroid e webhooks para tracking granular de despesas e receitas.',
            stack: ['n8n', 'MacroDroid', 'Webhooks', 'Notion API', 'Make'],
            successMetric: '100% Tracking Ativo',
            successDetail: 'Zero intervenção manual. Dados financeiros processados e categorizados automaticamente.',
            status: 'BETA',
            validationNote: 'Operacional há 60+ dias sem falhas',
            complexity: 3,
            phase: 'Scaling',
            link: '#',
            accentColor: 'group-hover:border-amber-400/60',
            category: 'FinTech / Automation',
        },
        {
            id: 3,
            title: 'ADS Lead Engine',
            description: 'Motor de geração de leads para anúncios pagos com segmentação automática, testes A/B paralelos e scoring de qualificação por LTV estimado.',
            stack: ['Meta Ads API', 'Google Ads', 'Python', 'Supabase'],
            successMetric: 'CAC -40% em 30 dias',
            successDetail: 'Redução de custo de aquisição com otimização algorítmica de criativos e audiências.',
            status: 'MVP',
            validationNote: 'Validado em 2 campanhas reais',
            complexity: 5,
            phase: 'Validation',
            link: '#',
            accentColor: 'group-hover:border-blue-400/60',
            category: 'Paid Media / Data',
        },
    ];

    return (
        <>
            <Navbar />

            {/* Background noise texture via SVG filter */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px' }} />

            <section className="relative w-full bg-[#050505] min-h-screen py-24 px-6 md:px-12 text-white font-sans z-10">
                <div className="max-w-screen-xl mx-auto">

                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-500 hover:text-white text-sm font-mono mb-16 transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                      
                    </button>

                    {/* Header */}
                    <div className="mb-20 relative">
                        {/* Ambient glow */}
                        <div className="absolute -left-10 -top-10 w-64 h-64 bg-[#22c55e]/5 blur-[120px] rounded-full pointer-events-none" />

                        <div className="border-l-2 border-[#22c55e] pl-8 relative">
                            
                            <h1 className="text-5xl md:text-7xl font-black tracking-[-0.04em] leading-none mb-5">
                                Arquitetura &<br />
                                <span className="text-gray-600">Projetos</span>
                            </h1>
                            <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
                                Soluções de engenharia construídas para automatizar processos críticos e escalar resultados com precisão técnica.
                            </p>

                            {/* System stats bar */}
                            <div className="flex items-center gap-6 mt-8 font-mono text-[10px] text-gray-600">
                                <span className="flex items-center gap-1.5"><Activity size={10} className="text-[#22c55e]" /> {projectList.length} projetos ativos</span>
                                <span className="flex items-center gap-1.5"><ShieldCheck size={10} className="text-[#22c55e]" /> 2 em production</span>
                                <span className="flex items-center gap-1.5"><GitBranch size={10} className="text-[#22c55e]" /> deploy contínuo</span>
                            </div>
                        </div>
                    </div>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {projectList.map((project) => {
                            const statusCfg = StatusConfig[project.status];
                            return (
                                <div
                                    key={project.id}
                                    className={`group relative bg-[#08090f] border border-gray-800/80 rounded-2xl overflow-hidden transition-all duration-300 ${project.accentColor} hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.8)] flex flex-col`}
                                >
                                    {/* Top glow on hover */}
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22c55e]/0 group-hover:via-[#22c55e]/40 to-transparent transition-all duration-500" />

                                    {/* Glassmorphism inner glow */}
                                    <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#22c55e]/0 group-hover:bg-[#22c55e]/5 blur-[60px] rounded-full transition-all duration-500 pointer-events-none" />

                                    <div className="p-7 flex flex-col flex-1">

                                        {/* Top row: Category + Links */}
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest border border-gray-800 px-2 py-1 rounded">
                                                {project.category}
                                            </span>
                                            <div className="flex gap-3 text-gray-600">
                                                {project.githubLink && (
                                                    <a href={project.githubLink} className="hover:text-white transition-colors">
                                                        <Github size={16} />
                                                    </a>
                                                )}
                                                <a href={project.link} className="hover:text-[#22c55e] transition-colors">
                                                    <ExternalLink size={16} />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Icon + Title + Status */}
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="p-2.5 bg-gray-900/80 rounded-xl border border-gray-800 shrink-0 mt-0.5">
                                                <Layers className="text-[#22c55e]" size={20} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h2 className="text-xl font-bold tracking-tight leading-tight">{project.title}</h2>
                                                    <span className={`flex items-center gap-1.5 text-[9px] font-mono border px-2 py-0.5 rounded ${statusCfg.label} ${statusCfg.border}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot} ${statusCfg.pulse ? 'animate-pulse' : ''}`} />
                                                        {project.status}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] font-mono text-gray-600 mt-0.5">{project.phase}</p>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-400 text-sm leading-relaxed mb-5">
                                            {project.description}
                                        </p>

                                        {/* Complexity */}
                                        <div className="mb-5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Complexidade</span>
                                                <span className="text-[10px] font-mono text-gray-500">{project.complexity}/5</span>
                                            </div>
                                            <ComplexityBar level={project.complexity} color="bg-[#22c55e]" />
                                        </div>

                                        {/* Validation */}
                                        <div className="flex items-center gap-2 mb-5 text-[11px] font-mono">
                                            <Users size={11} className="text-gray-600 shrink-0" />
                                            <span className="text-gray-500">{project.validationNote}</span>
                                        </div>

                                        {/* Stack pills */}
                                        <div className="flex flex-wrap gap-1.5 mb-auto">
                                            {project.stack.map((s) => (
                                                <span
                                                    key={s}
                                                    className="text-[9px] font-mono bg-gray-900 text-gray-500 px-2 py-1 rounded border border-gray-800/60"
                                                >
                                                    {s}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Success Log */}
                                        <div className="mt-6 pt-5 border-t border-gray-800/50">
                                            <div className="bg-[#0d1a0f] border border-[#22c55e]/15 rounded-xl p-4 relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#22c55e]/30 via-[#22c55e]/10 to-transparent" />

                                                <div className="flex items-center gap-2 mb-2">
                                                    <Zap size={11} className="text-[#22c55e] fill-[#22c55e] shrink-0" />
                                                    <span className="text-[9px] font-mono text-[#22c55e] uppercase tracking-widest">Success Log</span>
                                                </div>

                                                <p className="text-[#22c55e] font-mono text-sm font-bold tracking-tight mb-1">
                                                    {project.successMetric}
                                                </p>
                                                <p className="text-gray-600 text-[11px] leading-relaxed">
                                                    {project.successDetail}
                                                </p>

                                                <div className="flex items-center gap-1.5 mt-3">
                                                    <TrendingUp size={10} className="text-[#22c55e]" />
                                                    <span className="text-[9px] font-mono text-gray-700">resultado validado</span>
                                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-20 pt-12 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <p className="text-gray-600 font-mono text-xs uppercase tracking-widest mb-1">Próximo projeto</p>
                            <p className="text-white text-lg font-bold tracking-tight">Tem um problema para resolver?</p>
                        </div>
                        <a
                            href="/contact"
                            className="flex items-center gap-3 bg-[#22c55e]/10 hover:bg-[#22c55e]/20 border border-[#22c55e]/30 hover:border-[#22c55e]/60 text-[#22c55e] font-mono text-sm px-6 py-3 rounded-xl transition-all"
                        >
                            <Terminal size={14} />
                            <span>./iniciar_projeto.sh</span>
                            <ExternalLink size={12} />
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}