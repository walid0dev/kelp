import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import useEscape from '../hooks/useEscape';
import useClickOutside from '../hooks/useClickOutside';
import { MdImage } from 'react-icons/md';
import IconButton from './Icon';

type props = { classes?: string };

export default function Input({ classes }: props) {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [isInputActive, setInputActive] = useState(false);
	useEscape(() => setInputActive(false));
	useClickOutside<HTMLFormElement>(formRef, () => setInputActive(false));
	return (
		<div className='flex justify-center py-12'>
			<motion.div
				className={`
				transition-all duration-150 ease-in-out
				${isInputActive ? 'border-2 border-border' : 'border'}
				relative w-3/5
				h-fit rounded-(--radius)
                ${classes}
             `}
			>
				<form
					ref={formRef}
					className='flex flex-col
				*:h-12 *:outline-0 *:border-0 *:px-2 *:py-2 text-foreground
				'
					onFocus={() => setInputActive(true)}
				>
					{isInputActive && (
						<input
							className={`
								text-2xl
								
						
						`}
							placeholder='Title...'
						/>
					)}
					<input className={` `} placeholder='Take a note...' />
					<IconButton classes='absolute right-0 top-1/2 -translate-y-1/2'>
						<MdImage />
						<p>test</p>
					</IconButton>
				</form>
			</motion.div>
		</div>
	);
}
