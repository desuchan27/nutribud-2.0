import { validateRequest } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// Authenticate user for file uploads
const auth = async () => {
    const session = await validateRequest();
    if (!session.user) {
        return null;
    }
    return { id: session.user.id };
};

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "128MB" } })
        .middleware(async () => {
            const user = await auth();
            if (!user) throw new UploadThingError("Unauthorized");
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata }) => {
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;