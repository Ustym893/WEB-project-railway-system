interface WagonSelectorProps {
  wagons: number[];
  selectedWagon: number;
  onSelect: (wagon: number) => void;
}

export default function WagonSelector({ wagons, selectedWagon, onSelect }: WagonSelectorProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Виберіть вагон</h3>
      <div className="flex flex-wrap gap-3">
        {wagons.map((wagon) => (
          <button
            key={wagon}
            onClick={() => onSelect(wagon)}
            className={`px-6 py-2 rounded-lg font-medium transition-all border ${
              selectedWagon === wagon
                ? 'bg-gray-800 text-white border-gray-800 shadow-md'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
            }`}
          >
            Вагон {wagon}
          </button>
        ))}
      </div>
    </div>
  );
}