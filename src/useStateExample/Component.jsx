
import OpenAI from "openai";
import {useState} from "react";


const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
});

const ComponentA = () => {
    const [img, setImg] = useState(null);
    const [userInputValue, setUserInputValue] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userInput = e.target.elements.userInput.value;
        setUserInputValue(userInput);
        try {
            const completion = await openai.images.generate({
                model: "dall-e-2",
                size:'256x256',
                prompt: userInputValue,
            });

           let  image_url = completion.data[0].url;
            setImg(image_url);
            console.log(completion)
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="userInput"/>
                <button type="submit" >Рисовать</button>
            </form>
            {img && <img src={img} alt=''/>}
        </div>
    );
};


export default ComponentA;
