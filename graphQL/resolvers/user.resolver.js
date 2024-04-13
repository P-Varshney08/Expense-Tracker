import { GraphQLError } from "graphql";
import bcryptjs from 'bcryptjs';
import User from "../models/User.js";
import userHelper from '../helpers/user.helper.js';
import throwCustomError, { ErrorTypes } from '../helpers/errorHandler.js';
import jwt from 'jsonwebtoken';

const userResolver = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User.find().sort({ createdAt: -1 });
                return users;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        getUser: async (_, { id }) => {
            try {
                const user = await User.findById(id);
                if (!user) {
                    throw new GraphQLError("No user found with the given ID");
                }
                return user;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    },

    Mutation: {
        signup: async (_, { input }) => {
            const { email, password, username } = input;
            try {
                const isUserExists = await userHelper.isEmailExists(email);
                if (isUserExists) {
                    throwCustomError('Email already exists in the database', ErrorTypes.ALREADY_EXISTS);
                }

                const hashedPassword = await bcryptjs.hash(password, 10);
                const newUser = new User({
                    email,
                    password: hashedPassword,
                    username,
                });

                await newUser.save();

                const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY_TIME });

                return {
                    __typename: 'UserWithToken',
                    userId: newUser._id,
                    email: newUser.email,
                    userJwtToken: {
                        token,
                    },
                };
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },

        signin: async (_, { input }) => {
            const { email, password } = input;
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throwCustomError('Email not registered', ErrorTypes.NOT_FOUND);
                }

                const passwordMatched = await bcryptjs.compare(password, user.password);
                if (!passwordMatched) {
                    throwCustomError('Invalid credentials', ErrorTypes.UNAUTHENTICATED);
                }

                const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY_TIME });

                return {
                    __typename: 'UserWithToken',
                    userId: user._id,
                    email: user.email,
                    userJwtToken: {
                        token,
                    },
                };
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    }
};

export default userResolver;
