import { createContext } from 'react';
export interface AppContextTypes {
  pathname: string;
  query: any;
}

const AppContext = createContext<AppContextTypes>({
  pathname: '',
  query: {},
});

export default AppContext;
