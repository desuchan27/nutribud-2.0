import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MdOutlineCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

// ----------------------------------------------------------------------

interface CommandMultiSelectProps {
	options: { label: string; value: string }[];
	values: string[];
	onSelect: (value: string, selected: boolean) => void;
	label: string;
}

export default function CommandMultiSelect({ options, values, onSelect, label }: CommandMultiSelectProps) {
	const [open, setOpen] = useState(false);
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild className="flex w-full flex-col items-start rounded-md border px-4 py-2 sm:flex-row sm:items-center">
				<p className="flex flex-wrap gap-y-1.5 text-sm font-medium leading-none cursor-text">
					{values.map((val) => (
						<span key={val} className="mr-2 rounded-lg bg-primary px-2 py-1 text-xs text-white flex-shrink-0">
							{val}
						</span>
					))}
					<span className="text-sm flex-shrink-0 text-gray-600">{label}</span>
				</p>
			</PopoverTrigger>
			<PopoverContent className="p-0 w-[var(--radix-popper-anchor-width)]" align="center">
				<Command className="w-full">
					<CommandInput placeholder="Search ingredient..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options.map((opt) => {
								const selected = values.findIndex((v) => v === opt.value) !== -1;
								return (
									<CommandItem
										key={opt.value}
										value={opt.value}
										onSelect={(value) => {
											onSelect(value, selected);
										}}>
										{selected ? <MdCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
										{opt.label}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
