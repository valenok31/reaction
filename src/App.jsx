import {useState} from 'react'
import './App.css'
import {Component} from "./useStateExample/Component";

function App() {
    const [count, setCount] = useState(1)

    return <>
        <h1>Vite + React</h1>
        <Component/>
        <div className="card">
            <button onClick={() => setCount((count) => count + 1)} onContextMenu={
                (e) => {
                    setCount((count) => count - 1)
                    e.preventDefault();
                    e.stopPropagation();
                }
            }>
                count is {count}
            </button>
        </div>
    </>
}

export default App
