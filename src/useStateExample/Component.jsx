
import {Button} from 'react-bootstrap';
import {Card} from "react-bootstrap";
//import Button from 'react-bootstrap/Button';
import {useState} from "react";

export function Component() {

    const [count, setCount] = useState(1)
    const [variant, setVariant] = useState("primary")
    return <>
            <h1> What in React? </h1>

            <Card>
                <Card.Body>A JavaScript library for building</Card.Body>
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