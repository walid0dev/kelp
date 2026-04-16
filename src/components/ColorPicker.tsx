import { MdPalette } from 'react-icons/md';
import IconButton from './IconButton';
import useFormStore, { type Color } from './formStore';
import { COLOR_OPTIONS } from './formStore';
import { useRef, useState } from 'react';
export default function ColorPicker() {
	const [isOpen, setOpen] = useState(false);
	const pickerRef = useRef(null);
	return (
		<div className='relative' ref={pickerRef}>
			<IconButton type='button' onClick={() => setOpen(!isOpen)}>
				<MdPalette className='text-current' />
			</IconButton>
			{isOpen && (
				<div className='bg-popover h-12 w-fit absolute flex gap-x-2 items-center top-10 rounded-(--radius) px-2 '>
					{COLOR_OPTIONS.map((color) => (
						<ColorOption color={color} key={color.hex} />
					))}
				</div>
			)}
		</div>
	);
}

type ColorOptionProps = {
	color: Color;
};
function ColorOption({ color }: ColorOptionProps) {
	const { setBackgroundColor, backgroundColor } = useFormStore();
	const handleClick = () => {
		setBackgroundColor(color);
	};
	return (
		<button
			type='button'
			title={color.label}
			style={{ backgroundColor: color.hex }}
			className={`
				size-8 rounded-full cursor-pointer hover:scale-110 transition-[scale] duration-200 ease-out  active:scale-100
				${backgroundColor === color ? 'outline-4 outline-primary' : ''}
				`}
			onClick={handleClick}
		></button>
	);
}
