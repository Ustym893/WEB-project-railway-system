import type { Train } from '../data/trains';

interface TrainCardProps {
  train: Train;
}

export default function TrainCard({ train }: TrainCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-4 border-b pb-4">
        <span className="text-xl font-bold text-blue-600">Потяг {train.trainNumber}</span>
        <span className="text-sm font-medium text-gray-500">{train.departureDate}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">{train.departureTime}</p>
          <p className="text-sm text-gray-500">{train.departureCity}</p>
        </div>
        
        <div className="flex-1 px-4 text-center">
          <div className="text-xs text-gray-400 mb-1">У дорозі: {train.duration}</div>
          <div className="h-px bg-gray-300 relative w-full">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 mt-8">{train.arrivalCity}</p>
        </div>
      </div>
    </div>
  );
}