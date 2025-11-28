import { utapi } from "@/server/uploadthing";
import { validateRequest } from "@/auth";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

// ----------------------------------------------------------------------

export async function POST(request: Request) {
	// Authenticate the request
	const session = await validateRequest();
	
	if (!session.user) {
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
	}

	return Response.json({
		images,
	});
}
