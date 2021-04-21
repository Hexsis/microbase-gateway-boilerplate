export type TGenerateJwtPayload = {
    userId: string
    role: string
};

export type TExtractedJwt = { isAuthenticated: boolean, id?: string, role?: string };