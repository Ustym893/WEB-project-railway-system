interface SeatMapProps {
  bookedSeats: number[];
  selectedSeats: number[];
  onToggleSeat: (seatId: number) => void;
}

export default function SeatMap({ bookedSeats, selectedSeats, onToggleSeat }: SeatMapProps) {
  // Генеруємо масив з 36 місць (стандартний вагон)
  const totalSeats = 36;
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-800">Схема місць</h3>
        
        {/* Легенда кольорів */}
        <div className="flex gap-4 text-sm font-medium text-gray-600">
          <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-green-500"></span> Вільні</div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-blue-600"></span> Обрані</div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-red-500"></span> Зайняті</div>
        </div>
      </div>

      {/* Сітка місць */}
      <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
        {seats.map((seat) => {
          const isBooked = bookedSeats.includes(seat);
          const isSelected = selectedSeats.includes(seat);

          // Визначаємо колір за вимогами [cite: 88, 89, 90]
          let seatClass = "bg-green-500 hover:bg-green-600 text-white"; 
          if (isBooked) seatClass = "bg-red-500 opacity-50 cursor-not-allowed text-white"; 
          else if (isSelected) seatClass = "bg-blue-600 hover:bg-blue-700 shadow-md text-white border-2 border-blue-800"; 

          return (
            <button
              key={seat}
              disabled={isBooked}
              onClick={() => onToggleSeat(seat)}
              className={`py-3 rounded-md font-bold transition-all ${seatClass}`}
            >
              {seat}
            </button>
          );
        })}
      </div>
    </div>
  );
}