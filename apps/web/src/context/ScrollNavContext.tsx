import { createContext, useContext, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { useScrollRevealNav, type ScrollNavMode } from "../hooks/useScrollRevealNav";
import "../styles/navbar.css";

const ScrollNavContext = createContext(false);

export function useScrollNavVisible() {
  return useContext(ScrollNavContext);
}

interface ScrollNavProviderProps {
  children: ReactNode;
  mode: ScrollNavMode;
}

export function ScrollNavProvider({ children, mode }: ScrollNavProviderProps) {
  const showScrollNav = useScrollRevealNav(mode);

  return (
    <ScrollNavContext.Provider value={showScrollNav}>
      <div
        className={`scroll-navbar${
          showScrollNav ? " scroll-navbar--visible" : ""
        }`}
        aria-hidden={!showScrollNav}
      >
        <div className="scroll-navbar-container">
          <Navbar variant="glass" />
        </div>
      </div>
      {children}
    </ScrollNavContext.Provider>
  );
}

export function AppScrollNavShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const mode: ScrollNavMode = location.pathname === "/" ? "home" : "default";

  return <ScrollNavProvider mode={mode}>{children}</ScrollNavProvider>;
}
