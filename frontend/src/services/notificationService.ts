import type { Project } from '../types/Project';

class NotificationService {
    static async requestPermission(): Promise<boolean> {
        if (!('Notification' in window)) {
            console.warn('Este navegador no soporta notificaciones');
            return false;
        }

        if (Notification.permission === 'granted') {
            return true;
        }

        if (Notification.permission === 'denied') {
            return false;
        }

        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }

    static sendNotification(title: string, body: string, options?: {
        icon?: string;
        badge?: string;
        tag?: string;
    }): void {
        if (!('Notification' in window) || Notification.permission !== 'granted') {
            return;
        }

        new Notification(title, {
            body,
            icon: options?.icon || '/favicon.ico',
            badge: options?.badge || '/favicon.ico',
            tag: options?.tag,
            requireInteraction: false,
        });
    }

    static shouldNotify(notificationType: string, frequency: 'daily' | 'weekly' = 'daily'): boolean {
        const now = new Date();
        const today = now.toDateString();
        const thisWeek = this.getWeekIdentifier(now);
        const timeIdentifier = (frequency === 'daily') ? today : thisWeek;

        const storageKey = `lastNotified_${notificationType}`;
        const lastNotified = localStorage.getItem(storageKey);

        const hasBeenNotified = lastNotified === timeIdentifier;

        if (!hasBeenNotified) {
            localStorage.setItem(storageKey, timeIdentifier);
        }
        
        return !hasBeenNotified;
    }

    private static getWeekIdentifier(date: Date): string {
        const year = date.getFullYear();
        const week = this.getWeekNumber(date);
        return `${year}-W${week}`;
    }

    private static getWeekNumber(date: Date): number {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    }

    static checkAbandonedProjects(projects: Project[]): void {
        if (!this.shouldNotify('abandoned', 'daily')) return;

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const abandoned = projects.filter(project =>
            project.lastActivityDate &&
            new Date(project.lastActivityDate) < sevenDaysAgo
        );

        if (abandoned.length > 0) {
            const projectNames = abandoned.map(p => p.name).join(', ');
            this.sendNotification(
                `😢 ${abandoned.length} proyectos te extrañan`,
                `Llevas más de 7 días sin trabajar en: ${projectNames}`,
                { tag: 'abandoned-projects' }
            );
        }
    }

    static checkPendingTasks(projects: Project[]): void {
        if (!this.shouldNotify('pendingTasks', 'weekly')) return;

        const allTasks = projects.flatMap(p => p.tasks || []);
        const pendingTasks = allTasks.filter(task => !task.completed);

        if (pendingTasks.length >= 5) {
            this.sendNotification(
                `📋 ¡${pendingTasks.length} tareas esperándote!`,
                'Tienes bastantes tareas acumuladas. ¿Qué tal si tachas algunas?',
                { tag: 'pending-tasks' }
            );
        }
    }

    static checkProjectsWithoutMVP(projects: Project[]): void {
        if (!this.shouldNotify('noMVP', 'weekly')) return;

        const withoutMVP = projects.filter(p => !p.mvp || p.mvp.trim() === '');

        if (withoutMVP.length > 0) {
            this.sendNotification(
                `🎯 ${withoutMVP.length} proyectos sin rumbo`,
                'Algunos proyectos no tienen MVP definido. ¡Define hacia dónde van!',
                { tag: 'no-mvp' }
            );
        }
    }

    static checkDailyBlog(projects: Project[]): void {
        const currentHour = new Date().getHours();

        if (currentHour < 18) return;

        if (!this.shouldNotify('dailyBlog', 'daily')) return;

        const today = new Date().toISOString().split('T')[0];
        const todayEntries = projects.flatMap(p => p.blogEntries || [])
            .filter(entry => entry.date === today);

        if (todayEntries.length === 0) {
            this.sendNotification(
                '📝 ¿Qué tal el día de hoy?',
                'Aún no has escrito nada en tu blog. ¡Cuenta qué has hecho!',
                { tag: 'daily-blog' }
            );
        }
    }

    static runAllChecks(projects: Project[]): void {
        this.checkAbandonedProjects(projects);
        this.checkPendingTasks(projects);
        this.checkProjectsWithoutMVP(projects);
        this.checkDailyBlog(projects);
    }

    static scheduleCheck(projects: Project[], delayMs: number = 5000): void {
        setTimeout(() => {
            this.runAllChecks(projects);
        }, delayMs);
    }

    static setupPeriodicChecks(projects: Project[]): () => void {
        const blogInterval = setInterval(() => {
            this.checkDailyBlog(projects);
        }, 30 * 60 * 1000);

        return () => {
            clearInterval(blogInterval);
        };
    }
}

export default NotificationService;
