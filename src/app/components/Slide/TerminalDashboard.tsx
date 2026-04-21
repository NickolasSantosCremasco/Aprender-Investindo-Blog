'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function TerminalDashboard() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 });

            // Animação sequencial das linhas de log
            tl.fromTo(".log-line", 
                { opacity: 0, x: -10 }, 
                { opacity: 1, x: 0, stagger: 0.2, duration: 0.5 }
            )
            // Animação do bloco de código
            .fromTo(".code-block", 
                { opacity: 0, scale: 0.95 }, 
                { opacity: 1, scale: 1, duration: 0.6 }
            )
            // Animação do status final
            .fromTo(".status-live", 
                { opacity: 0, scale: 0 }, 
                { opacity: 1, scale: 1, ease: "back.out(1.7)" }
            );
        }, containerRef);

        return () => ctx.revert(); // Limpeza para evitar bugs no React
    }, []);

    return (
        <div ref={containerRef} className="w-full max-w-lg bg-[#0d0f17] rounded-xl border border-gray-700/50 p-5 shadow-2xl flex flex-col gap-3 font-mono">
            {/* Header ... (mantém o mesmo código de antes) */}
            
            <div className="flex-1 space-y-2 text-[13px] text-gray-300">
                <p className="log-line text-gray-500">$ npm run prospectLeads</p>
                <p className="log-line text-green-500">✔ Connection established: PostgreSQL</p>
                <p className="log-line text-green-500">✔ API key verified</p>
                
                <div className="code-block bg-[#161726] p-3 rounded-lg border border-gray-800 my-2">
                    <p className="text-purple-400">async function <span className="text-blue-400">fetchLeads</span>() {'{'}</p>
                    <p className="pl-4 text-gray-300">const data = await scrape(<span className="text-green-400">"tech"</span>);</p>
                    <p className="pl-4 text-yellow-400">return data;</p>
                    <p>{'}'}</p>
                </div>

                <div className="flex justify-between items-center mt-2 status-live">
                    <span className="text-gray-500 italic"># Running lead generation...</span>
                    <div className="flex items-center gap-2 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] text-green-500 font-bold uppercase">Status: Live</span>
                    </div>
                </div>
            </div>
        </div>
    );
}