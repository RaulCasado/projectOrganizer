import type { QuickSketch, SketchStorageInfo } from '../types';
import { SKETCH_CONFIG } from '../config/sketchConfig';

class SketchStorageService {
    private readonly config = SKETCH_CONFIG.storage;

    saveSketch(canvas: HTMLCanvasElement, metadata: Omit<QuickSketch, 'id' | 'imageData' | 'createdAt' | 'updatedAt' | 'lastAccessed' | 'metadata'>): QuickSketch | null {
        try {
            if (metadata.projectId) {
                const projectSketches = this.getSketchesByProject(metadata.projectId);
                if (projectSketches.length >= this.config.maxSketchesPerProject) {
                    throw new Error(`Máximo ${this.config.maxSketchesPerProject} sketches por proyecto`);
                }
            }
            const freeSketches = this.getFreeSketches();
            if (!metadata.projectId && freeSketches.length >= this.config.maxFreeSketches) {
                throw new Error(`Máximo ${this.config.maxFreeSketches} sketches libres permitidos`);
            }

            const imageData = canvas.toDataURL('image/jpeg', this.config.compressionQuality);
            const estimatedSize = this.calculateSize(imageData);

            const sketch: QuickSketch = {
                id: crypto.randomUUID(),
                imageData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                lastAccessed: new Date().toISOString(),
                metadata: {
                    width: canvas.width,
                    height: canvas.height,
                    tools: [],
                    estimatedSize
                },
                ...metadata
            };

            localStorage.setItem(`${this.config.storagePrefix}${sketch.id}`, JSON.stringify(sketch));

            return sketch;
        } catch (error) {
            console.error('Error guardando sketch:', error);
            return null;
        }
    }

    getSketch(id: string): QuickSketch | null {
        try {
            const stored = localStorage.getItem(`${this.config.storagePrefix}${id}`);
            if (stored) {
                const sketch = JSON.parse(stored) as QuickSketch;
                sketch.lastAccessed = new Date().toISOString();
                localStorage.setItem(`${this.config.storagePrefix}${id}`, JSON.stringify(sketch));
                return sketch;
            }
            return null;
        } catch (error) {
            console.error('Error cargando sketch:', error);
            return null;
        }
    }

    getSketchesByProject(projectId: string): QuickSketch[] {
        const allSketches = this.getAllSketches();
        return allSketches.filter(sketch => sketch.projectId === projectId);
    }

    getFreeSketches(): QuickSketch[] {
        const allSketches = this.getAllSketches();
        return allSketches.filter(sketch => !sketch.projectId);
    }

        getAllSketches(): QuickSketch[] {
                const sketches: QuickSketch[] = [];
                
                const sketchKeys = Object.keys(localStorage).filter(key => 
                        key.startsWith(this.config.storagePrefix)
                );
                
                for (const key of sketchKeys) {
                        try {
                                const sketchData = localStorage.getItem(key);
                                if (sketchData) {
                                        const sketch = JSON.parse(sketchData) as QuickSketch;
                                        sketches.push(sketch);
                                }
                        } catch (error) {
                                console.error('Error parsing sketch:', key, error);
                                localStorage.removeItem(key);
                        }
                }
                
                return sketches.sort((a, b) => 
                        new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
                );
        }

    deleteSketch(id: string): boolean {
        try {
            localStorage.removeItem(`${this.config.storagePrefix}${id}`);
            return true;
        } catch (error) {
            console.error('Error eliminando sketch:', error);
            return false;
        }
    }

    getStorageInfo(): SketchStorageInfo {
        const allSketches = this.getAllSketches();
        const usedStorage = allSketches.reduce((total, sketch) => total + sketch.metadata.estimatedSize, 0);
        
        const sketchesByProject: Record<string, number> = {};
        allSketches.forEach(sketch => {
            if (sketch.projectId) {
                sketchesByProject[sketch.projectId] = (sketchesByProject[sketch.projectId] || 0) + 1;
            }
        });

        return {
            totalSketches: allSketches.length,
            usedStorage,
            estimatedStorage: usedStorage,
            sketchesByProject
        };
    }

    autoCleanup(projectId?: string): number {
        const sketches = projectId 
            ? this.getSketchesByProject(projectId)
            : this.getAllSketches();

        const maxSketches = projectId 
            ? this.config.maxSketchesPerProject
            : this.config.maxFreeSketches;

        if (sketches.length <= maxSketches) {
            return 0;
        }

        const sortedSketches = sketches.sort((a, b) => 
            new Date(a.lastAccessed).getTime() - new Date(b.lastAccessed).getTime()
        );

        const toDelete = sortedSketches.slice(0, sketches.length - maxSketches);
        let deleted = 0;
        
        toDelete.forEach(sketch => {
            if (this.deleteSketch(sketch.id)) {
                deleted++;
            }
        });

        return deleted;
    }

    exportSketch(id: string): void {
        const sketch = this.getSketch(id);
        if (sketch) {
            const link = document.createElement('a');
            link.download = `${sketch.name || 'sketch'}_${sketch.id}.jpg`;
            link.href = sketch.imageData;
            link.click();
        }
    }

    private calculateSize(base64String: string): number {
        return Math.round((base64String.length * 3) / 4);
    }
}

export default new SketchStorageService();
