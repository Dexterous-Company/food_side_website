"use client";
import { Provider } from "react-redux";
import { store } from '../../redux/Store';
export default function ReduxLayoutProviders({ children }) {
  return <Provider store={store}>{children}</Provider>;
}