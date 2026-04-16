import { useEffect, type RefObject } from 'react';

export default function useClickOutside<T extends HTMLElement>(
	ref: RefObject<T | null>,
	cb: () => void,
) {
    useEffect(()=>{
        const handleClick = (ev:MouseEvent|TouchEvent)=>{
            if(!ref.current) return
            const paths = ev.composedPath()
            if(!paths.includes(ref.current)) cb()
        }

        document.addEventListener("click" , handleClick)
        document.addEventListener("touchstart" , handleClick)

        return ()=>{
            document.removeEventListener("click" , handleClick)
            document.removeEventListener("touchstart" , handleClick)
        }
    }, [ref, cb])
}
