import {Button} from 'react-bootstrap';
import {Card} from "react-bootstrap";
//import Button from 'react-bootstrap/Button';
import {useEffect, useState} from "react";


function Timer({intervalValue=100}) {
    const [value, setValue] = useState(0);
useEffect(() => {
    const intervalId = setInterval(() => {
            setValue((value) => value + 1)
        }, intervalValue)
if(intervalValue>4000){clearInterval(intervalId);}
        return ()=>{
            clearInterval(intervalId);
        }

    }, [intervalValue]);
    return <>
        <h1>Timer</h1>
        <h2>{value}</h2>
    </>
}

export function Component() {

    const [count, setCount] = useState(1)
    const [variant, setVariant] = useState("primary")
    const [intervalValue, setIntervalValue] = useState();
    const hendleIntervalClick = (ms) => {
        setIntervalValue(ms)
    }

    return <>
        <h1> What in React? </h1>

        <Card>
            <Card.Body>A JavaScript library for building</Card.Body>
            <Timer intervalValue={intervalValue}></Timer>
            <Button variant="success" onClick={() => hendleIntervalClick(100)}>100ms</Button>
            <Button variant="warning" onClick={() => hendleIntervalClick(500)}>500ms</Button>
            <Button variant="danger" onClick={() => hendleIntervalClick(1000)}>1sec</Button>
            <Button variant="info" onClick={() => hendleIntervalClick(5000)}>Stop</Button>
        </Card>
        <Button variant={variant} onClick={() => {
            setCount((count) => count + 1)
            setVariant(() => "primary")
        }} onContextMenu={
            (e) => {
                setCount((count) => count - 1)
                setVariant(() => "secondary")
                e.preventDefault();
                e.stopPropagation();
            }
        }>
            count is {count}
        </Button>{' '}
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

}