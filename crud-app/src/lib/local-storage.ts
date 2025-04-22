export const getFromLocalStorage = <T>(key: string): T | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage`, error);
    return null;
  }
};

export const setToLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item ${key} to localStorage`, error);
  }
};

export const removeFromLocalStorage = (key: string): void => {
  if (typeof window === 'undefined') {
    return
  }
  
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage`, error)
  }
}