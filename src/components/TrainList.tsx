import { useState } from 'react';
import TrainCard from './TrainCard';
import { trainsData } from '../data/trains';

export default function TrainList() {
  // Стан для збереження пошукового запиту
  const [searchQuery, setSearchQuery] = useState('');

  // Фільтруємо масив потягів на основі запиту
  const filteredTrains = trainsData.filter((train) => {
    const query = searchQuery.toLowerCase();
    return (
      train.trainNumber.toLowerCase().includes(query) ||
      train.departureCity.toLowerCase().includes(query) ||
      train.arrivalCity.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      {/* Поле пошуку */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Пошук за маршрутом або номером потяга..."
          className="w-full p-4 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Вивід відфільтрованого списку */}
      <div>
        {filteredTrains.length > 0 ? (
          filteredTrains.map((train) => (
            <TrainCard key={train.id} train={train} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-10 bg-white rounded-xl border border-gray-100">
            На жаль, рейсів за вашим запитом не знайдено.
          </div>
        )}
      </div>
    </div>
  );
}