import {
  format,
  parseISO,
  isValid,
  differenceInDays,
  subDays,
  startOfWeek,
  endOfWeek,
  isToday,
  getISOWeek,
} from 'date-fns';
import { es } from 'date-fns/locale';

export class DateUtils {
  private static locale = es;

  static timestampNow(): string {
    return new Date().toISOString();
  }

  static dateToday(): string {
    return format(new Date(), 'yyyy-MM-dd');
  }

  static toInputFormat(date: string | Date): string {
    const parsed = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsed) ? format(parsed, 'yyyy-MM-dd') : '';
  }

  static formatShort(date: string | Date): string {
    // "25/08/2024"
    const parsed = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsed)
      ? format(parsed, 'P', { locale: this.locale })
      : '---';
  }

  static formatMedium(date: string | Date): string {
    // "25 ago 2024"
    const parsed = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsed)
      ? format(parsed, 'PP', { locale: this.locale })
      : '---';
  }

  static formatLong(date: string | Date): string {
    // "25 de agosto de 2024"
    const parsed = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsed)
      ? format(parsed, 'PPP', { locale: this.locale })
      : '---';
  }

  static formatFull(date: string | Date): string {
    // "domingo, 25 de agosto de 2024"
    const parsed = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsed)
      ? format(parsed, 'PPPP', { locale: this.locale })
      : '---';
  }

  static formatTime(date: string | Date): string {
    // "14:30"
    const parsed = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsed)
      ? format(parsed, 'p', { locale: this.locale })
      : '---';
  }

  static formatDateTime(date: string | Date): string {
    // "25 ago 2024, 14:30"
    const parsed = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsed)
      ? format(parsed, 'Pp', { locale: this.locale })
      : '---';
  }

  static formatForUI(date: string | Date): string {
    return this.formatMedium(date);
  }

  static formatWeekday(date: string | Date): string {
    const parsed = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsed)
      ? format(parsed, 'EEEE', { locale: this.locale })
      : '---';
  }

  static getCurrentWeekId(): string {
    const now = new Date();
    const year = now.getFullYear();
    const week = getISOWeek(now);
    return `${year}-W${week.toString().padStart(2, '0')}`;
  }

  static daysSince(date: string | Date): number {
    const parsed = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(parsed)) return 0;
    return differenceInDays(new Date(), parsed);
  }

  static daysUntil(date: string | Date): number {
    return -this.daysSince(date);
  }

  static filterRecentDays<T>(items: T[], days: number, dateKey: keyof T): T[] {
    const cutoff = subDays(new Date(), days);
    return items.filter(item => {
      const itemDate = parseISO(item[dateKey] as string);
      return isValid(itemDate) && itemDate >= cutoff;
    });
  }

  static sortByDate<T>(
    items: T[],
    dateKey: keyof T,
    order: 'asc' | 'desc' = 'desc'
  ): T[] {
    return [...items].sort((a, b) => {
      const dateA = parseISO(a[dateKey] as string);
      const dateB = parseISO(b[dateKey] as string);

      if (!isValid(dateA) || !isValid(dateB)) return 0;

      const diff = dateB.getTime() - dateA.getTime();
      return order === 'desc' ? diff : -diff;
    });
  }

  static getWeekRange(date?: Date) {
    const target = date || new Date();
    return {
      start: startOfWeek(target, { weekStartsOn: 1 }),
      end: endOfWeek(target, { weekStartsOn: 1 }),
      startFormatted: format(
        startOfWeek(target, { weekStartsOn: 1 }),
        'yyyy-MM-dd'
      ),
      endFormatted: format(
        endOfWeek(target, { weekStartsOn: 1 }),
        'yyyy-MM-dd'
      ),
    };
  }

  static isValid(date: string | Date): boolean {
    const parsed = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsed);
  }

  static isToday(date: string | Date): boolean {
    const parsed = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(parsed)) return false;
    return isToday(parsed);
  }

  static isRecent(date: string | Date, maxDays: number = 7): boolean {
    return this.daysSince(date) <= maxDays;
  }

  static isOlderThan(date: string | Date, maxDays: number): boolean {
    return this.daysSince(date) > maxDays;
  }

  static getCurrentHour(): number {
    return new Date().getHours();
  }

  static getRelativeLabel(date: string | Date): string {
    const days = this.daysSince(date);

    if (days === 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days === -1) return 'Mañana';
    if (days > 0 && days <= 7) return `Hace ${days} días`;
    if (days < 0 && days >= -7) return `En ${Math.abs(days)} días`;
    if (days > 7) return this.formatShort(date);
    return this.formatShort(date);
  }

  static getWeekStats<T>(items: T[], dateKey: keyof T, weeks: number = 4) {
    const cutoff = subDays(new Date(), weeks * 7);
    const recentItems = items.filter(item => {
      const itemDate = parseISO(item[dateKey] as string);
      return isValid(itemDate) && itemDate >= cutoff;
    });

    return {
      total: recentItems.length,
      average: Math.round(recentItems.length / weeks),
      thisWeek: this.filterRecentDays(items, 7, dateKey).length,
    };
  }
}
