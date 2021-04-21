import { Resolver } from "../../../../types";

const logInOtp: Resolver<string> = async (
    _parent,
    _args,
    _context,
    _info
): Promise<string> => 'Success';

const logInEmail: Resolver<string> = async (
    _parent,
    _args,
    _context,
    _info
): Promise<string> => 'Success';

export { logInOtp, logInEmail };
