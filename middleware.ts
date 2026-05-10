import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  // This is the main middleware function that Next.js expects
  const path = request.nextUrl.pathname;
  
  // Add any global middleware logic here if needed
  // For now, we'll just let requests pass through
  // Authentication is handled at the API route level
  
  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export async function authMiddleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { success: false, error: 'Authentication required' },
      { status: 401 }
    );
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return NextResponse.json(
      { success: false, error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  // Add user info to request headers for downstream use
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', decoded.userId);
  requestHeaders.set('x-user-email', decoded.email);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Subscription tier enforcement middleware
export async function subscriptionMiddleware(request: NextRequest, requiredTier: string) {
  const authResponse = await authMiddleware(request);
  
  if (authResponse.status === 401) {
    return authResponse;
  }

  // Here you would check the user's subscription tier from database
  // For now, we'll just pass through
  // TODO: Implement actual tier checking logic
  
  return NextResponse.next();
}

// Admin-only middleware
export async function adminMiddleware(request: NextRequest) {
  const authResponse = await authMiddleware(request);
  
  if (authResponse.status === 401) {
    return authResponse;
  }

  const userId = request.headers.get('x-user-id');
  
  // Check if user is admin (implement your admin check logic)
  // For now, we'll just pass through
  // TODO: Implement actual admin verification
  
  return NextResponse.next();
}
