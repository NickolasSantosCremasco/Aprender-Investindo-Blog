
export default function NewsSection () {
    const news = [
        {
            id:1,
            image: 'https://img.freepik.com/fotos-gratis/boneca-com-dinheiro_1160-17.jpg?ga=GA1.1.23163951.1734569073&semt=ais_hybrid',
            title: 'Mercado de Ações em Alta',
            description: 'O índice da bolsa fechou em alta',
            time: '2 horas atrás'
        },
        {
            id:2,
            image: 'https://img.freepik.com/fotos-gratis/boneca-com-dinheiro_1160-17.jpg?ga=GA1.1.23163951.1734569073&semt=ais_hybrid',
            title: 'Mercado de Ações em Alta',
            description: 'O índice da bolsa fechou em alta',
            time: '2 horas atrás'
        },
        {
            id:3,
            image: 'https://img.freepik.com/fotos-gratis/boneca-com-dinheiro_1160-17.jpg?ga=GA1.1.23163951.1734569073&semt=ais_hybrid',
            title: 'Mercado de Ações em Alta',
            description: 'O índice da bolsa fechou em alta',
            time: '2 horas atrás'
        }
    ]
    return (
        <section className="max-w-screen-xl mx-auto text-sky-900 shadow-2xl py-16 px-8">
            <div>
                {/* Titles */}
                <h3 className='text-xl fnt-smibold pl-4 md:pl-0'>Finanças</h3>
                <h1 className='text-4xl font-bold pl-4 md:pl-0'>Notícias em Tempo Real</h1>

                {/* News Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                        {news.map((item) => (
                            <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transtion-shadow">
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-800">{item.title}</h2>
                                    <p className="text-gray-600 mt-2">{item.description}</p>
                                    <p className="text-sm text-gray-400 mt-4">{item.time}</p>
                                </div>
                            </div>
                        ))}
                </div>


            </div>
        </section>
    )
}