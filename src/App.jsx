import {useState} from 'react';
import OpenAI from "openai";
import ComponentA from "./useStateExample/Component";


const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
});

const App = () => {
    const opis = 'Я - Юрий Александрович Дудь - российский журналист, видеоблогер, теле- и радиоведущий. Я родился 11 октября 1986 года в Потсдаме, ГДР ¹. Я являюсь главным редактором издания Sports.ru (2011-2018) и ведущим авторского канала на YouTube под названием «вДудь». Я получил известность благодаря своим документальным фильмам и интервью с известными личностями. В 2022 году меня внесли в список иностранных агентов. Я женат на Ольге Дудь, у них есть двое детей - дочь Алена и сын Данила';

    const [userInputValue, setUserInputValue] = useState('');
    const [response, setResponse] = useState('');
    const [context, setContext] = useState([{
        role: "user",
        content: opis,
    }]);
    const [isSubmitting, setIsSubmitting] = useState(false); // Новое состояние

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userInput = e.target.elements.userInput.value;
        setUserInputValue(userInput);

        try {

            setIsSubmitting(true);
            console.log(context)
            const completion = await openai.chat.completions.create({
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

            setTimeout(() => {
                setIsSubmitting(false);
                console.log(context)
            }, 10000)

        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
        }
    };

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
