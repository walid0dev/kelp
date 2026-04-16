import useNoteStore from "../store/noteStore"
import Note from './Note';
type props = {
    layout?: 'list' | 'grid'
};
export default function NotesLayout({ layout = "list"}: props){
    const notes = useNoteStore((s)=>s.notes)
    return (
        <div className={` flex  justify-center`}>
            <div className={`w-3/5`}>
                {notes.map((note)=>(
                <Note note={note} key={note.id}/>
            ))}
            </div>
        </div>
    );
}