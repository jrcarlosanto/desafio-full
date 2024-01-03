import store from './redux';

export type GlobalState = ReturnType<typeof store.getState>;

export type LoginType = {
  email: string;
  password: string;
};