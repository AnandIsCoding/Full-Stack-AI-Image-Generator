import userModel from '../models/user.model.js';

export const creditController = async (req, res) => {
  try {
    const  userId  = req.body.userId;
    console.log(userId)

    // Fetch user details from the database
    const user = await userModel.findById(userId).select('-password'); // Exclude sensitive fields

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Send a success response with user details
    return res.status(200).json({ success: true, message:{userCredits: user.credits }}); // Assuming `credits` field exists
  } catch (error) {
    console.error('Error in creditController:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
