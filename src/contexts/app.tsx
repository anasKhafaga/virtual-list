import { useAxios } from "@/api";
import { AxiosInstance } from "axios";
import { createContext } from "react";

interface AppContextType {
  qAxios: AxiosInstance;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const qAxios = useAxios();

  return (
    <AppContext.Provider value={{ qAxios }}>
      {children}
    </AppContext.Provider>
  );
};
