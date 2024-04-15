import User from "../../server/models/User.js";

const userHelper = {
    isEmailExists: async (email) => {
        const user = await User.findOne({ email });
        return user ? true : false;
    }
};

export default userHelper;
