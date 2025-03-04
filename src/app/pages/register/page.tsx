'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register () {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('')
    const [error, setError] = useState<string>('')

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setEmail('');
                setPassword('');
                setName('');
                setError('');
                hideMessageAfterDelay()
               
                setTimeout(() => {
                    router.push('/pages/login');
                },2000);
               
            } else {
                setError(data.error)
                setMessage('')
                hideMessageAfterDelay()
            }
        } catch( error ) {
            console.error(error);
            setMessage('Erro ao processar o cadastro. Tente novamente!');
        }
    };

    const hideMessageAfterDelay = () => {
        setTimeout(() => {
            setMessage('')
            setError('')
        },3000);
    }
    
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Cadastre-se</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                        <input 
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            
                            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500"
                         />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Seu Nome <span className="text-blue-500">(Aparecerá ao postar um artigo!)</span></label>
                        <input 
                            type="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            
                            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500"
                         />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-500 transition"
                    >
                        Cadastre-se
                    </button>
                </form>
                {/* Feedback Messages */}
                
                {message && <p style={{color: 'green'}}> {message}</p>}
                {error && <p style={{color: 'red'}}> {error}</p>}
                <p className="text-sm text-gray-600 mt-4 text-center">
                    Já possui uma conta? <span className="text-sky-500 hover:underline cursor-pointer" onClick={() => router.push('/pages/login')}>Entrar</span>
                </p>
            </div>
        </div>
    )
}