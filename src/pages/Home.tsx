import TrainList from '../components/TrainList';

export default function Home() {
  return (
    <div className="container mx-auto p-4 max-w-3xl pt-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Розклад потягів</h1>
        <p className="text-gray-500 mt-3 text-lg">Знайдіть зручний рейс та забронюйте квиток</p>
      </header>
      
      <main>
        {/* Підключаємо наш створений список */}
        <TrainList />
      </main>
    </div>
  )
}