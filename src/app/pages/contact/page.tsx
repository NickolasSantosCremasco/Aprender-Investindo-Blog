'use client'
import { useState, useEffect } from "react"
import Footer from "@/app/components/Footer"

export default function Contact() {
    return (
        <section className="mx-auto max-w-screen-md mt-5 mb-5 rounded-lg overflow-hidden shadow-sm border ">
            <div className="contact-header text-center border-b bg-blue-500">
                <h3 className="text-sm pt-6 text-yellow-400">Aprender Investindo</h3>
                <h1 className="text-4xl font-bold">Entrar em Contato</h1>
                <h2 className="mt-2 p-1 pl-16 pr-16 pb-10 text-white">Escreva seu Feedback sobre o site, seu depoimento ou especifique o serviço que você se interessou e podemos lhe fornecer!</h2>
            </div>
            <div className="contact-form bg-white p-8 rounded-lg shadow-md">
                <form action="" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nome
                        </label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Digite seu Nome" 
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block">
                            Email
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Digite seu Email" 
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>   
                        <label htmlFor="tel" className="block text-sm font-medium text-gray-700">Telefone</label>
                        <input 
                            type="tel" 
                            name="tel" 
                            id="tel" 
                            placeholder="Digite seu Número" 
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                   <div>
                    <label htmlFor="services" className="block text-sm font-medium text-gray-700">Serviços</label>
                        <select 
                            name="services" 
                            id="services"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Nenhum</option>
                            <option value="consultoria financeira">Consultoria Financeira</option>
                            <option value="Ferramentas de Gestão Financeira">Ferramentas de Gestão financeira</option>
                            <option value="Automação de Finanças Pessoais">Automação de Finanças Pessoais</option>
                            <option value="Desenvolvimento de Site ou App">Desenvolvimento de Site ou App</option>
                        </select>
                   </div>
                    <div>
                        <label htmlFor="msg" className="block">Digite Sua Mensagem</label>
                        <textarea 
                            name="msg" 
                            id="msg" 
                            placeholder="Digite sua Mensagem" 
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring:border-blue-500"
                            required
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                            Enviar
                    </button>
                </form>
            </div>
        </section>
        
    )
}