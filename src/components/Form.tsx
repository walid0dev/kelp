import { motion, AnimatePresence } from 'motion/react';
import { useRef, type ChangeEvent } from 'react';
import useEscape from '../hooks/useEscape';
import useClickOutside from '../hooks/useClickOutside';
import { MdImage } from 'react-icons/md';
import IconButton from './IconButton';
import useFormStore from './formStore';
import ColorPicker from './ColorPicker';
import { getReadableForeground } from '../utils/contrast';
import ImagePreview from './ImagePreview';
import useNoteStore , {Note} from '../store/noteStore';
import type { SubmitEventHandler } from 'react'; 
type props = { classes?: string };

export default function Form({ classes }: props) {
	const formRef = useRef<HTMLFormElement | null>(null);
	const formContainerRef = useRef<HTMLDivElement | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const addNote = useNoteStore((s)=>s.addNote)
	const {
		status,
		setStatus,
		clearForm,
		backgroundColor,
		addImages,
		imagesPreviews,
		clearImage,
	} = useFormStore((state) => state);
	const textColor = getReadableForeground(backgroundColor.hex);

	const handleImgUpload = (ev: ChangeEvent<HTMLInputElement>) => {
		addImages(ev.target.files!);
	};

	const onSubmit : SubmitEventHandler =  (ev) => {
		ev.preventDefault();
		const formData = new FormData(formRef.current!)
		const title = formData.get("title")?.toString()!
		const body = formData.get("body")?.toString()!
		const color = backgroundColor.hex
		const images = imagesPreviews.map(i=>i.data)
		if(!title && !body && images.length===0) {
			clearForm(formRef)
			return setStatus("idle")
				
		}
		const note = new Note(title , body  , color , images )
		addNote(note)
		clearForm(formRef)
		setStatus("idle")
	}

	useClickOutside(formContainerRef ,()=>formRef.current?.requestSubmit() )
	useEscape(()=>formRef.current?.requestSubmit())

	return (
		<div ref={formContainerRef} className='flex justify-center py-12'>
			<motion.div
				className={`
				transition-all duration-150 ease-in-out
				border shadow-2xl shadow-secondary-foreground
				relative w-3/5
				h-fit rounded-(--radius)

                ${classes}
             `}
				style={{
					backgroundColor: backgroundColor.hex,
					color: textColor,
				}}
			>
				<AnimatePresence initial={false} mode='popLayout'>
					<motion.div layout className='flex flex-wrap gap-1 overflow-clip '>
						{imagesPreviews.map(({ data, id }) => (
							<ImagePreview
								src={data}
								key={id}
								onDelete={() => clearImage(id)}
							/>
						))}
					</motion.div>
				</AnimatePresence>
				<motion.form
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					ref={formRef}
					onSubmit={onSubmit}
					className='flex flex-col
						*:h-12 *:outline-0 *:border-0 *:px-2 *:py-2
						*:text-current *:placeholder:opacity-70
				'
					onFocus={() => setStatus('focused')}
				>
					{status === 'focused' && (
						<motion.input
							placeholder='Title...'
							className='text-2xl'
							name='title'
						/>
					)}
					<motion.input name='body' placeholder='Take a note...' />

					{status === 'idle' && (
						<div className='absolute right-0 top-0'>
							<input
								ref={fileInputRef}
								type='file'
								accept='.png, .jpg, .jpeg'
								className='hidden h-0 w-0'
								name='image'
							/>
							<IconButton
								onClick={() => fileInputRef.current?.click()}
							>
								<MdImage />
							</IconButton>
						</div>
					)}

					{status === 'focused' && (
						<AnimatePresence initial={false} >
							<motion.div
								
								className='flex gap-x-4'
							>
								<div>
									<input
										onChange={handleImgUpload}
										ref={fileInputRef}
										type='file'
										accept='.png, .jpg, .jpeg'
										className='hidden h-0 w-0'
										name='image'
									/>
									<IconButton
										type='button'
										onClick={() =>
											fileInputRef.current?.click()
										}
									>
										<MdImage />
									</IconButton>
								</div>

								<ColorPicker />
							</motion.div>
						</AnimatePresence>
					)}
				</motion.form>
			</motion.div>
		</div>
	);
}
