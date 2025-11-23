import { utapi } from "@/server/uploadthing";

// ----------------------------------------------------------------------

export async function POST(request: Request) {
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
