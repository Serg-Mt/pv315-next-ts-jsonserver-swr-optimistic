import { createStore } from 'redux';
import { Item } from '@/components/to-do-serv';

const
  ADD_ITEM = 'ADD_ITEM',
  DEL_ITEM = 'DEL_ITEM',
  TOGGLE_ITEM = 'TOGGLE_ITEM',
  DEL_COMPLETE = 'DEL_COMPLETE',
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT';

type Action = {
  type: typeof ADD_ITEM | typeof DEL_ITEM | typeof TOGGLE_ITEM | typeof DEL_ITEM | typeof DEL_COMPLETE | typeof INCREMENT | typeof DECREMENT
  text?: string,
  id?: number
}

export function increment(): Action {
  return { type: INCREMENT };
}

export function decrement(): Action {
  return { type: DECREMENT };
}

export function addItem(text: string): Action {
  return { type: ADD_ITEM, text };
}

export function delItem(id: number): Action {
  return { type: DEL_ITEM, id };
}

export function toggleItem(id: number): Action {
  return { type: TOGGLE_ITEM, id };
}

export function delComplete(): Action {
  return { type: DEL_COMPLETE };
}

type Store = {
  value: number, todoList: Item[]
}

function rootReducer(
  state: Store = { value: 0, todoList: [] },
  action: Action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    case DECREMENT:
      return { ...state, value: state.value - 1 };
    case ADD_ITEM:
      return { ...state, todoList: [...state.todoList, new Item(action.text)] }
    case DEL_ITEM:
      return { ...state, todoList: state.todoList.filter(el => el.id !== action.id) };
    case TOGGLE_ITEM:
      const
        index = state.todoList.findIndex(el => el.id === action.id),
        el = state.todoList[index],
        value = el.toggleCheck();
      console.log({ index, el, value });
      return { ...state, todoList: state.todoList.with(index, value) }
    default:
      return state;
  }
}

export const store = createStore(rootReducer);

export const selectCount = (store: Store) => store.value;
export const selectTodo = (store: Store) => store.todoList;

