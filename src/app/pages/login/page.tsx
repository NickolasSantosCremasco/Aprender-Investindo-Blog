'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation'
import React from "react";

export default function Login () {

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
                body: JSON.stringify({email,password})
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
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required

                            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 text-black"
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
                            
                            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 text-black"
                         />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-500 transition"
                    >
                        Entrar
                    </button>
                </form>
                
               
                {message && <p className="mt-4 text-center text-green-600 font-medium">{message}</p>}
                {error && <p className="mt-4 text-center text-red-600 font-medium">{error}</p>}
                
                <p className="text-sm text-gray-600 mt-4 text-center">
                    Não tem uma conta? <span className="text-sky-500 hover:underline cursor-pointer" onClick={() => router.push('/pages/register')}>Cadastre-se</span>
                </p>
            </div>
        </div>
    )
}