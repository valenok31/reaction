//import './App.css'
import {Component} from "./useStateExample/Component";
import {ThemeContext} from "./useContextExample/themeContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";

function App() {

    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(currentValue => currentValue === 'light' ? 'dark' : 'light')
    }

    return <>
        <ThemeContext.Provider value={{
            theme,
            toggle: toggleTheme
        }}>
            <Component/>
        </ThemeContext.Provider>
    </>
}

export default App
