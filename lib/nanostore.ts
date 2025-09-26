import { Item } from '@/components/to-do-serv';
import { atom } from 'nanostores';

export const
  $counter = atom(0),
  $value = atom('-start-'),
  $todoList = atom<Item[]>([]);

export function setValue(val: string) {
  $value.set(val);
}

export function addItem() {
  $todoList.set([...$todoList.get(), new Item($value.get())])
}

export function delItem(id: number) {
  $todoList.set($todoList.get().filter(item => item.id !== id));
}

export function toggleItem(id: number) {
  const
    index = $todoList.get().findIndex(item => item.id === id),
    elem = $todoList.get()[index].toggleCheck();
  $todoList.set($todoList.get().with(index, elem));
}

export function increment() {
  $counter.set(1 + $counter.get());
}

export function decrement() {
  $counter.set(-1 + $counter.get());
}
