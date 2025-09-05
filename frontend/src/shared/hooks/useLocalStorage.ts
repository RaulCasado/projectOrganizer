import { useState, useEffect, useCallback, useRef } from 'react';
import { LocalStorageService } from '../services/localStorageService';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() =>
    LocalStorageService.get<T>(key, defaultValue)
  );

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    LocalStorageService.set(key, value);
  }, [key, value]);

  const setStoredValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(prevValue => {
      const valueToStore =
        typeof newValue === 'function'
          ? (newValue as (prev: T) => T)(prevValue)
          : newValue;
      return valueToStore;
    });
  }, []);

  const resetValue = useCallback(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const removeValue = useCallback(() => {
    LocalStorageService.remove(key);
    setValue(defaultValue);
  }, [key, defaultValue]);

  return [value, setStoredValue, { resetValue, removeValue }] as const;
}

export default useLocalStorage;
