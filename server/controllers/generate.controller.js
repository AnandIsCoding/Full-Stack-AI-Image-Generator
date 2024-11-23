import FormData from 'form-data';
import axios from 'axios';
import userModel from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

const generateImageController = async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        // Validate input
        if ( !prompt) {
            return res.status(409).json({ success: false, message: 'Required fields are empty' });
        }

        console.log('Incoming Request Body:', req.body); // Debugging

        //Fetch user (uncomment these lines in production)
        // const user = await userModel.findById(userId);
        // if (!user) {
        //     return res.status(404).json({ success: false, message: 'User not found' });
        // }

        // Check user credits
        // if (user.userAvailablecredits <= 0) {
        //     return res.status(403).json({ success: false, message: 'No credits left' });
        // }

        //Prepare form data
        const formData = new FormData();
        formData.append('prompt', prompt);

        // Call external API
        console.log('Sending API Request...');
        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                ...formData.getHeaders(),
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer', // Ensures we handle binary data
        });

        // Convert binary response to base64
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Deduct a credit and save user (uncomment in production)
        // user.userAvailablecredits -= 1;
        // await user.save();

        console.log('Image Generated Successfully'); // Debugging
        // Send image data back to client
        res.status(200).json({
            success: true,
            message: 'Image generated successfully',
            resultImage,
        });

    } catch (error) {
        console.error('Image Generation Error:', error.response?.data || error.message);
        res.status(500).json({ success: false, message: error.response?.data?.message || error.message });
    }
};

export default generateImageController;
