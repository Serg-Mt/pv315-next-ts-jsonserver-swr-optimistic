'use client';
import { NanoToDo } from '@/components/nanostore-todo';
import { ReduxToDo } from '@/components/redux-todo';
import { store } from '@/lib/redux';
import { Provider } from 'react-redux';

export default function Home() {
  return <>
    <Provider store={store}>
      <ReduxToDo />
      <ReduxToDo />
    </Provider>
    <NanoToDo />
    <NanoToDo  />
  </>
}
