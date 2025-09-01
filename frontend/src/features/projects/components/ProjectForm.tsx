import { useEffect, useState } from "react";
import type { Project } from "../../../shared";
import { useNotification } from "../../../shared";

interface ProjectFormProps {
  editingProject?: Project | null;
  onSave: (projectData: Omit<Project, 'id' | 'createdAt' | 'lastActivityDate'>) => void;
  onCancel: () => void;
}

function ProjectForm({ editingProject, onSave, onCancel }: ProjectFormProps) {
  const {notifyInfo} = useNotification();

  const [formData, setFormData] = useState({
    name: editingProject?.name || '',
    stack: editingProject?.stack || [],
    requirements: editingProject?.requirements || [],
    dependencies: editingProject?.dependencies || [],
    tags: editingProject?.tags || []
  });

  useEffect(() => {
    setFormData({
      name: editingProject?.name || '',
      stack: editingProject?.stack || [],
      requirements: editingProject?.requirements || [],
      dependencies: editingProject?.dependencies || [],
      tags: editingProject?.tags || []
    });
  }, [editingProject]);

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      notifyInfo('El nombre del proyecto es obligatorio');
      return;
    }

    onSave(formData);
    
    if (!editingProject) {
      setFormData({
        name: '',
        stack: [],
        requirements: [],
        dependencies: [],
        tags: []
      });
    }
  };

  const isEditing = !!editingProject;

  return (
    <form onSubmit={handleSubmit}>
      <h3>{isEditing ? 'Edit Project' : 'Add Project'}</h3>
      
      <input
        type="text"
        value={formData.name}
        placeholder="Project Name"
        onChange={e => updateField('name', e.target.value)}
        required
      />
      
      <input
        type="text"
        placeholder="Stack (comma separated)"
        value={formData.stack.join(', ')}
        onChange={e => updateField('stack', 
          e.target.value.split(',').map(item => item.trim()).filter(Boolean)
        )}
      />
      
      <input
        type="text"
        placeholder="Requirements (comma separated)"
        value={formData.requirements.join(', ')}
        onChange={e => updateField('requirements', 
          e.target.value.split(',').map(item => item.trim()).filter(Boolean)
        )}
      />
      
      <input
        type="text"
        placeholder="Dependencies (comma separated)"
        value={formData.dependencies.join(', ')}
        onChange={e => updateField('dependencies', 
          e.target.value.split(',').map(item => item.trim()).filter(Boolean)
        )}
      />
      
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={formData.tags.join(', ')}
        onChange={e => updateField('tags', 
          e.target.value.split(',').map(item => item.trim()).filter(Boolean)
        )}
      />
      
      <div>
        <button type="submit">
          {isEditing ? 'Update Project' : 'Add Project'}
        </button>
        
        {isEditing && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProjectForm;
