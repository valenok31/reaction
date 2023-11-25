//import {Button} from 'react-bootstrap';
//import {Card} from "react-bootstrap";
//import Button from 'react-bootstrap/Button';
//import {useEffect, useState} from "react";

/*export const Card = () => {

    return <>
        <Button variant="primary">Primary</Button>{' '}
        <Button variant="secondary">Secondary</Button>{' '}
        <Button variant="success">Success</Button>{' '}
        <Button variant="warning">Warning</Button>{' '}
        <Button variant="danger">Danger</Button>{' '}
        <Button variant="info">Info</Button>{' '}
        <Button variant="light">Light</Button>{' '}
        <Button variant="dark">Dark</Button>
        <Button variant="link">Link</Button>
    </>

}*/


//           const API_KEY = 'sk-mSsCaXW00kqnhIYaLw3sLFP9ucqwKd1j';

import {useState} from 'react';
import axios from 'axios';

const MyComponent = () => {
    const [userInputValue, setUserInputValue] = useState('');
    const [response, setResponse] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userInput = e.target.elements.userInput.value;
        setUserInputValue(userInput);

        const API_KEY = 'sk-mSsCaXW00kqnhIYaLw3sLFP9ucqwKd1j';
        try {
            //const res = await axios.post("https://api.proxyapi.ru/openai/v1/chat/completions", {
            const res = await axios.post("api.proxyapi.ru/openai/v1", {
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: userInput}],
                temperature: 0.7,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
            });
            console.log(res.data.choices)
            setResponse( res.data.choices[0].message.content);
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
                <button type="submit">Enter</button>
            </form>

            <div>user: {userInputValue}</div>
            <div>chatGPT: {response}</div>
            {/*{response && <p>{response}</p>}*/}
        </div>
    );
};

export default MyComponent;







