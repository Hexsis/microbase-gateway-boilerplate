import { Resolvers } from '../../../types';
import { sendOtp } from './service/query';
import { logInOtp, logInEmail } from './service/mutation';

const resolvers: Resolvers = {
    Query: {
        sendOtp
    },
    Mutation: {
        logInOtp,
        logInEmail,
    }
};

export default resolvers;