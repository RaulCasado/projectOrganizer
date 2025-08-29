export class LocalStorageService {
    static get<T>(key: string, defaultValue: T): T {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.warn(`LocalStorage get error for key "${key}":`, error);
            return defaultValue;
        }
    }

    static set<T>(key: string, value: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`LocalStorage set error for key "${key}":`, error);
        }
    }

    static remove(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.warn(`LocalStorage remove error for key "${key}":`, error);
        }
    }

    static getKeysWithPrefix(prefix: string): string[] {
        try {
            return Object.keys(localStorage).filter(key => key.startsWith(prefix));
        } catch (error) {
            console.warn(`LocalStorage getKeysWithPrefix error for prefix "${prefix}":`, error);
            return [];
        }
    }

    static getRawItem(key: string): string | null {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.warn(`LocalStorage getRawItem error for key "${key}":`, error);
            return null;
        }
    }
}

export default LocalStorageService;