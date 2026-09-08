import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'grid:saved-properties';

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === 'string')
      : [];
  } catch {
    // Private browsing, disabled storage, or corrupted value: start empty.
    return [];
  }
}

/**
 * Saved properties, persisted to this browser so the "save a property to
 * revisit it on this device" promise on the Properties page is actually kept.
 * Also syncs across open tabs.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(read());

    function onStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) setFavorites(read());
    }

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = useCallback((id: string) => {
    setFavorites((current) => {
      const next = current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Saving is a convenience; ignore quota or permission failures.
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setFavorites([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore.
    }
  }, []);

  return { favorites, toggle, clear };
}
