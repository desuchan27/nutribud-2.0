import Image from 'next/image';

export const AuthContainer = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="w-full md:w-1/2 h-full bg-gray-50">
            <div className="max-w-xl h-full flex flex-col gap-y-8 px-4 py-4 md:px-8 md:py-8 items-center justify-center mx-auto">
                <div className="relative w-[252px] h-[88px]">
                    <Image src="/icons/nutribud-icon.svg" fill alt="NutriBud Logo" className='cover'/>
                </div>
                {children}
            </div>
        </div>
    )
}