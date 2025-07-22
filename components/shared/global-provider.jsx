"use client";

import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import { createContext, useContext } from "react";

// Create Settings Context
const SettingsContext = createContext(null);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a Settings Provider");
  }
  return context;
};

export default function GlobalProvider({ children, settings }) {
  return (
    <Provider store={store}>
      <SettingsContext.Provider value={settings}>
        <Toaster position="top-center" visibleToasts={1} />
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </SettingsContext.Provider>
    </Provider>
  );
}
