import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { trainsData } from '../data/trains';
import WagonSelector from '../components/WagonSelector';
import SeatMap from '../components/SeatMap';

export default function Booking() {
  const { trainId } = useParams<{ trainId: string }>();
  const train = trainsData.find(t => t.id === trainId);

  // Стан для обраного вагона та місць 
  const [selectedWagon, setSelectedWagon] = useState<number>(1);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  // Тестові дані
  const wagonsList = [1, 2, 3, 4, 5];
  // Імітуємо, що деякі місця вже заброньовані іншими людьми
  const mockBookedSeats = selectedWagon === 1 ? [2, 5, 12, 13] : [1, 2, 3, 35, 36];

  // Логіка вибору/скасування місця
  const handleToggleSeat = (seatId: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId) // Якщо вже обрано - видаляємо
        : [...prev, seatId] // Якщо не обрано - додаємо
    );
  };

  // Коли змінюємо вагон, очищаємо обрані місця
  const handleWagonChange = (wagonId: number) => {
    setSelectedWagon(wagonId);
    setSelectedSeats([]);
  };

  if (!train) {
    return (
      <div className="container mx-auto p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Потяг не знайдено</h2>
        <Link to="/" className="text-blue-600 hover:underline">Повернутися на головну</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl pt-8 pb-12">
      <div className="mb-8">
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block font-medium">
          &larr; Назад до розкладу
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">
          Бронювання квитків: Потяг {train.trainNumber}
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          {train.departureCity} &mdash; {train.arrivalCity} | {train.departureDate} ({train.departureTime})
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ліва колонка: Вагони та Місця */}
        <div className="lg:col-span-2">
          <WagonSelector 
            wagons={wagonsList} 
            selectedWagon={selectedWagon} 
            onSelect={handleWagonChange} 
          />
          <SeatMap 
            bookedSeats={mockBookedSeats}
            selectedSeats={selectedSeats}
            onToggleSeat={handleToggleSeat}
          />
        </div>

        {/* Права колонка: Форма та Підсумок (це ми зробимо в наступному кроці) */}
        <div>
          <div className="bg-gray-800 rounded-xl shadow-md p-6 text-white sticky top-4">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-4">Ваше замовлення</h3>
            
            <div className="mb-4">
              <p className="text-gray-300">Вагон: <span className="font-bold text-white">{selectedWagon}</span></p>
              <p className="text-gray-300 mt-2">
                Обрані місця: {' '}
                {selectedSeats.length > 0 ? (
                  <span className="font-bold text-blue-400">{selectedSeats.sort((a,b)=>a-b).join(', ')}</span>
                ) : (
                  <span className="text-gray-500 italic">не вибрано</span>
                )}
              </p>
            </div>
            
            {/* Тимчасова заглушка для форми */}
            <div className="mt-8 pt-4 border-t border-gray-600 text-sm text-gray-400 text-center">
              Форма вводу даних буде додана на наступному етапі
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}