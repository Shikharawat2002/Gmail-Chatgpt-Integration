// typings/express.d.ts

declare module 'express-serve-static-core' {
    interface Request {
        accessToken?: string;
    }
}
