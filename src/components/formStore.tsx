import { create } from 'zustand';
import { genId } from '../utils/id';

export type Color = { hex: string  , label: string };

export const COLOR_OPTIONS: Color[] = [
	{ hex: 'transparent', label: 'Default' },
	{ hex: 'oklch(0.78 0.12 20)', label: 'Coral' },
	{ hex: 'oklch(0.83 0.09 50)', label: 'Peach' },
	{ hex: 'oklch(0.86 0.07 90)', label: 'Sand' },
	{ hex: 'oklch(0.84 0.09 140)', label: 'Mint' },
	{ hex: 'oklch(0.80 0.07 170)', label: 'Sage' },
	{ hex: 'oklch(0.82 0.05 210)', label: 'Fog' },
	{ hex: 'oklch(0.76 0.08 250)', label: 'Storm' },
	{ hex: 'oklch(0.79 0.06 320)', label: 'Dust' }
];

type imagePreview = { id: string; data: string };
type Status=  'idle' | 'focused' ;
interface formStore {
	status : Status
	imagesPreviews: imagePreview[];
	backgroundColor: Color;
	setBackgroundColor: (color: Color) => void;
	addImages: (files: FileList) => void;
	clearImage: (id: string) => void;
	clearForm: (formRef: React.RefObject<HTMLFormElement | null>) => void;
	setStatus:(status:Status)=>void
}

const useFormStore = create<formStore>((set) => ({
	title: '',
	body: '',
	imagesPreviews: [],
	status: 'idle',
	backgroundColor: COLOR_OPTIONS[0],
	setStatus:(status)=>{
		set((state)=>({...state , status}))
	},
	addImages: (files) => {
		if (files.length === 0) return;
		const filesArray = Array.from(files);
		for (let file of filesArray) {
			set((state) => ({
				...state,
				imagesPreviews: [
					...state.imagesPreviews,
					{ id: genId(), data: URL.createObjectURL(file) },
				],
			}));
		}
	},
	clearImage: (id) => {
		set((state) => ({
			...state,
			imagesPreviews: state.imagesPreviews.filter((img) => img.id !== id),
		}));
	},
	clearForm: (formRef) => {
		set((state) => ({
			...state,
			title: '',
			body: '',
			imagesPreviews: [],
			status: 'idle',
			backgroundColor:COLOR_OPTIONS[0]
		}));
		if (formRef.current) {
			formRef.current.reset();
			formRef.current.querySelectorAll('input').forEach((input) => (input.blur()));
		}
	},


	setBackgroundColor:(color)=>{
		set((state)=>({...state , backgroundColor:color}))
	}

	
}));
export default useFormStore;
