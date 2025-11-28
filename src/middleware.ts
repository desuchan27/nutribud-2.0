import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Request size limit check (10MB for API routes)
  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const sizeInBytes = parseInt(contentLength, 10);
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (sizeInBytes > maxSize) {
      return NextResponse.json(
        { error: "Request body too large. Maximum size is 10MB." },
        { status: 413 }
      );
    }
  }

  return NextResponse.next();
}

// Apply middleware to API routes
export const config = {
  matcher: "/api/:path*",
};

