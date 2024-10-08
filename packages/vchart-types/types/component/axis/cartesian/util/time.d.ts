import type { StringOrNumber } from '../../../../typings';
export declare class TimeUtil {
    private locale_shortWeekdays;
    private locale_periods;
    private locale_weekdays;
    private locale_shortMonths;
    private numberRe;
    private pads;
    private requoteRe;
    private periodRe;
    private periodLookup;
    private weekdayRe;
    private weekdayLookup;
    private shortWeekdayRe;
    private shortWeekdayLookup;
    private monthRe;
    private monthLookup;
    private shortMonthRe;
    private shortMonthLookup;
    private static instance;
    static getInstance(): TimeUtil;
    private requoteF;
    private constructor();
    private requote;
    private localDate;
    private utcDate;
    private newDate;
    private formatRe;
    private formatLookup;
    private locale_months;
    private formatShortWeekday;
    private formatWeekday;
    private formatShortMonth;
    private formatMonth;
    private pad;
    private formatDayOfMonth;
    private formatHour24;
    private formatHour12;
    private formatMilliseconds;
    private formatMonthNumber;
    private formatMinutes;
    private formatPeriod;
    private formatSeconds;
    private formatFullYear;
    private formatUTCShortWeekday;
    private formatUTCWeekday;
    private formatUTCShortMonth;
    private formatUTCMonth;
    private formatUTCDayOfMonth;
    private formatUTCHour24;
    private formatUTCHour12;
    private formatUTCMilliseconds;
    private formatUTCMonthNumber;
    private formatUTCMinutes;
    private formatUTCPeriod;
    private formatUTCSeconds;
    private formatUTCFullYear;
    private formats;
    private utcFormats;
    private parseShortWeekday;
    private parseWeekday;
    private parseShortMonth;
    private parseMonth;
    private parseDayOfMonth;
    private parseHour24;
    private parseMilliseconds;
    private parseMonthNumber;
    private parseMinutes;
    private parsePeriod;
    private parseSeconds;
    private parseFullYear;
    private parses;
    private parseSpecifier;
    private newParse;
    private newFormat;
    private getFullTimeStamp;
    timeFormat: (specifier: string, timeText: StringOrNumber) => string;
    timeUTCFormat: (specifier: string, timeText: StringOrNumber) => string;
    timeParse: (specifier: string, timeText: string | string) => Date;
}
