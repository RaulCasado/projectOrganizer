import { useState } from 'react';
import Swal from 'sweetalert2';

interface MVPSectionProps {
    mvp?: string;
    onUpdateMVP: (mvp: string) => void;
}

function MVPSection({ mvp, onUpdateMVP }: MVPSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [mvpText, setMvpText] = useState(mvp || '');

    const handleSave = async () => {
        if (!mvpText.trim()) {
            Swal.fire({
                title: 'MVP vacío',
                text: 'Por favor, define tu MVP antes de guardar',
                icon: 'warning'
            });
            return;
        }

        onUpdateMVP(mvpText.trim());
        setIsEditing(false);
        
        Swal.fire({
            title: '¡MVP actualizado!',
            text: 'Tu definición de MVP ha sido guardada exitosamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
    };

    const handleCancel = () => {
        setMvpText(mvp || '');
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div>
                <h3>🎯 Definir MVP (Minimum Viable Product)</h3>

                <textarea
                    value={mvpText}
                    onChange={e => setMvpText(e.target.value)}
                    placeholder="Define tu MVP aquí... ¿Cuál es la versión más simple de tu producto que aporte valor?"
                />
                
                <div>
                    <button onClick={handleSave}>
                        💾 Guardar MVP
                    </button>
                    <button onClick={handleCancel}>
                        ❌ Cancelar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div>
                <h3>🎯 MVP Definition</h3>
                <button onClick={() => setIsEditing(true)}>
                    {mvp ? '✏️ Editar MVP' : '➕ Definir MVP'}
                </button>
            </div>

            {mvp ? (
                <div>
                    <pre>
                        {mvp}
                    </pre>
                </div>
            ) : (
                <p>
                    ⚠️ Aún no has definido el MVP para este proyecto. 
                    <br />
                    <strong>Tip:</strong> El MVP te ayudará a enfocarte en las funcionalidades esenciales.
                </p>
            )}
        </div>
    );
}

export default MVPSection;
