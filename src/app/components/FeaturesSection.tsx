
export default function Features() {
    const features = [
        {
            id:1,
            title: 'Parceria na Criação de Conteúdo',
            description: 'Gostou do site e quer fazer uma parceria? Somos todo ouvidos, entre em contato conosco!',
            image:'/uploads/consultoria.jpg'
        
        },
        {
            id:2,
            title: 'Ferramentas de Gestão Financeira',
            description: 'Simplifique sua vida financeira com nossas ferramentas intuitivas e poderosas.',
            image:'/uploads/ferramentas.jpg'
        
        },
        {
            id:3,
            title: 'Automação de Finanças Pessoais',
            description: 'Deixe a tecnologia trabalhar por você! Com nossos scripts e aplicativos, automatizamos tarefas financeiras.',
            image:'/uploads/automacao.jpg'
        
        },
        {
            id:4,
            title: 'Desenvolvimento de Sites ou Apps',
            description: 'Transforme suas ideias em realidade com soluções digitais sob medida. Desenvolvemos sites e aplicativos voltados para o setor financeiro.',
            image:'/uploads/desenvolvimentoDeSites.jpg'
        
        },
    ]
    return (
        <section className="max-w-screen-xl mx-auto shadow-2xl py-16 px-8 bg-slate-200">
            {/* Header */}
            <div className=" text-black text-center mb-12">
                <p className="text-yellow-500">Aprender a Investir</p>
                <h1 className="text-4xl font-bold text-black">Serviços</h1>
                <p className="text-gray-700 mt-4 ">
                    Explore nossos serviços para ajudar você a dominar o mercado financeiro e investir com confiança.
                </p>
            </div>

            {/* Features Grid */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 place-items-center">
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 cursor-pointer transition-all"
                    >
                        {/* Image */}
                        <div className=" h-full w-full mb-4">
                            <img 
                                src={feature.image} 
                                alt={feature.title}
                                className="w-full h-full object-contain rounded-lg"
                             />
                        </div>

                        {/* Títle */}
                        <h2 className="text-xl font-bold text-black">{feature.title}</h2>

                        {/* Description */}
                        <p className="text-gray-600 mt-2 text-justify">{feature.description}</p>

                    </div>
                ))}
            </div>
        </section>
    );
}