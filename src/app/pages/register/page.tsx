'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Register() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('')
    const [error, setError] = useState<string>('')

    const router = useRouter()

    const hideMessageAfterDelay = () => {
        setTimeout(() => {
            setMessage('')
            setError('')
        }, 3000);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                if (data.token) localStorage.setItem('authToken', data.token);

                setEmail('');
                setPassword('');
                setName('');
                setError('');
                hideMessageAfterDelay();
              
                setTimeout(() => {
                    router.push('/'); 
                }, 2000);
                
            } else {
                setError(data.error);
                setMessage('');
                hideMessageAfterDelay();
            }
        } catch(error) {
            console.error(error);
            setError('Erro ao processar o cadastro. Tente novamente!');
            hideMessageAfterDelay();
        }
    };
    
    return (
        <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Efeito Glow de Fundo */}
            <div className="absolute inset-0 bg-[#22c55e]/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 bg-[#0a0b10] border border-gray-800 p-8 md:p-10 rounded-2xl w-full max-w-md shadow-2xl backdrop-blur-sm">
                
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-[#22c55e]/10 rounded-full border border-[#22c55e]/30 mb-4">
                        <UserPlus className="text-[#22c55e] w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tighter">Criar Conta</h2>
                    <p className="text-gray-500 mt-2 font-mono text-[10px] uppercase tracking-widest italic">
                        Initialize New User Profile
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Campo Nome */}
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-500 uppercase tracking-wider pl-1">Nome Completo</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-[#22c55e] transition-colors" size={18} />
                            <input 
                                type="text" value={name} onChange={(e) => setName(e.target.value)} required
                                placeholder="Como quer ser chamado?"
                                className="w-full bg-white/5 border border-gray-800 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/50 transition-all text-white text-sm"
                            />
                        </div>
                        <p className="text-[9px] text-[#22c55e]/60 font-mono italic pl-1 uppercase tracking-tighter">Aparecerá ao postar artigos</p>
                    </div>

                    {/* Campo Email */}
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-500 uppercase tracking-wider pl-1">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-[#22c55e] transition-colors" size={18} />
                            <input 
                                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                placeholder="exemplo@fincodes.tech"
                                className="w-full bg-white/5 border border-gray-800 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/50 transition-all text-white text-sm"
                            />
                        </div>
                    </div>

                    {/* Campo Senha */}
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-500 uppercase tracking-wider pl-1">Senha</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-[#22c55e] transition-colors" size={18} />
                            <input 
                                type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                                placeholder="Mínimo 6 caracteres"
                                className="w-full bg-white/5 border border-gray-800 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/50 transition-all text-white text-sm"
                            />
                        </div>
                    </div>

                    {/* Alertas de Status */}
                    {message && (
                        <div className="flex items-center gap-3 p-4 border border-green-800/50 bg-green-950/20 text-green-400 rounded-xl font-mono text-[10px] uppercase">
                            <CheckCircle2 size={16} /> {message}
                        </div>
                    )}
                    {error && (
                        <div className="flex items-center gap-3 p-4 border border-red-800/50 bg-red-950/20 text-red-400 rounded-xl font-mono text-[10px] uppercase">
                            <AlertCircle size={16} /> [ERRO]: {error}
                        </div>
                    )}

                    <button 
                        type="submit"
                        className="w-full bg-[#22c55e] hover:bg-[#1da851] text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group relative overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                    >
                        <span className="relative z-10 uppercase tracking-widest text-xs">Finalizar Cadastro</span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </form>
                
                <p className="text-xs text-gray-600 mt-8 text-center font-mono uppercase tracking-tighter">
                    Já possui credenciais? <span className="text-[#22c55e] hover:underline cursor-pointer font-bold" onClick={() => router.push('/pages/login')}>Entrar</span>
                </p>
            </div>
        </main>
    );
}