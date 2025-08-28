export interface QuickSketch {
    id : string;
    name : string;
    description? : string;
    projectId? : string;
    imageData : string; // Base64 string
    createdAt : string; // could be a date but for now lets keep it as string
    updatedAt : string; // could be a date but for now lets keep it as string
    lastAccessed: string;
    metadata : {
        width: number;
        height: number;
        tools : SketchTool[];
        estimatedSize : number;
    };
    links : {
        linkedTasks: string[]; // array of task IDs
        linkedIdeas: string[]; // array of idea IDs
        mentionedInBlog: string[]; // array of blog entry IDs
    };
}

export type SketchTool = 'pen' | 'eraser' | 'rectangle' | 'circle' | 'line' | 'text';

export interface SketchStorageInfo {
  totalSketches: number;
  usedStorage: number; // total bytes used
  estimatedStorage: number;
  sketchesByProject: Record<string, number>;
}