/**
 * This is not authenticate to Access routes.
 */
export const publicRoutes: string[] = ['/', '/sample/dashboard', '/api/v1/upload', '/api/v1/threshold'];

/**
 * This is redirect to root
 */
export const authRoutes: string[] = ['/login', '/register'];

/**
 * This is API prefix for authenticate
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * This is redirect to login user.
 */
export const DEFAULT_LOGIM_REDIRECT: string = '/';