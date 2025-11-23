//

import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, InputHTMLAttributes } from "react";
import { Controller, type FieldPath, type FieldValues, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

interface Props
	extends Omit<ComponentPropsWithoutRef<typeof Controller>, "name" | "control" | "render">,
		Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue"> {}

interface HookFormInputProps<TFieldValues extends FieldValues> extends Props {
	label: string;
	name: FieldPath<TFieldValues>;
	containerClass?: string;
}

export default function HookFormInput<TFieldValues extends FieldValues>({
	label,
	name,
	containerClass,
	defaultValue,
	...props
}: HookFormInputProps<TFieldValues>) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field, fieldState: { error } }) => (
				<span className={cn("flex flex-col gap-2", containerClass, !!error && "text-red-600 [&>input]:border-red-600")}>
					<label className="text-sm text-zinc-700">{label}</label>
					<input {...field} {...props} className={cn("w-full p-2 border rounded-md", props.className)} />
					{!!error && <p className="text-xs pl-1.5 text-red-600">{error.message}</p>}
				</span>
			)}
		/>
	);
}
