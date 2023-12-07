import {useState} from 'react';
import axios from 'axios';
import OpenAI from "openai";
import ComponentA from "./useStateExample/Component";


const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
});

const App = () => {
    const opis = 'андрей'

    const [userInputValue, setUserInputValue] = useState('');
    const [response, setResponse] = useState('');
    const [context, setContext] = useState([{
        role: "user",
        content: opis,
    }]);
    //const [context, setContext] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // Новое состояние


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userInput = e.target.elements.userInput.value;
        setUserInputValue(userInput);

        const API_KEY = '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';
        const API_URL = 'https://api.openai.com/v1/chat/completions';
        //const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';
        //const API_URL = 'https://api.openai.com/v1/completions';

        //const prompt = [...context, {role: "user", content: userInput}];


        try {

            setIsSubmitting(true);
            console.log(context)
            const completion = await openai.chat.completions.create({
                //model: "gpt-3.5-turbo",
                model: "gpt-3.5-turbo",
                messages: [...context, {role: "user", content: userInput}],
                temperature: 0.7,
                max_tokens: 128,
                top_p: 1,
                n: 1
            });

            console.log(completion)
            setResponse(completion.choices[0].message.content);
            setContext((contextOld) => [...contextOld, completion.choices[0].message]);
            console.log(e.target.elements.userInput.value)
            let addContextUser = {role: "user", content: `${e.target.elements.userInput.value}`}
            setContext((contextOld) => [...contextOld, addContextUser]);
            e.target.elements.userInput.value = '';

            /*           const res = await axios.post(`${API_URL}`, {
                           model: "gpt-3.5-turbo",
                           messages: prompt,
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
                       console.log(res.data)
                       setResponse(res.data.choices[0].message.content);
                       setContext(res.data.choices[0].message);*/


            setTimeout(() => {
                setIsSubmitting(false);
                console.log(context)
            }, 10000)

        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
        }
    };
    //console.log(userInputValue)
    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="userInput"/>
                <button type="submit" disabled={isSubmitting}>Ввод</button>
            </form>

            <div>user: {userInputValue}</div>
            <div>chatGPT: {response}</div>

            <ComponentA/>
        </div>
    );
};

export default App;
