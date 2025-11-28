import { utapi } from "@/server/uploadthing";
import { validateRequest } from "@/auth";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { logFileUpload, logUnauthorizedAccess, logRateLimitViolation } from "@/lib/logger";

// ----------------------------------------------------------------------

export async function POST(request: Request) {
	// Authenticate the request
	const session = await validateRequest();
	
	if (!session.user) {
		logUnauthorizedAccess("/api/upload", undefined);
		return NextResponse.json(
			{ error: "Unauthorized" },
			{ status: 401 }
		);
	}

	// Rate limiting: 20 uploads per hour per user
	const identifier = `upload:${session.user.id}`;
	const rateLimitResult = rateLimit(identifier, {
		maxRequests: 20,
		windowMs: 60 * 60 * 1000, // 1 hour
	});

	if (!rateLimitResult.success) {
		logRateLimitViolation(identifier, "/api/upload");
		return NextResponse.json(
			{
				error: `Upload rate limit exceeded. Please try again in ${rateLimitResult.retryAfter} seconds.`,
			},
			{
				status: 429,
				headers: {
					"Retry-After": rateLimitResult.retryAfter?.toString() || "3600",
					"X-RateLimit-Limit": rateLimitResult.limit.toString(),
					"X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
					"X-RateLimit-Reset": new Date(rateLimitResult.reset).toISOString(),
				},
			}
		);
	}

	const formData = await request.formData();
	const files = formData.getAll("files") as File[];
	const images: { img: string }[] = [];
	
	if (!!files.length) {
		(await utapi.uploadFiles(files)).forEach((file) => {
			if (file.data) {
				images.push({
					img: file.data.appUrl,
				});
			}
		});
		
		// Log file upload
		logFileUpload(session.user.id, files.length);
	}

	return Response.json({
		images,
	});
}
