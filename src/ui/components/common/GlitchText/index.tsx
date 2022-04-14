import { PropsWithChildren } from "react";
import s from './glitchText.module.css'

interface GlitchTextProps {
    fontSize?: number
}

export const GlitchText= ({
    children,
    fontSize
}: PropsWithChildren<GlitchTextProps>) => {
    const text = Array.isArray(children) ? children.join('') : children
    return (
        <p data-text={text} className={s.glitch} style={{
            fontSize
        }}>
            {text}
        </p>
    )
}

