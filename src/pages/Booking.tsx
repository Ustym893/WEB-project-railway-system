import { useParams, Link } from 'react-router-dom';
import { trainsData } from '../data/trains';

export default function Booking() {
  // Отримуємо ID потяга з параметра URL
  const { trainId } = useParams<{ trainId: string }>();
  
  // Знаходимо потрібний потяг у наших даних
  const train = trainsData.find(t => t.id === trainId);

  if (!train) {
    return (
      <div className="container mx-auto p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Потяг не знайдено</h2>
        <Link to="/" className="text-blue-600 hover:underline">Повернутися на головну</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl pt-8">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Назад до розкладу
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">
          Бронювання квитків: Потяг {train.trainNumber}
        </h1>
        <p className="text-gray-500 mt-2">
          {train.departureCity} &mdash; {train.arrivalCity} | {train.departureDate}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 min-h-[400px] flex items-center justify-center">
         <p className="text-gray-400">Тут скоро буде схема вагонів та місць...</p>
      </div>
    </div>
  );
}