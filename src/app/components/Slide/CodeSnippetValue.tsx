'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CodeSnippetValue() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.4 });

            // Animação de escrita (simulada)
            tl.fromTo(".snippet-text", 
                { opacity: 0, y: 10 }, 
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            )
            // Destaque na lógica principal
            .fromTo(".highlight-logic", 
                { backgroundColor: "transparent" }, 
                { backgroundColor: "rgba(34, 197, 94, 0.2)", duration: 1 }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full max-w-lg p-6 bg-[#0d0f17] border border-green-500/20 rounded-xl shadow-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h3 className="text-sm text-green-500 font-bold uppercase tracking-widest font-mono">Business Logic</h3>
                <span className="text-[10px] text-gray-500 font-mono italic">// ROI-Driven Code</span>
            </div>

            {/* Snippet de Código com Destaque */}
            <div className="snippet-text bg-[#0a0b10] p-4 rounded-lg border border-gray-800 font-mono text-[13px] text-gray-300">
                <p><span className="text-purple-400">async function</span> <span className="text-blue-400">prioritizeLeads</span>(leads) {'{'}</p>
                <div className="highlight-logic pl-4 py-1 rounded">
                    <p className="text-yellow-400">const</p> score = leads.calculateValueScore();
                    <p className="text-purple-400">if</p> (score &gt; <span className="text-green-500">80</span>) {'{'}
                </div>
                <p className="pl-8 text-yellow-400">return</p> prioritize(leads);
                <p className="pl-4">{'}'} <span className="text-purple-400">else</span> {'{'}</p>
                <p className="pl-8 text-yellow-400">return</p> archive(leads);
                <p className="pl-4">{'}'}</p>
                <p>{'}'}</p>
            </div>

            <p className="text-[11px] text-gray-500 text-center font-mono">
                Tecnologia proprietária desenvolvida para automação de alta performance.
            </p>
        </div>
    );
}