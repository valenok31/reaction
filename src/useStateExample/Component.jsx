
import OpenAI from "openai";
import {useState} from "react";


const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
});

const ComponentA = () => {
    const [img, setImg] = useState(null);
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const completion = await openai.images.generate({
                //model: "dall-e-3",
                model: "dall-e-2",
                size:'256x256',
                prompt: "a white siamese cat",
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
                <button type="submit" >Рисовать</button>
            </form>
            {img && <img src={img} alt=''/>}
        </div>
    );
};

export default ComponentA;
