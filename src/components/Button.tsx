export const Button = ({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	type?: string;
}) => {
	return (
		<button
			className="w-full px-8 py-4 rounded-lg bg-primary text-white hover:bg-opacity-90 transition-hover duration-200"
			onClick={onClick}>
			{children}
		</button>
	);
};
