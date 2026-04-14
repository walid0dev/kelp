import { motion } from 'motion/react';
import { useState } from 'react';
type props = { classes?: string };

export default function Input({ classes }: props) {
	const [isInputActive, setInputActive] = useState(false);
	return (
		<motion.div
			className={`
                
            
                ${classes}
            
            
             `}
		>
			<input
				placeholder='Take a not...'
				onFocus={() => setInputActive(true)}
				onBlur={() => setInputActive(false)}
			></input>
		</motion.div>
	);
}
