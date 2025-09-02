export type Task = {
    id : string;
    title : string;
    description? : string;
    completed : boolean;
    createdAt : string;
    updatedAt? : string;
    completedAt? : string;
    priority : 'low' | 'medium' | 'high';
}

export type TaskFormData = {
    title : string;
    description : string;
    priority: 'low' | 'medium' | 'high';
    completed : boolean;
}