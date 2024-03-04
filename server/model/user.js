// import mongoose from 'mongoose';

// const userSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });


// const user = mongoose.model('user', userSchema);

// export default user;



import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Regular expression to validate password
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()-+=^])(?!.*\s).{8,15}$/;
                return passwordRegex.test(value);
            },
            message: props => '${props.value} is not a valid password! It must contain at least 8 characters, at most 15 characters, at least one digit, one upper case alphabet, one lower case alphabet, one special character, and no white space.'
        }
    }
});

userSchema.pre('save', async function(next) {
    try {
        const user = this;
        if (!user.isModified('password')) return next();
        // additional logic before saving user
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

export default User;
