import {useState} from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(1)

    return <>
        <h1>Vite + React</h1>
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
