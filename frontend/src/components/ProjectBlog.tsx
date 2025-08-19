import { useState } from "react";
import type { BlogEntry } from "../types/Project";
import BlogForm from './BlogForm';
import BlogList from "./BlogList";
import Swal from "sweetalert2";
import BlogDetail from "./BlogDetail";
import Modal from './Modal'

interface ProjectBlogProps {
    blogEntries?: BlogEntry[];
    onUpdateBlogEntries: (entries : BlogEntry[]) => void;
}

function ProjectBlog({ blogEntries = [], onUpdateBlogEntries }: ProjectBlogProps) {
    const [isWriting, setIsWriting] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<BlogEntry | null>(null);
    const [editingEntry, setEditingEntry] = useState<BlogEntry | null>(null);

    const handleSaveEntry = (entryData: Omit<BlogEntry, 'id' | 'createdAt'>) => {
        if (editingEntry) {
            const updatedEntry: BlogEntry = {
                ...editingEntry,
                ...entryData,
            };
            const updatedEntries = blogEntries.map(entry => 
                entry.id === editingEntry.id ? updatedEntry : entry
            );
            onUpdateBlogEntries(updatedEntries);
        } else {
            const newEntry: BlogEntry = {
                id: crypto.randomUUID(),
                ...entryData,
                createdAt: new Date().toISOString(),
            };
            onUpdateBlogEntries([...blogEntries, newEntry]);
        }
        setIsWriting(false);
        setEditingEntry(null);
    };

    const handleViewEntry = (entry: BlogEntry) => {
        setSelectedEntry(entry);
    };

    const handleEditEntry = (entry: BlogEntry) => {
        setEditingEntry(entry);
        setSelectedEntry(null);
        setIsWriting(true);
    };

    const handleDeleteEntry = async (entryId: string) => {
        const entry = blogEntries.find(e => e.id === entryId);
        if (!entry) return;

        const result = await Swal.fire({
            title: '¿Eliminar entrada?',
            text: `¿Seguro que quieres eliminar "${entry.title}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#dc3545'
        });

        if (result.isConfirmed) {
            onUpdateBlogEntries(blogEntries.filter(e => e.id !== entryId));
            setSelectedEntry(null);
            Swal.fire({
                title: '¡Eliminada!',
                text: 'La entrada ha sido eliminada',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        }
    };

    return (
        <div>
            {!isWriting && (
                <button onClick={() => setIsWriting(true)}>Escribir nueva entrada</button>
            )}
            {isWriting && (
                <BlogForm 
                    onSave={handleSaveEntry}
                    onCancel={() => {
                        setIsWriting(false);
                        setEditingEntry(null);
                    }}
                    editingEntry={editingEntry}
                />
            )}

            <BlogList 
                entries={blogEntries}
                onViewEntry={handleViewEntry}
                onEditEntry={handleEditEntry}
                onDeleteEntry={handleDeleteEntry}
            />

            <Modal 
                isOpen={selectedEntry !== null}
                onClose={() => setSelectedEntry(null)}
                title="Entrada del diario"
            >
                {selectedEntry && (
                    <BlogDetail 
                        entry={selectedEntry}
                        onEdit={() => handleEditEntry(selectedEntry)}
                        onDelete={() => handleDeleteEntry(selectedEntry.id)}
                    />
                )}
            </Modal>
        </div>
    );
}

export default ProjectBlog;
