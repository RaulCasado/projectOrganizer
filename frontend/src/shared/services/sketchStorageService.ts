import type { QuickSketch, SketchStorageInfo } from '../types';
import { SKETCH_CONFIG } from '../config/sketchConfig';
import { DateUtils } from '../utils';
import { LocalStorageService } from './localStorageService';

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

            const now = DateUtils.timestampNow();
            const sketch: QuickSketch = {
                id: crypto.randomUUID(),
                imageData,
                createdAt: now,
                updatedAt: now,
                lastAccessed: now,
                metadata: {
                    width: canvas.width,
                    height: canvas.height,
                    tools: [],
                    estimatedSize
                },
                ...metadata
            };

            LocalStorageService.set(`${this.config.storagePrefix}${sketch.id}`, sketch);

            return sketch;
        } catch (error) {
            console.error('Error guardando sketch:', error);
            return null;
        }
    }

    getSketch(id: string): QuickSketch | null {
        try {
            const sketch = LocalStorageService.get<QuickSketch | null>(`${this.config.storagePrefix}${id}`, null);
            if (sketch) {
                sketch.lastAccessed = DateUtils.timestampNow();
                LocalStorageService.set(`${this.config.storagePrefix}${id}`, sketch);
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
                
                const sketchKeys = LocalStorageService.getKeysWithPrefix(this.config.storagePrefix);
                
                for (const key of sketchKeys) {
                        try {
                                const sketchData = LocalStorageService.getRawItem(key);
                                if (sketchData) {
                                        const sketch = JSON.parse(sketchData) as QuickSketch;
                                        sketches.push(sketch);
                                }
                        } catch (error) {
                                console.error('Error parsing sketch:', key, error);
                                LocalStorageService.remove(key);
                        }
                }

                return DateUtils.sortByDate(sketches, 'lastAccessed', 'desc');
        }

    deleteSketch(id: string): boolean {
        try {
            LocalStorageService.remove(`${this.config.storagePrefix}${id}`);
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

        const sortedSketches = DateUtils.sortByDate(sketches, 'lastAccessed', 'asc');

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
