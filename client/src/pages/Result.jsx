import React, { useContext, useState } from "react";
import { Appcontext } from "../context/Appcontext";
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const { appToken } = useContext(Appcontext);
  const [showPromptbox, setShowpromptbox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageloaded] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [imageactualurl, setImageactualurl] = useState('');
  const [totalCredits, setTotalCredits] = useState(null);

  // Handle the image download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageactualurl; // Image URL for download
    link.download = 'generated_image.png'; // Set the default download file name
    link.click(); // Trigger the download
  };

  // Generate Image function
  const generateImage = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/v1/image/generate',
        { prompt }, // Send the prompt
        { headers: { 'Authorization': `Bearer ${appToken}` } } // Correct token in the headers
      );

      if (data.success) {
        toast.success(data.message);
        
          setTotalCredits(totalCredits - 1);
          setImageactualurl(data.resultImage); // Update the image URL
        
       
      }
      return data.resultImage;
    } catch (error) {
      toast.error('Internal server error');
      console.log(error);
    }
  };

  // Handle the form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (prompt.trim().length > 3) {
      setLoading(true);
      const imageUrl = await generateImage(prompt);
      if (imageUrl) {
        setImageactualurl(imageUrl);
        setImageloaded(true);
        setLoading(false);
        setPrompt(''); // Reset prompt
      }
    } else {
      alert("Please enter a prompt with more than 3 characters");
    }
  };

  return (
    <div>
      <div className="w-full min-h-[80vh] flex flex-col items-center">
        {!loading ? (
          <img
            src={
              !imageLoaded
                ? "https://images.deepai.org/machine-learning-models/af4d384431974ab5bfda622a20a27695/anime_fairy.jpg"
                : imageactualurl
            }
            alt="Generated"
            className="w-[73vw] h-[73vw] md:w-[20vw] md:h-[20vw] rounded-xl"
          />
        ) : (
          <img
            src="loader.gif"
            alt="Loading"
            className="w-[73vw] h-[73vw] md:w-[20vw] md:h-[20vw] rounded-xl"
          />
        )}
        {!showPromptbox ? (
          <div className="flex gap-2 ml-[-2vw] mt-5 md:mt-0">
            <button
              onClick={() => setShowpromptbox(true)}
              className="md:h-[3vw] px-5 py-2 mt-0 md:mt-3 text-xl rounded-full border-2 border-violet-600 text-white hover:bg-white hover:text-black"
            >
              Generate new
            </button>
            <button
              className="md:h-[3vw] px-5 py-2 mt-0 md:mt-3 text-xl rounded-full border-2 border-violet-600 text-white hover:bg-white hover:text-black"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        ) : (
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex rounded-2xl mt-4 border-2 border-violet-800"
            >
              <input
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                type="text"
                placeholder="Enter prompt to generate image"
                className="flex w-[60vw] md:w-[20vw] px-5 py-2 bg-transparent outline-none rounded-2xl"
              />
              <button type="submit" className="px-3 py-1 bg-violet-800 rounded-2xl text-white">
                Generate
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
