import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { trainsData } from '../data/trains';
import WagonSelector from '../components/WagonSelector';
import SeatMap from '../components/SeatMap';
import BookingForm, { type UserData } from '../components/BookingForm'; // ДОДАНО ІМПОРТ

export default function Booking() {
  const { trainId } = useParams<{ trainId: string }>();
  const train = trainsData.find(t => t.id === trainId);

  const [selectedWagon, setSelectedWagon] = useState<number>(1);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isSuccess, setIsSuccess] = useState(false); // Стан для повідомлення про успіх

  const wagonsList = [1, 2, 3, 4, 5];
  const mockBookedSeats = selectedWagon === 1 ? [2, 5, 12, 13] : [1, 2, 3, 35, 36];

  const handleToggleSeat = (seatId: number) => {
    // Якщо бронювання вже успішне, забороняємо клікати
    if (isSuccess) return; 
    
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleWagonChange = (wagonId: number) => {
    setSelectedWagon(wagonId);
    setSelectedSeats([]);
    setIsSuccess(false); // Скидаємо повідомлення про успіх при зміні вагона
  };

  // ФУНКЦІЯ ОБРОБКИ БРОНЮВАННЯ [cite: 149]
  const handleBookingSubmit = (userData: UserData) => {
    const bookingDetails = {
      trainId: train?.id,
      trainNumber: train?.trainNumber,
      wagon: selectedWagon,
      seats: selectedSeats,
      user: userData,
      date: new Date().toISOString()
    };

    // Зберігаємо в LocalStorage 
    const existingBookings = JSON.parse(localStorage.getItem('railway_bookings') || '[]');
    localStorage.setItem('railway_bookings', JSON.stringify([...existingBookings, bookingDetails]));

    setIsSuccess(true); // Показуємо успішне повідомлення 
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
        <div className="lg:col-span-2">
          <WagonSelector 
            wagons={wagonsList} 
            selectedWagon={selectedWagon} 
            onSelect={handleWagonChange} 
          />
          <SeatMap 
            bookedSeats={isSuccess ? [...mockBookedSeats, ...selectedSeats] : mockBookedSeats}
            selectedSeats={isSuccess ? [] : selectedSeats}
            onToggleSeat={handleToggleSeat}
          />
        </div>

        {/* Права колонка з Формою */}
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
            
            {/* Показуємо або повідомлення про успіх, або форму */}
            {isSuccess ? (
              <div className="mt-6 bg-green-500/20 border border-green-500 text-green-300 p-4 rounded-xl text-center">
                <h4 className="font-bold text-lg mb-1">Квитки заброньовано!</h4>
                <p className="text-sm">Дані успішно збережено в системі.</p>
                <button 
                  onClick={() => { setSelectedSeats([]); setIsSuccess(false); }}
                  className="mt-4 text-sm text-white underline hover:text-green-200"
                >
                  Забронювати ще
                </button>
              </div>
            ) : (
              <BookingForm selectedSeats={selectedSeats} onSubmit={handleBookingSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}