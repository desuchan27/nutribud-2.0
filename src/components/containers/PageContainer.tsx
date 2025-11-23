export const PageContainer = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="min-h-screen w-full max-w-7xl mx-auto px-2 py-[3rem] md:py-[5rem] flex flex-col gap-8">     
                {children}
        </div>
    )
}

export const PageContainerGray = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="w-full bg-gray-100">
            <div className="min-h-screen w-full max-w-7xl mx-auto px-2 py-[5rem] flex flex-col gap-8">
                    {children}
            </div>
        </div>
    )
}