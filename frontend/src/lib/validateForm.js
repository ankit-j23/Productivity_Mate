import toast from "react-hot-toast";

const validateForm = (credentials, pageType) => {

    //just for the signup
    if (pageType === 'signup') {
        if (!credentials.fullName.trim()) return toast.error("Full name is required")
    }

    //for both login and signup
    if (!credentials.email.trim()) return toast.error("Email is required")
    if (!/\S+@\S+\.\S+/.test(credentials.email)) return toast.error("Invalid Email")

    if (!credentials.password) return toast.error("Password is required")
    if (credentials.password.length < 5) return toast.error("Password should be atleast 5 charachters")


    return true
};

export default validateForm;