import { useState } from "react";
import type { BlogEntry } from "../types/Project";
import Swal from "sweetalert2";


interface ProjectBlogProps {
    blogEntries?: BlogEntry[];
    onUpdateBlogEntries: (entries : BlogEntry[]) => void;
}

function ProjectBlog({ blogEntries, onUpdateBlogEntries }: ProjectBlogProps) {
    const [ isWriting, setIsWriting ] = useState(false);
    const [ currentEntry, setCurrentEntry ] = useState<BlogEntry | null>(null);
    const [ newEntry, setNewEntry ] = useState({
        title: "",
        content: "",
        timeSpent: 0,
        tags: [] as string[],
    });

    const todayFormatted = new Date().toISOString().split("T")[0];
    const todayEntries = blogEntries.filter(entry => entry.date === todayFormatted);
    const hasEntryToday = todayEntries.length > 0;

    const handleSaveEntry = () => {
        if (!newEntry.title.trim() || !newEntry.content.trim()) {
            Swal.fire("Error", "Título y contenido son obligatorios", "error");
            return;
        }

        const entry : BlogEntry = {
            id : crypto.randomUUID(),
            title: newEntry.title,
            content: newEntry.content,
            timeSpent: newEntry.timeSpent,
            tags: newEntry.tags,
            date: todayFormatted,
            createdAt: new Date().toISOString(),
        };
        onUpdateBlogEntries([...blogEntries, entry]);

        setNewEntry({
            title: "",
            content: "",
            timeSpent: 0,
            tags: [],
        });
        setIsWriting(false);

        Swal.fire({
            title: '¡Entrada guardada!',
            text: 'Tu registro diario ha sido guardado',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
    }

    const getDaysWithoutActivity = () => {
        if (!blogEntries.length) return 0;

        const lastEntry = blogEntries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

        const lastDate = new Date(lastEntry.createdAt);
        const today = new Date();

        const diffTime = Math.abs(today.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
    }

    const daysWithoutActivity = getDaysWithoutActivity();

    return (
        <div>
            hola
        </div>
    )

}

export default ProjectBlog;