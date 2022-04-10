import {FC, PropsWithChildren} from "react";

interface MainLayoutProps {
    backgroundColor?: `#${string}` | `bg-${string}`
}
export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
    children,
    backgroundColor
}) => {
    console.log(backgroundColor)
    const color = `${backgroundColor?.startsWith('bg-') ? backgroundColor : `bg-[${backgroundColor}]`}`

    return (
        // Allows only "bg-somecolor-somestroke" or "#somecolor"
        <div className={`flex items-center justify-center min-h-screen min-w-full ${color}`}>
            {children}
        </div>
    )
}