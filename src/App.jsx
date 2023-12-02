import { useState, useEffect } from 'react';
import { OpenAI } from 'openai';
import './App.css';

const openai = new OpenAI('YOUR_API_KEY_HERE');

function App() {
    const [messages, setMessages] = useState([
        { message: "Hello! I'm ChatGPT. How can I help you?", sender: "ChatGPT" }
    ]);
    const [input, setInput] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSendMessage = async () => {
        const newMessage = { message: input, sender: "user" };
        setMessages([...messages, newMessage]);
        setInput('');

        try {
            const response = await openai.complete({
                engine: 'text-davinci-002',
                prompt: `Conversation with ChatGPT:\n\nUser: ${input}\nChatGPT:`,
                maxTokens: 150,
                n: 1,
                stop: '\n',
                temperature: 0.7,
            });

            const chatGPTResponse = { message: response.data.choices[0].text, sender: "ChatGPT" };
            setMessages([...messages, chatGPTResponse]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="App">
            <div className="chat-container">
                <div className="message-list">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            <p>{message.message}</p>
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <input type="text" value={input} onChange={handleInputChange} />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default App;
