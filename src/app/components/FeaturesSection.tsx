
export default function Features() {
    const features = [
        {
            id:1,
            title: 'Consultoria Financeira',
            description: 'Obtenha orientações personalizadas para alcançar seus objetivos financeiros',
            image:'https://img.freepik.com/fotos-gratis/boneca-com-dinheiro_1160-17.jpg?ga=GA1.1.23163951.1734569073&semt=ais_hybrid'
        
        },
        {
            id:2,
            title: 'Consultoria Financeira',
            description: 'Obtenha orientações personalizadas para alcançar seus objetivos financeiros',
            image:'https://img.freepik.com/fotos-gratis/boneca-com-dinheiro_1160-17.jpg?ga=GA1.1.23163951.1734569073&semt=ais_hybrid'
        
        },
        {
            id:3,
            title: 'Consultoria Financeira',
            description: 'Obtenha orientações personalizadas para alcançar seus objetivos financeiros',
            image:'https://img.freepik.com/fotos-gratis/boneca-com-dinheiro_1160-17.jpg?ga=GA1.1.23163951.1734569073&semt=ais_hybrid'
        
        },
        {
            id:4,
            title: 'Consultoria Financeira',
            description: 'Obtenha orientações personalizadas para alcançar seus objetivos financeiros',
            image:'https://img.freepik.com/fotos-gratis/boneca-com-dinheiro_1160-17.jpg?ga=GA1.1.23163951.1734569073&semt=ais_hybrid'
        
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
                                className="w-full h-full object-contain border-2 border-gray-300 rounded-lg"
                             />
                        </div>

                        {/* Títle */}
                        <h2 className="text-xl font-bold text-black">{feature.title}</h2>

                        {/* Description */}
                        <p className="text-gray-600 mt-2">{feature.description}</p>

                    </div>
                ))}
            </div>
        </section>
    );
}