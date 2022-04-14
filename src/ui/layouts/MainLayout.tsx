import React, { FC, PropsWithChildren } from "react";
import { Navigation } from "@/ui/components/Navigation";

interface MainLayoutProps {
    backgroundColor?: `#${string}` | `bg-${string}`
    isAuth?: boolean
}

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
    children,
    backgroundColor= 'bg-main',
    isAuth
}) => {
    const color = `${backgroundColor?.startsWith('bg-') ? backgroundColor : `bg-[${backgroundColor}]`}`

    return (
        // Allows only "bg-somecolor-somestroke" or "#somecolor"
        <div className={`flex items-center justify-center min-h-screen min-w-full ${color}`}>
            {isAuth && <>
                <Navigation/>

            </>}
            {children}
        </div>
    )
}

