import ImagePreview from "../components/ImagePreview";
import type { Note as NoteType} from "../store/noteStore";
import {motion , AnimatePresence} from "motion/react"
type props = {
    note: NoteType
};

export default function Note({ note }: props) {
    const {body , color , title , createdAt ,  images ,isUpdated , updatedAt} = note
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <AnimatePresence initial={false} mode='popLayout'>
					<motion.div layout className='flex flex-wrap gap-1 overflow-clip '>
						{images?.map((img , idx) => (
							<ImagePreview
								src={img}
								key={idx}
							/>
						))}
					</motion.div>
				</AnimatePresence>
        </motion.article>
    )
}
