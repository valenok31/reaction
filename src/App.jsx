// const openai = new OpenAI('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');
// const openai = new OpenAI('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');

import {useState} from 'react';
import axios from 'axios';

const App = () => {
    const [userInputValue, setUserInputValue] = useState('');
    const [response, setResponse] = useState('');
    const [context, setContext] = useState({role: "assistant", content: `твоё имя - Андрей`});

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userInput = e.target.elements.userInput.value;
        setUserInputValue(userInput);

        const API_KEY = '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';
        const API_URL = 'https://api.openai.com/v1/chat/completions';
        //const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';
        //const API_URL = 'https://api.openai.com/v1/completions';


        try {
            const res = await axios.post(`${API_URL}`, {
                model: "gpt-3.5-turbo",
                messages: [context, {role: "user", content: userInput}],
                temperature: 0.7,
                max_tokens: 64,
                top_p: 1,
                n: 1
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
            });
            console.log(res.data.choices[0].message)
            setResponse(res.data.choices[0].message.content);
            setContext(res.data.choices[0].message);
            e.target.elements.userInput.value = '';
        } catch (error) {
            console.error(error);
        }
    };
    console.log(userInputValue)
    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="userInput"/>
                <button type="submit">Ввод</button>
            </form>

            <div>user: {userInputValue}</div>
            <div>chatGPT: {response}</div>
        </div>
    );
};

export default App;
