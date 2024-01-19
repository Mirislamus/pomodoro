import { useCallback } from 'react';

const useSetLocalStorage = () => {
  const setLocalStorageValue = useCallback((key: string, value: any) => {
    try {
      const valueToStore = JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(`Ошибка при сохранении в localStorage: ${error}`);
    }
  }, []);

  return setLocalStorageValue;
};

export default useSetLocalStorage;
