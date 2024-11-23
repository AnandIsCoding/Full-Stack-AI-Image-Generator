import validator from 'validator';

const validateSignupdata = (req) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return { status: 400, message: 'All fields are required', success: false };
    }

    if (!validator.isEmail(email)) {
        return { status: 400, message: 'Invalid email', success: false };
    }

    if (!validator.isStrongPassword(password)) {
        return { status: 400, message: 'Password is not strong enough', success: false };
    }

    if (userName.length < 3 || userName.length > 25) {
        return { status: 400, message: 'Invalid user name', success: false };
    }

    return null; // Return null if validation passes
};

export default validateSignupdata;
