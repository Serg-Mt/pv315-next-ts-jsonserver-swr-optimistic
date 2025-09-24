'use client';

import { type MouseEventHandler, useRef } from 'react';
import useSWR from 'swr';
import toast, { type ToastOptions } from 'react-hot-toast';

const
  endpoint = 'http://localhost:3333/todo',
  ADD = 'add',
  DEL = 'del',
  TOGGLE = 'toggle',

  DEBUG_TOAST_OPTIONS: ToastOptions = {
    icon: '👓',
    position: 'bottom-right',
    style: { fontSize: 'xx-small' }
  },
  INFO_TOAST_OPTIONS: ToastOptions = {
    icon: 'ℹ'
  };




type NonFunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

class Item {
  id = Math.random();
  checked = false;
  text = '-default-';

  static from(obj: NonFunctionProperties<Item>) {
    return Object.assign(new Item, obj);
  }

  constructor(text?: string) {
    Object.assign(this, { text }); //this.text = text;
  }

  toggleCheck() {
    return Object.assign(new Item, this, { checked: !this.checked });
  }
}

async function fetcher(url: string | URL) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(response.statusText + response.status);
  return await response.json();
}



export function ToDoServ() {
  const
    ref = useRef(null),
    { data, error, isLoading, isValidating, mutate } = useSWR<Item[]>(endpoint, fetcher),
    onClick: MouseEventHandler = async (event) => {
      const
        { target } = event,
        actionTarget = (target as HTMLElement).closest('[data-action]');
      if (!actionTarget)
        return;
      const
        { action } = (actionTarget as HTMLElement)?.dataset,
        id = ((target as HTMLElement)?.closest('[data-id]') as HTMLElement)?.dataset?.id;
      // console.log({ target, actionTarget, action, id });
      switch (action) {
        case ADD:
          const
            text = (ref.current! as HTMLInputElement).value,
            item = new Item(text),
            add = async () => {
              const
                resp = await fetch(endpoint + '', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(item)
                });
              if (!resp.ok)
                throw new Error('err:' + resp.status);
              const
                result = await resp.json();
              return result;
            },
            promise = add();
          toast.promise(promise, {
            loading: 'Adding',
            success: 'Ok',
            error: 'Error add item',
          }, INFO_TOAST_OPTIONS);
          await promise;
          mutate();
          return;

        case DEL:
          await fetch(endpoint + '/' + id, {
            method: 'DELETE'
          });
          mutate();
          return;

        case TOGGLE:
          const
            checked = !data?.find(item => id === String(item.id))?.checked;
          await fetch(endpoint + '/' + id, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ checked })
          });
          mutate();
          return
      }
    };
  return <>
    <h1>To Do List</h1>
    <section onClick={onClick} className=''>
      <label>
        <input className="border" ref={ref} />
        <button className="" data-action={ADD}>add</button>
      </label>
      {error && <div className="error">ERROR:</div>}
      {isLoading && '⌛'}
      {isValidating && '⚡'}
      {data && <ol>
        {data.map(item => <ToDoItem key={item.id} item={item} />)}
      </ol>}
    </section>
  </>;
}

function ToDoItem({ item }: { item: Item }) {
  // console.log('Item render', item.text);
  return <li data-id={item.id}>
    <label>
      <input readOnly type="checkbox" checked={item.checked} data-action={TOGGLE} />
      {item.text}
    </label>
    {item.checked && '✔'}
    <button data-action={DEL} > ❌</button>
  </li>
}