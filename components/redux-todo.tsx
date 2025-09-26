'use client';
import { addItem, decrement, delItem, increment, selectCount, selectTodo, toggleItem } from '@/lib/redux'
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'

export function ReduxToDo() {
  const
    ref = useRef(null),
    todo = useSelector(selectTodo),
    counter = useSelector(selectCount),
    dispatch = useDispatch();
  console.log(todo);
  return <fieldset>
    <label>ReduxToDo</label>

    <button onClick={() => dispatch(decrement())}>-</button>

    <input readOnly type="number" value={counter} className="w-[80px]" />
    <button onClick={() => dispatch(increment())}>+</button>
    <br />
    <input ref={ref} />
    <button onClick={() => dispatch(addItem((ref.current! as HTMLInputElement).value as string))}>add</button>
    {todo.map(({ id, text, checked }) =>
      <li key={id}>
        <input checked={checked} type="checkbox" onChange={() => dispatch(toggleItem(id!))} />
        {text}
        {checked && '✔'}
        <button onClick={() => dispatch(delItem(id!))}>❌</button>
      </li>)}

  </fieldset>
}