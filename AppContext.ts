import { createContext } from 'react';

interface ContextProps {
  index: number;
  setIndex: (newIndex: number) => void;
}

const defaultContext: ContextProps = {
  index: 0,
  setIndex: () => {},
};

export default createContext<ContextProps>(defaultContext);
