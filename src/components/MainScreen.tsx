import React, { useState, useRef } from 'react';
import { Menu, ShoppingCart, Heart, X, Info, Clock, Star } from 'lucide-react';
import { DishCard } from './DishCard';
import { FilterBar } from './FilterBar';
import { UserPreferences, Dish } from '../types';

interface MainScreenProps {
  userPreferences: UserPreferences | null;
  onAddToCart: (dish: Dish) => void;
  onShowMenu: () => void;
  onShowCart: () => void;
  onShowChef: (chef: Dish['chef']) => void;
  cartCount: number;
}

export const MainScreen: React.FC<MainScreenProps> = ({
  userPreferences,
  onAddToCart,
  onShowMenu,
  onShowCart,
  onShowChef,
  cartCount
}) => {
  const [currentDishIndex, setCurrentDishIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [filters, setFilters] = useState<string[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  // Моковые данные блюд
  const dishes: Dish[] = [
    {
      id: '1',
      name: 'Паста Карбонара',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
      cuisine: 'italian',
      price: 850,
      rating: 4.8,
      cookTime: '25 мин',
      chef: {
        id: '1',
        name: 'Марко Росси',
        avatar: 'https://images.pexels.com/photos/8629131/pexels-photo-8629131.jpeg',
        rating: 4.9,
        speciality: 'Итальянская кухня'
      },
      tags: ['быстрое', 'сытное'],
      description: 'Классическая паста с беконом, яйцами и пармезаном',
      ingredients: ['Спагетти', 'Бекон', 'Яйца', 'Пармезан', 'Чеснок']
    },
    {
      id: '2',
      name: 'Суши-сет "Токио"',
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
      cuisine: 'japanese',
      price: 1200,
      rating: 4.9,
      cookTime: '15 мин',
      chef: {
        id: '2',
        name: 'Такеши Ямада',
        avatar: 'https://images.pexels.com/photos/8629131/pexels-photo-8629131.jpeg',
        rating: 5.0,
        speciality: 'Японская кухня'
      },
      tags: ['здоровое', 'морепродукты'],
      description: 'Свежие суши с лососем, тунцом и угрем',
      ingredients: ['Рис', 'Лосось', 'Тунец', 'Угорь', 'Нори', 'Васаби']
    },
    {
      id: '3',
      name: 'Борщ по-домашнему',
      image: 'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg',
      cuisine: 'russian',
      price: 420,
      rating: 4.7,
      cookTime: '45 мин',
      chef: {
        id: '3',
        name: 'Елена Петрова',
        avatar: 'https://images.pexels.com/photos/8629131/pexels-photo-8629131.jpeg',
        rating: 4.8,
        speciality: 'Русская кухня'
      },
      tags: ['домашнее', 'горячее'],
      description: 'Традиционный борщ с говядиной и сметаной',
      ingredients: ['Говядина', 'Свекла', 'Капуста', 'Морковь', 'Лук', 'Сметана']
    }
  ];

  const currentDish = dishes[currentDishIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    
    if (direction === 'right') {
      onAddToCart(currentDish);
    }

    setTimeout(() => {
      setSwipeDirection(null);
      setCurrentDishIndex((prev) => (prev + 1) % dishes.length);
    }, 300);
  };

  const handleShowDetails = () => {
    // Показать подробности блюда
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg">
        <button 
          onClick={onShowMenu}
          className="p-2 rounded-full bg-orange-100 hover:bg-orange-200 transition-colors"
          title="Меню"
        >
          <Menu size={24} className="text-orange-600" />
        </button>
        
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          U-COOK
        </h1>
        
        <button 
          onClick={onShowCart}
          className="relative p-2 rounded-full bg-orange-100 hover:bg-orange-200 transition-colors"
          title="Корзина"
        >
          <ShoppingCart size={24} className="text-orange-600" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* Filter Bar */}
      <FilterBar filters={filters} onFiltersChange={setFilters} />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm">
          {/* Swipe Instructions */}
          <div className="absolute -top-16 left-0 right-0 flex justify-between text-sm text-gray-500 z-10">
            <div className="flex items-center space-x-2">
              <X size={16} className="text-red-500" />
              <span>Пропустить</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>В корзину</span>
              <Heart size={16} className="text-green-500" />
            </div>
          </div>

          {/* Card Stack */}
          <div className="relative">
            {/* Background cards */}
            <div className="absolute inset-0 transform translate-x-2 translate-y-2 scale-95 opacity-30">
              <div className="w-full h-96 bg-white rounded-3xl shadow-lg" />
            </div>
            <div className="absolute inset-0 transform translate-x-1 translate-y-1 scale-97 opacity-60">
              <div className="w-full h-96 bg-white rounded-3xl shadow-lg" />
            </div>

            {/* Current card */}
            <DishCard
              ref={cardRef}
              dish={currentDish}
              swipeDirection={swipeDirection}
              onSwipe={handleSwipe}
              onShowDetails={handleShowDetails}
              onShowChef={onShowChef}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-8 mt-8">
            <button
              onClick={() => handleSwipe('left')}
              className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              title="Пропустить"
            >
              <X size={24} className="text-red-500" />
            </button>
            
            <button
              onClick={handleShowDetails}
              className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              title="Подробнее"
            >
              <Info size={24} className="text-blue-500" />
            </button>
            
            <button
              onClick={() => handleSwipe('right')}
              className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              title="В корзину"
            >
              <Heart size={24} className="text-green-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="p-4 bg-white/80 backdrop-blur-lg">
        <div className="flex justify-center space-x-8 text-center">
          <div>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-sm text-gray-600">Просмотрено</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{cartCount}</div>
            <div className="text-sm text-gray-600">В корзине</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-600">Поваров</div>
          </div>
        </div>
      </div>
    </div>
  );
};