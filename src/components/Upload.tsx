import { cn } from "@/lib/utils";
import { useDropzone } from "@uploadthing/react";
import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";

// ----------------------------------------------------------------------

interface UploadProps {
	children?: React.ReactNode;
	multiple?: boolean;
	onDrop: (acceptedFiles: File[]) => void;
	error?: boolean;
	disabled?: boolean;
	files: (File & { preview: string })[];
}

export default function Upload({ multiple = false, onDrop, error = false, disabled = false, files }: UploadProps) {
	const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
		multiple,
		accept: { "image/*": [] },
		onDrop,
	});

	const hasError = isDragReject || !!error;
	return (
		<div
			{...getRootProps()}
			className={cn(
				"min-h-[200px] outline-none rounded-lg cursor-pointer overflow-hidden relative bg-gray-400/12 outline-2 outline-dashed outline-gray-500 transition-all hover:opacity-80 bg-transparent overflow-y-auto",
				{
					"opacity-80": isDragActive,
					"pointer-events-none opacity-50": disabled,
					"text-error bg-red-50 outline-red-400": hasError,
					"h-[240px]": files.length > 1,
				},
			)}>
			<input {...getInputProps()} />
			{files.length === 0 ? (
				<div className="flex flex-col flex-wrap items-center justify-center space-y-6 h-[200px] px-2">
					<div className="flex items-center justify-center">
						<IoCloudUploadOutline className="stroke-gray-700 lg:size-20 size-16" />
					</div>
					<div className="flex flex-col space-y-2 text-center text-gray-700">
						<h6 className="text-xl font-semibold">Drop or select{multiple ? " multiple " : " "}file</h6>
						<p className="text-sm text-muted-foreground">
							Drop files here or click
							<span className="mx-1 text-primary underline">browse</span>
							thorough your machine
						</p>
					</div>
				</div>
			) : (
				<div className="inset-0 w-full h-full absolute">
					{files.map((file, index) => (
						<Image
							key={index}
							src={file.preview}
							alt={`${typeof file === "string" ? file : file.name}-file preview`}
							height={200}
							width={200}
							className="h-[200px] w-full object-cover"
						/>
					))}
				</div>
			)}
		</div>
	);
}
