type WithId = { id: number | string };

let nextId = 10000;

export function createMockCollection<T extends WithId>(seed: T[]) {
  let items: T[] = [...seed];

  return {
    list(): T[] {
      return items;
    },
    get(id: number | string): T | undefined {
      return items.find((item) => String(item.id) === String(id));
    },
    create(data: Omit<T, 'id'>): T {
      const item = { ...data, id: ++nextId } as T;
      items = [...items, item];
      return item;
    },
    update(id: number | string, data: Partial<T>): T | undefined {
      items = items.map((item) => (String(item.id) === String(id) ? { ...item, ...data } : item));
      return this.get(id);
    },
    remove(id: number | string): void {
      items = items.filter((item) => String(item.id) !== String(id));
    },
  };
}
