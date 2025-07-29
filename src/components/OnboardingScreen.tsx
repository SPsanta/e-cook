import React, { useState, FC, ChangeEvent } from 'react';
import { ChefHat, ArrowRight } from 'lucide-react';
import { UserPreferences } from '../types';

interface OnboardingScreenProps {
  onComplete: (preferences: UserPreferences) => void;
}

export const OnboardingScreen: FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<number>(50);
  const [budget, setBudget] = useState<[number, number]>([500, 2000]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const cuisines = [
    { emoji: '🍣', name: 'Японская', value: 'japanese' },
    { emoji: '🥟', name: 'Китайская', value: 'chinese' },
    { emoji: '🍕', name: 'Итальянская', value: 'italian' },
    { emoji: '🌮', name: 'Мексиканская', value: 'mexican' },
    { emoji: '🍔', name: 'Американская', value: 'american' },
    { emoji: '🥘', name: 'Индийская', value: 'indian' },
    { emoji: '🍖', name: 'Русская', value: 'russian' },
    { emoji: '🥗', name: 'Здоровая', value: 'healthy' },
  ];

  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines((prev: string[]) =>
      prev.includes(cuisine)
        ? prev.filter((c: string) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleNext = () => {
    if (step === 0) {
      let hasError = false;
      if (!name.trim()) {
        setNameError("Введите имя клиента");
        hasError = true;
      } else {
        setNameError("");
      }
      if (phone.length < 10) {
        setPhoneError("Введите корректный номер телефона");
        hasError = true;
      } else {
        setPhoneError("");
      }
      if (hasError) return;
    }
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({
        cuisines: selectedCuisines,
        frequency,
        budget,
        phone: '+7' + phone,
        name,
      });
    }
  };

  const steps = [
    {
      title: 'Регистрация',
      subtitle: 'Введите номер телефона и имя для регистрации',
      content: (
        <div className="mt-8 space-y-4">
          <label className="block">
            <span className="text-white font-medium">Имя</span>
            <input
              type="text"
              placeholder="Ваше имя"
              aria-label="Имя клиента"
              title="Имя клиента"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className={`w-full p-4 rounded-2xl border-2 focus:border-orange-500 outline-none text-lg shadow-lg ${nameError ? 'border-red-500' : 'border-orange-300'}`}
              maxLength={32}
            />
            {nameError && <div className="text-red-600 mt-2 text-sm">{nameError}</div>}
          </label>
          <label className="block">
            <span className="text-white font-medium">Телефон</span>
            <div className="flex">
              <span className="p-4 rounded-l-2xl border-2 border-orange-300 bg-gray-100 text-lg select-none">+7</span>
              <input
                type="tel"
                placeholder="(___) ___-__-__"
                aria-label="Телефон"
                title="Телефон"
                value={phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className={`w-full p-4 rounded-r-2xl border-2 border-l-0 focus:border-orange-500 outline-none text-lg shadow-lg ${phoneError ? 'border-red-500' : 'border-orange-300'}`}
                maxLength={10}
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="tel"
              />
            </div>
            {phoneError && <div className="text-red-600 mt-2 text-sm">{phoneError}</div>}
          </label>
        </div>
      ),
    },
    {
      title: 'Какие кухни вы любите?',
      subtitle: 'Сделайте Ваш предварительный выбор',
      content: (
        <div className="grid grid-cols-2 gap-4 mt-8">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine.value}
              onClick={() => handleCuisineToggle(cuisine.value)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedCuisines.includes(cuisine.value)
                  ? 'border-orange-500 bg-orange-100 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-orange-300'
              }`}
            >
              <div className="text-3xl mb-2">{cuisine.emoji}</div>
              <div className="text-sm font-medium text-gray-700">{cuisine.name}</div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: 'Как часто заказываете еду?',
      subtitle: 'Поможет подобрать лучшие предложения',
      content: (
        <div className="mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <label className="block mb-2">
              <span className="text-orange-600 font-medium">Частота заказов</span>
              <input
                type="range"
                min="0"
                max="100"
                value={frequency}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFrequency(Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-orange-200 to-orange-500 rounded-lg appearance-none cursor-pointer"
                title="Частота заказов"
                placeholder="Частота заказов"
                aria-label="Частота заказов"
              />
            </label>
            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <span>Редко</span>
              <span className="font-semibold text-orange-600">
                {frequency < 33 ? 'Редко' : frequency < 66 ? 'Часто' : 'Очень часто'}
              </span>
              <span>Очень часто</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Ваш бюджет?',
      subtitle: 'Покажем блюда в вашем диапазоне',
      content: (
        <div className="mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="mb-6">
              <div className="flex justify-between mb-4">
                <span className="text-lg font-semibold text-orange-600">
                  ₽{budget[0]}
                </span>
                <span className="text-lg font-semibold text-orange-600">
                  ₽{budget[1]}
                </span>
              </div>
              <div className="flex space-x-4">
                <label className="flex-1">
                  <span className="text-orange-600 font-medium">Минимальный бюджет</span>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    value={budget[0]}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setBudget([Number(e.target.value), budget[1]])}
                    className="flex-1 h-3 bg-gradient-to-r from-orange-200 to-orange-500 rounded-lg appearance-none cursor-pointer"
                    title="Минимальный бюджет"
                    placeholder="Минимальный бюджет"
                    aria-label="Минимальный бюджет"
                  />
                </label>
                <label className="flex-1">
                  <span className="text-orange-600 font-medium">Максимальный бюджет</span>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    value={budget[1]}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setBudget([budget[0], Number(e.target.value)])}
                    className="flex-1 h-3 bg-gradient-to-r from-orange-200 to-orange-500 rounded-lg appearance-none cursor-pointer"
                    title="Максимальный бюджет"
                    placeholder="Максимальный бюджет"
                    aria-label="Максимальный бюджет"
                  />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-orange-50 rounded-xl">
                <div className="text-sm text-gray-600">Минимум</div>
                <div className="font-bold text-orange-600">₽{budget[0]}</div>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <div className="text-sm text-gray-600">Средний чек</div>
                <div className="font-bold text-orange-600">₽{Math.round((budget[0] + budget[1]) / 2)}</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <div className="text-sm text-gray-600">Максимум</div>
                <div className="font-bold text-orange-600">₽{budget[1]}</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 px-6 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white/20 backdrop-blur-lg rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <ChefHat size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">U-COOK</h1>
          <p className="text-white/80">Персональный помощник для гурманов</p>
        </div>

        {/* Progress */}
        <div className="flex mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full mx-1 transition-all duration-300 ${
                i <= step ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {steps[step].title}
          </h2>
          <p className="text-white/80 mb-4">
            {steps[step].subtitle}
          </p>
          {steps[step].content}
        </div>

        {/* Button */}
        <button
          onClick={handleNext}
          disabled={step === 0 && (phone.length < 10 || !name.trim())}
          className="w-full bg-white text-orange-500 font-bold py-4 px-6 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
        >
          <span>{step === 3 ? 'Начать готовить!' : 'Далее'}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};