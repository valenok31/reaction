//           const API_KEY = 'sk-mSsCaXW00kqnhIYaLw3sLFP9ucqwKd1j';

import {useEffect, useState} from 'react';
import axios from "axios";

let API_KEY = 11//'sk-mSsCaXW00kqnhIYaLw3sLFP9ucqwKd1j';


const ImageComponent = () => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const generateImage = async () => {
            const response = await axios.post(
                'https://api.proxyapi.ru/openai/v1/images/generations',
                {
                    prompt:"A painting of a glass of water on a table.",
                    n:4,
                    size:"1024x1024",
                }, {
                    headers: {
                        //"Content-Type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`
                    }
                },)

            console.log(response)
            setImage(response);
        };

        generateImage();
    }, []);

    return (
        <div>
            <div>123</div>
            {image && <img src={image.url} alt={image.alt}/>}
        </div>
    );
};

export default ImageComponent;