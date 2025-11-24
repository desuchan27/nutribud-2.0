// import { validateRequest } from "@/auth"; // <--- COMMENT THIS OUT
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// Fake auth function for testing build
const auth = async () => {
    // const session = await validateRequest();
    // const id = session.user?.id;
    return { id: "fake-user-id" }; // <--- RETURN FAKE ID
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