import { utapi } from "@/server/uploadthing";
import { validateRequest } from "@/auth";
import { NextResponse } from "next/server";

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
