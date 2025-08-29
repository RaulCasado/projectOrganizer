import { useState } from "react";
import type { BlogEntry } from '../../../shared/types';
import BlogForm from './BlogForm';
import BlogList from "./BlogList";
import Swal from "sweetalert2";
import BlogDetail from "./BlogDetail";
import Modal from '../../../shared/components/Modal';
import { DateUtils } from "../../../shared";

interface ProjectBlogProps {
    blogEntries?: BlogEntry[];
    onUpdateBlogEntries: (entries: BlogEntry[]) => void;
    project?: { name: string };
}

function ProjectBlog({ blogEntries = [], onUpdateBlogEntries, project }: ProjectBlogProps) {
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
                createdAt: DateUtils.timestampNow(),
            };
            onUpdateBlogEntries([...blogEntries, newEntry]);
        }
        setIsWriting(false);
        setEditingEntry(null);
    };

    const handleExportWeek = () => {
        const getLastWeekEntries = () => {
            const lastWeekEntries = DateUtils.filterRecentDays(blogEntries, 7, 'date');
            return DateUtils.sortByDate(lastWeekEntries, 'date', 'asc');
        };

        const generateMarkdown = () => {
            const weekEntries = getLastWeekEntries();
            
            if (weekEntries.length === 0) {
                Swal.fire('Sin entradas', 'No hay entradas en los últimos 7 días', 'info');
                return;
            }

            const weekRange = DateUtils.getWeekRange();
            
            const totalTime = weekEntries.reduce((sum, entry) => sum + (entry.timeSpent || 0), 0);
            const allTags = weekEntries.flatMap(entry => entry.tags || []);
            const uniqueTags = [...new Set(allTags)];
            
            let markdown = `# Progreso Semanal - ${project?.name || 'Proyecto'}\n`;
            markdown += `**Semana del ${DateUtils.formatShort(weekRange.start)} al ${DateUtils.formatShort(weekRange.end)}**\n\n`;
            
            markdown += `## 📊 Resumen\n`;
            markdown += `- Total de entradas: ${weekEntries.length}\n`;
            markdown += `- Tiempo invertido: ${totalTime} minutos (${Math.round(totalTime / 60 * 10) / 10} horas)\n`;
            if (uniqueTags.length > 0) {
                markdown += `- Tags utilizados: ${uniqueTags.join(', ')}\n`;
            }
            markdown += `\n`;
            
            markdown += `## 📝 Entradas diarias\n\n`;
            
            weekEntries.forEach(entry => {
                const dayName = DateUtils.formatWeekday(entry.date);
                const dateFormatted = DateUtils.formatShort(entry.date);
                
                markdown += `### ${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${dateFormatted}\n`;
                markdown += `**${entry.title}**\n\n`;
                markdown += `${entry.content}\n\n`;
                
                if (entry.timeSpent && entry.timeSpent > 0) {
                    markdown += `- ⏱️ Tiempo invertido: ${entry.timeSpent} minutos\n`;
                }
                
                if (entry.tags && entry.tags.length > 0) {
                    markdown += `- 🏷️ Tags: ${entry.tags.join(', ')}\n`;
                }
                
                markdown += `\n---\n\n`;
            });
            
            return markdown;
        };

        const markdown = generateMarkdown();
        if (!markdown) return;

        navigator.clipboard.writeText(markdown).then(() => {
            Swal.fire({
                title: '📤 ¡Exportado!',
                text: 'El resumen semanal se ha copiado al portapapeles',
                icon: 'success',
                showConfirmButton: true,
                confirmButtonText: 'Ver preview',
                showCancelButton: true,
                cancelButtonText: 'Cerrar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Preview del Markdown',
                        html: `<pre style="text-align: left; max-height: 400px; overflow-y: auto;">${markdown}</pre>`,
                        width: '80%',
                        confirmButtonText: 'Cerrar'
                    });
                }
            });
        }).catch(() => {
            Swal.fire({
                title: 'Markdown generado',
                html: `<textarea readonly style="width: 100%; height: 400px;">${markdown}</textarea>`,
                width: '80%',
                confirmButtonText: 'Cerrar'
            });
        });
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
            <div>
                <h3>📝 Diario del Proyecto</h3>
                
                <div>
                    {blogEntries.length > 0 && (
                        <button 
                            onClick={handleExportWeek}
                        >
                            📤 Exportar semana
                        </button>
                    )}
                    
                    {!isWriting && (
                        <button 
                            onClick={() => setIsWriting(true)}
                        >
                            ➕ Nueva Entrada
                        </button>
                    )}
                </div>
            </div>
            
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
