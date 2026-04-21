'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function DataSchema() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            // Anima as caixas do schema (stagger)
            tl.fromTo(".schema-box", 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, stagger: 0.3, duration: 0.5 }
            )
            // Anima as linhas de conexão
            .fromTo(".connection-line", 
                { opacity: 0, scaleX: 0 }, 
                { opacity: 1, scaleX: 1, duration: 0.5 }, "-=0.3"
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full max-w-lg p-6 bg-[#0d0f17] border border-gray-800 rounded-xl shadow-2xl flex flex-col gap-6">
            <h3 className="text-sm text-gray-500 uppercase tracking-widest font-mono">Architecture Schema</h3>

            {/* Schema Boxes */}
            <div className="flex gap-4">
                <div className="schema-box flex-1 bg-[#161726] p-4 rounded-lg border border-gray-700">
                    <p className="text-blue-400 font-bold text-xs mb-2">UserProfile</p>
                    <ul className="text-[10px] text-gray-400 font-mono space-y-1">
                        <li>id: string</li>
                        <li>email: string</li>
                        <li>activeSaas: boolean</li>
                    </ul>
                </div>
                
                <div className="schema-box flex-1 bg-[#161726] p-4 rounded-lg border border-gray-700">
                    <p className="text-amber-400 font-bold text-xs mb-2">Automation</p>
                    <ul className="text-[10px] text-gray-400 font-mono space-y-1">
                        <li>trigger: string</li>
                        <li>webhook: url</li>
                        <li>status: active</li>
                    </ul>
                </div>
            </div>

            {/* Linha de Conexão (Visual) */}
            <div className="connection-line w-full h-px bg-gradient-to-r from-blue-500 to-amber-500"></div>

            {/* Card de Resumo */}
            <div className="schema-box bg-[#0a0b10] p-4 rounded-lg border border-gray-800 flex items-center justify-between">
                <span className="text-[11px] text-gray-300 font-mono">Total Entities: 3</span>
                <span className="text-[10px] text-green-500 bg-green-500/10 px-2 py-1 rounded">Sync: Online</span>
            </div>
        </div>
    );
}