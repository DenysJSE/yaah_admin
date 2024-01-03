import React, { createContext, ReactNode, useContext, useState } from 'react';

interface IHideSidebarContext {
  isSidebarHidden: boolean,
  toggleSidebar: () => void
}

const HideSidebarContext = createContext<IHideSidebarContext | undefined>({
  isSidebarHidden: false,
  toggleSidebar: () => {}
});

export const useSidebarContext = () => {
  const context = useContext(HideSidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a HideSidebarProvider');
  }
  return context;
};

export const HideSidebarProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarHidden((prev) => !prev);
  };

  return (
    <HideSidebarContext.Provider value={{ isSidebarHidden, toggleSidebar }}>
      {children}
    </HideSidebarContext.Provider>
  );
};