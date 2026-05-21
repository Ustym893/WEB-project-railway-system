import { useState } from 'react';
import type { FormEvent } from 'react'; // Винесли в окремий type-імпорт

export interface UserData {
  name: string;
  phone: string;
  email: string;
}

interface BookingFormProps {
  selectedSeats: number[];
  onSubmit: (userData: UserData) => void;
}

export default function BookingForm({ selectedSeats, onSubmit }: BookingFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Валідація: перевіряємо чи вибрані місця [cite: 148]
    if (selectedSeats.length === 0) {
      setError('Будь ласка, виберіть хоча б одне місце.');
      return;
    }

    // Валідація: перевіряємо чи заповнені поля [cite: 148]
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError('Будь ласка, заповніть всі поля.');
      return;
    }

    // Якщо все добре, очищаємо помилку і передаємо дані нагору
    setError('');
    onSubmit({ name, phone, email });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      {error && <div className="bg-red-500/20 text-red-200 p-3 rounded-lg text-sm mb-4">{error}</div>}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Ім'я та Прізвище</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2.5 focus:outline-none focus:border-blue-500"
            placeholder="Олександр Петренко"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-300 mb-1">Номер телефону</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2.5 focus:outline-none focus:border-blue-500"
            placeholder="+38 (099) 000-00-00"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-300 mb-1">Електронна пошта</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2.5 focus:outline-none focus:border-blue-500"
            placeholder="example@mail.com"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={selectedSeats.length === 0}
        className={`w-full mt-6 py-3 rounded-lg font-bold transition-colors ${
          selectedSeats.length > 0 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        Підтвердити бронювання
      </button>
    </form>
  );
}