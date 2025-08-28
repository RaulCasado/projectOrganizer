export const SKETCH_CONFIG = {
    canvas: {
        defaultWidth: 400,
        defaultHeight: 300,
        maxWidth: 800,
        maxHeight: 600
    },
    storage: {
        maxSketchesPerProject: 5,
        maxFreeSketches: 10,
        compressionQuality: 0.6,
        storagePrefix: 'quick_sketch_'
    },
    export: {
        defaultFormat: 'image/jpeg' as const,
        defaultQuality: 0.8
    }
} as const;

export type SketchConfig = typeof SKETCH_CONFIG;
