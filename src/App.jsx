// const openai = new OpenAI('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');

import {useState} from 'react';
import axios from 'axios';


import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: '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', dangerouslyAllowBrowser: true
});


const App = () => {
    const [userInputValue, setUserInputValue] = useState('');
    const [response, setResponse] = useState('');
    const [context, setContext] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userInput = e.target.elements.userInput.value;
        setUserInputValue(userInput);

        const API_KEY = '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';
        const API_URL = 'https://api.openai.com/v1/chat/completions';
        //const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';
        //const API_URL = 'https://api.openai.com/v1/completions';


        try {
            const response2 = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                //messages: [{role: "user", content: userInput}],
                messages: [{role: "assistant", content: `Привет, Андрей`},
                    {role: "user", content: userInput}],
                temperature: 0.7,
                max_tokens: 64,
                top_p: 1,
                n: 3,
            });


            const res = await axios.post(`${API_URL}`, {
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: userInput}],
                temperature: 0.7,
                max_tokens: 64,
                top_p: 1,
                n: 1
                //context: context,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
            });
            console.log(response2)
            setResponse(res.data.choices[0].message.content);
            setContext(response2.id);
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
            <div>context: {context}</div>
        </div>
    );
};

export default App;
