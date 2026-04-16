import { motion } from 'motion/react';
import { FaTrash } from 'react-icons/fa6';
import IconButton from './IconButton';
type Props = {
	src: string;
	onDelete?: () => void;
};

export default function ImagePreview({ onDelete, src }: Props) {
	return (
		<motion.div
			layout
			exit={{ opacity: 0, scale: 0.96 }}
			className='relative grow basis-[25%] aspect-square overflow-clip'
		>
			<img src={src} alt='' className='w-full h-full object-cover rounded-(--radius)' />

			<IconButton
				onClick={onDelete}
				hoverBackground='bg-muted'
				classes=' absolute z-10 bottom-0 right-0 p-2 '
			>
				<FaTrash className='fill-foreground' />
			</IconButton>
		</motion.div>
	);
}
