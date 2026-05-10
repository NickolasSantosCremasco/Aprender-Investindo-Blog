'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation'
import React from "react";
import { Mail, Lock, LogIn, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json()
            
            if (response.ok) {
                localStorage.setItem('authToken', data.token)
                setMessage(data.message);
                setError('');
                
                setTimeout(() => {
                    router.push('/');
                }, 2000);
                
            } else {
                setError(data.error);
                setMessage('');
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            setError('Erro ao conectar com o servidor.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#050505] relative overflow-hidden px-6">
            {/* Efeito de Aura Neon de Fundo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#22c55e]/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="bg-[#0a0b10] border border-gray-800 p-8 md:p-10 rounded-2xl w-full max-w-md shadow-2xl relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-[#22c55e]/10 rounded-full border border-[#22c55e]/30 mb-4">
                        <Lock className="text-[#22c55e] w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">Portal de Acesso</h2>
                    <p className="text-gray-500 mt-2 font-mono text-[10px] uppercase tracking-widest">Fincodes<span className="text-[#22c55e]">Tech</span> Secure Login</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campo Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-mono text-gray-500 uppercase tracking-wider pl-1">Identificação (Email)</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-[#22c55e] transition-colors" size={18} />
                            <input 
                                type="email" 
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="usuario@fincodes.tech"
                                required
                                className="w-full bg-white/5 border border-gray-800 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/50 transition-all text-white text-sm"
                            />
                        </div>
                    </div>

                    {/* Campo Senha */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label htmlFor="password" className="text-xs font-mono text-gray-500 uppercase tracking-wider">Senha</label>
                            <span className="text-[10px] text-gray-700 hover:text-[#22c55e] cursor-pointer transition-colors uppercase font-mono">Esqueceu?</span>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-[#22c55e] transition-colors" size={18} />
                            <input 
                                type="password" 
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="••••••••••••"
                                required
                                className="w-full bg-white/5 border border-gray-800 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/50 transition-all text-white text-sm"
                            />
                        </div>
                    </div>

                    {/* Botão de Envio Neon */}
                    <button 
                        type="submit" 
                        className="w-full bg-[#22c55e] hover:bg-[#1da851] text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group relative overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                    >
                        <span className="relative z-10 flex items-center gap-2 tracking-widest uppercase text-xs">
                            Entrar no Terminal
                            <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </form>
                
                {/* Alertas de Status */}
                {message && (
                    <div className="mt-6 flex items-center gap-3 p-4 border border-green-800/50 bg-green-950/20 text-green-400 rounded-xl font-mono text-[10px] uppercase tracking-wider">
                        <CheckCircle2 size={16} /> {message}
                    </div>
                )}
                {error && (
                    <div className="mt-6 flex items-center gap-3 p-4 border border-red-800/50 bg-red-950/20 text-red-400 rounded-xl font-mono text-[10px] uppercase tracking-wider">
                        <AlertCircle size={16} /> [ERRO]: {error}
                    </div>
                )}
                
                <p className="text-xs text-gray-600 mt-8 text-center font-mono">
                    Não possui credenciais? <span className="text-[#22c55e] hover:underline cursor-pointer uppercase font-bold" onClick={() => router.push('/pages/register')}>Cadastre-se</span>
                </p>
            </div>
        </div>
    )
}