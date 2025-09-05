import { useState, useEffect } from 'react';
import { useNotification, TagInput , DateUtils} from '../../../shared';
import type  { BlogEntry } from '../../../shared';

interface BlogFormProps {
    onSave: (entry: Omit<BlogEntry, 'id' | 'createdAt'>) => void;
    onCancel: () => void;
    editingEntry: BlogEntry | null;
}

function BlogForm({ onSave, onCancel, editingEntry }: BlogFormProps) {
    const isEditing = !!editingEntry;
    const todayFormatted = DateUtils.dateToday();
    const { notifySuccess, notifyError } = useNotification();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        timeSpent: 0,
        tags: [] as string[],
        date: todayFormatted,
    });

    useEffect(() => {
        if (editingEntry) {
            setFormData({
                title: editingEntry.title || "",
                content: editingEntry.content || "",
                timeSpent: editingEntry.timeSpent || 0,
                tags: editingEntry.tags || [],
                date : editingEntry.date || todayFormatted,
            });
        } else {
            setFormData({
                title: "",
                content: "",
                timeSpent: 0,
                tags: [],
                date: todayFormatted,
            });
        }
    }, [editingEntry, todayFormatted]);

    const handleSave = () => {
        if (!formData.title.trim() || !formData.content.trim()) {
            notifyError("Título y contenido son obligatorios");
            return;
        }

        const entryData = {
            title: formData.title.trim(),
            content: formData.content.trim(),
            timeSpent: formData.timeSpent,
            tags: formData.tags,
            date: formData.date,
        };

        onSave(entryData);

        if (!isEditing) {
            setFormData({
                title: "",
                content: "",
                timeSpent: 0,
                tags: [],
                date: todayFormatted,
            });
        }
        notifySuccess(`Tu registro diario ha sido ${isEditing ? 'actualizado' : 'guardado'}`);
    };

    return (
        <div>
            <h4>{isEditing ? 'Editar' : 'Nueva'} entrada - {DateUtils.formatShort(DateUtils.timestampNow())}</h4>
            <div>
                <input
                    type="text"
                    placeholder="Título de la entrada"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
            </div>
            <div>
                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
            </div>
            <div>
                <textarea
                    placeholder="Contenido (soporta Markdown)"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
            </div>
            
            <div>
                <input
                    type="number"
                    placeholder="Tiempo invertido (minutos)"
                    value={formData.timeSpent}
                    onChange={(e) => setFormData({ ...formData, timeSpent: Number(e.target.value) })}
                />
                
                <TagInput
                    value={formData.tags}
                    onChange={(tags) => setFormData({ ...formData, tags })}
                    placeholder="Tags: bug-fix, feature, learning"
                />
            </div>
            
            <div>
                <button onClick={handleSave}>
                    {isEditing ? 'Actualizar entrada' : 'Guardar entrada'}
                </button>
                
                <button onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default BlogForm;
