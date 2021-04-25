export type TGenerateJwtPayload = {
    userId: string
    role: string
};

export type TExtractedJwt = { isAuthenticated: boolean, id?: string, roles?: Array<string> };