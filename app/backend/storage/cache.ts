/**
 * Simple in-memory LRU Cache for performance optimization
 */

export class CacheManager<T> {
  private cache: Map<string, T>;
  private readonly limit: number;

  constructor(limit: number = 100) {
    this.cache = new Map();
    this.limit = limit;
  }

  public get(key: string): T | undefined {
    const item = this.cache.get(key);
    if (item) {
      // Refresh item (LRU logic)
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }

  public set(key: string, value: T): void {
    if (this.cache.size >= this.limit) {
      // Remove oldest (first inserted in Map)
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  public has(key: string): boolean {
    return this.cache.has(key);
  }

  public clear(): void {
    this.cache.clear();
  }
}

// Singleton for Image Thumbnails if needed
export const ImageCache = new CacheManager<string>(50);
