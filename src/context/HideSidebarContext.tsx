import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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
  const [isSidebarHidden, setIsSidebarHidden] = useState(() => {
    const storedIsHidden = localStorage.getItem('isHidden');
    return storedIsHidden ? JSON.parse(storedIsHidden) : false;
  });

  const toggleSidebar = () => {
    setIsSidebarHidden((prev: boolean) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('isHidden', JSON.stringify(isSidebarHidden));
  }, [isSidebarHidden]);

  return (
    <HideSidebarContext.Provider value={{ isSidebarHidden, toggleSidebar }}>
      {children}
    </HideSidebarContext.Provider>
  );
};