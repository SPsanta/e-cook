import React, { useState } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { MainScreen } from './components/MainScreen';
import { MenuScreen } from './components/MenuScreen';
import { ChefProfile } from './components/ChefProfile';
import { Cart } from './components/Cart';
import { UserPreferences, Dish } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'main' | 'menu' | 'chef' | 'cart'>('onboarding');
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [cartItems, setCartItems] = useState<Dish[]>([]);
  const [selectedChef, setSelectedChef] = useState<Dish['chef'] | null>(null);

  const handleOnboardingComplete = (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    setCurrentScreen('main');
  };

  const handleAddToCart = (dish: Dish) => {
    setCartItems(prev => [...prev, dish]);
  };

  const handleRemoveFromCart = (dishId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== dishId));
  };

  const handleShowChef = (chef: Dish['chef']) => {
    setSelectedChef(chef);
    setCurrentScreen('chef');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case 'main':
        return (
          <MainScreen
            userPreferences={userPreferences}
            onAddToCart={handleAddToCart}
            onShowMenu={() => setCurrentScreen('menu')}
            onShowCart={() => setCurrentScreen('cart')}
            onShowChef={handleShowChef}
            cartCount={cartItems.length}
          />
        );
      case 'menu':
        return (
          <MenuScreen
            onBack={() => setCurrentScreen('main')}
            onShowChef={handleShowChef}
          />
        );
      case 'chef':
        return selectedChef ? (
          <ChefProfile
            chef={selectedChef}
            onBack={() => setCurrentScreen('main')}
            onAddToCart={handleAddToCart}
          />
        ) : null;
      case 'cart':
        return (
          <Cart
            items={cartItems}
            onBack={() => setCurrentScreen('main')}
            onRemove={handleRemoveFromCart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100">
      {renderScreen()}
    </div>
  );
}

export default App;