import type { ReactNode, ComponentProps } from 'react';
type Props = {
	classes?: string;
	hoverBackground?: string;
	children?: ReactNode;
	type?:string
} & ComponentProps<'button'>;

export default function IconButton({
	classes,
	children,
	hoverBackground,
	type="button",
	...rest
}: Props) {
	return (
		<>
			<div className={`
        		${classes}
        
        		`}>
				<button
					type={type || "button"
	
					}
					className='relative size-8 rounded-(--radius)  border-0 outline-0  flex items-center justify-center group cursor-pointer active:scale-95   '
					{...rest}
				>
					<span className='z-2 *:size-6'>{children}</span>
					<span
						className={`absolute w-full ${hoverBackground ? hoverBackground : 'bg-foreground/30'} h-full z-0 rounded-(--radius) scale-0 group-hover:scale-100 origin-center transition-all duration-150 ease-out`}
					></span>
				</button>
			</div>
		</>
	);
}
