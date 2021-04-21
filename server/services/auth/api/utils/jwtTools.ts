import { TGenerateJwtPayload, TExtractedJwt } from './types';
import { ExpressContext } from 'apollo-server-express';

const generateJwt = ({
    userId,
    role
}: TGenerateJwtPayload): string => ''

const extractJwt = (opts: ExpressContext): TExtractedJwt => ({ isAuthenticated: true, id: '123', role: 'customer' })

export {
    generateJwt,
    extractJwt
}