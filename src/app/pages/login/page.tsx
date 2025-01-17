'use client'
import { useState } from "react";

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Email:', email);
        console.log('Senha:', password);
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
                    <button 
                        type="submit"
                        className="w-full bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-500 transition"
                    >
                        Entrar
                    </button>
                </form>
                <p className="text-sm text-gray-600 mt-4 text-center">
                    Não tem uma conta? <a href="" className="text-sky-500 hover:underline">Cadastre-se</a>
                </p>
            </div>
        </div>
    )
}