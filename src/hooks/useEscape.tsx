import {  useEffect} from 'react';

export default function useEscape( onEscape: () => void) {
    useEffect(()=>{
        const handleKeyDown = (ev: KeyboardEvent) =>{
            if(ev.key == "Escape"){
                onEscape()
            }
        }

        document.addEventListener("keydown" , handleKeyDown)
        
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    } , [onEscape])
}
