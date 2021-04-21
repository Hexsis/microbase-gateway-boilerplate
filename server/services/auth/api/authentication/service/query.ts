import { Resolver } from "../../../../types";

const sendOtp: Resolver<string> = async (): Promise<string> => 'Success';

export { sendOtp };