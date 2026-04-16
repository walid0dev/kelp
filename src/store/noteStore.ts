import {create} from "zustand"
import { genId } from "../utils/id";
export interface Note {
    id?: string;
    title: string;
    body: string;
    color: string;
    images?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    isUpdated?: boolean;
}

export class Note implements Note {
    constructor(title: string, body: string, color: string, images?: string[]) {
        this.id = genId();
        this.title = title;
        this.body = body;
        this.color = color;
        this.images = images;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.isUpdated = false;
    }
}

interface noteStore {
    notes: Note[];
    addNote: (note: Note) => void;
    deleteNote: (id: string) => void;
    updateNote: (updatedNote: Note) => void;
}

const useNoteStore = create<noteStore>((set) => ({
    notes: [],
    addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
    deleteNote: (id) => set((state) => ({ notes: state.notes.filter(note => note.id !== id) })),
    updateNote: (updatedNote) => set((state) => ({
        notes: state.notes.map(note => note.id === updatedNote.id ? updatedNote : note)
    })),
}));
export default useNoteStore;