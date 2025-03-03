'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"


export default function Contact() {
    
    const router = useRouter();
    const [Isloading, setIsLoading] = useState(false);

    const handlerSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data),
            });
            
            if (response.ok) {
                alert('Mensagem Enviada com Sucesso!');
                router.push('/')
            } else {
                alert('Ocorreu um erro. Tente novamente mais tarde.')
            }
        } catch(error) {
            console.error('Erro ao Enviar o formulário:', error);
            alert('Ocorreu um erro. Tente novamente mais tarde.')
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        document.body.style.backgroundImage = 'url(/uploads/fundoGradient.jpg)'
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';

        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundRepeat = '';
        };
    }, [])
    return (
        <section className="mx-auto max-w-screen-md mt-5 mb-5 rounded-xl overflow-hidden  " style={{boxShadow: '0 0px 10px 10px rgba(255, 255, 255, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.06)'}}>
            
            <div className="contact-header text-center border-b bg-cover py-16" style={{backgroundImage: 'url(/uploads/fundoAzulClaro.avif)'}}>
                <div>
                    <h1 className="float-left text-lg relative bottom-10 left-5 hover:text-white hover:cursor-pointer" onClick={() => router.push('/')}>Voltar</h1>
                </div>
                <div className="relative z-10">
                    <h3 className="text-sm pt-10 text-white  tracking-widest">Aprender Investindo | Contrate Nossos Serviços</h3>
                    <h1 className="text-5xl font-bold">Entre em Contato.</h1>
                    <h2 className="mt-2 p-2 pl-24 pr-24 pb-10 text-gray-700">Deixe seu feedback sobre o site, compartilhe seu depoimento ou nos informe qual serviço despertou seu interesse. Estamos aqui para ajudar e fornecer exatamente o que você precisa!</h2>
                </div>
               
            </div>
            <div className="contact-form bg-white p-8 rounded-b-lg shadow-md">
                <form onSubmit={handlerSubmit} className="space-y-8">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nome
                        </label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Digite seu Nome" 
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                   <div>
                    <label htmlFor="services" className="block text-sm font-medium text-gray-700">Serviços</label>
                        <select 
                            name="services" 
                            id="services"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            
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
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring:border-blue-500"
                            required
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        className="w-30 block mx-auto bg-black text-white py-2 px-4 rounded-full transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                            {Isloading? 'Enviando...': 'Enviar Mensagem'}
                    </button>
                </form>
            </div>
        </section>
        
    )
}