import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Header() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <h1>Theme Switcher</h1>
      <button onClick={toggleTheme}>
        Switch to {darkMode ? "Light" : "Dark"} Theme
      </button>
    </div>
  );
}

function Content() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div>
      <h2>{darkMode ? "Dark Theme" : "Light Theme"}</h2>
      <p>
        This component receives the theme directly using Context API,
        without prop drilling.
      </p>
    </div>
  );
}

function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        backgroundColor: darkMode ? "#222" : "#fff",
        color: darkMode ? "#fff" : "#222",
      }}
    >
      <Header />
      <Content />
    </div>
  );
}

function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default Root;