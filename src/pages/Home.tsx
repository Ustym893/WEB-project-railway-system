export default function Home() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Укрзалізниця: Розклад потягів</h1>
        <p className="text-gray-500 mt-2">Знайдіть та забронюйте свій квиток</p>
      </header>
      
      <main>
        {/* Тут згодом буде компонент TrainList */}
        <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-600">
          Завантаження списку потягів...
        </div>
      </main>
    </div>
  )
}