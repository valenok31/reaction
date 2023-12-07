
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
