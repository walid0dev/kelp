import type { ReactNode, ComponentProps } from 'react';
import { MdImage } from 'react-icons/md';
type props = {
	classes?: string;
	childern?: ReactNode;
	size?: 'sm';
} & ComponentProps<'button'>;

export default function IconButton({
	classes,
	childern,
	size,
	...rest
}: props) {
	return (
        
		<>
			<div
				className={`
        ${classes}
        
        `}
			>
				<button
					className='relative size-8 rounded-(--radius)  border-0 outline-0  flex items-center justify-center  '
					{...rest}
				>
					<span className='z-2 *:size-6'>
                        {childern}
					{!childern && <MdImage></MdImage>}
                    </span>
					<span className='absolute w-full bg-secondary h-full z-0 rounded-(--radius) scale-0'></span>
				</button>
			</div>
		</>
	);
}
