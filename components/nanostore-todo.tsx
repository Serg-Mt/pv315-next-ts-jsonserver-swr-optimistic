'use client';

import { $counter, $todoList, $value, addItem, decrement, delItem, increment, setValue, toggleItem } from '@/lib/nanostore';
import { useStore } from '@nanostores/react';
import { useRef } from 'react';

export function NanoToDo() {
  const
    value = useStore($value),
    todo = useStore($todoList),
    counter = useStore($counter);
  return <fieldset>
    <label>Nanostore ToDo</label>

    <button onClick={decrement}>-</button>
    <input readOnly type="number" value={counter} className="w-[80px]" />
    <button onClick={increment}>+</button>
    <br />
    <input value={value} onInput={event => setValue((event.target as HTMLInputElement).value)} />
    <button onClick={addItem}>add</button>
    {todo.map(({ id, text, checked }) =>
      <li key={id}>
        <input checked={checked} type="checkbox" onChange={() => toggleItem(id!)} />
        {text}
        {checked && '✔'}
        <button onClick={() => delItem(id!)}>❌</button>
      </li>)}

  </fieldset>
}