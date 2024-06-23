import { DateTime } from "luxon";
import { v4 } from "uuid";


import { DATE_TIME_FORMAT, FILE_ENCODINGS, TIMEZONES } from "@appUtils/Constants";

class SharedUtils {
  static generateUuid() {
    return v4();
  }

  static shortUuid() {
    return this.generateUuid().slice(-12);
  }

  static getCurrentDate(options: { format?: string; timezone?: string }) {
    return DateTime.now()
      .setZone(options.timezone ?? TIMEZONES.UTC)
      .toFormat(options.format ?? DATE_TIME_FORMAT.YMD_FORMAT);
  }

  static getCurrentDateTime(options: { format?: string; timezone?: string }) {
    return DateTime.now()
      .setZone(options.timezone ?? TIMEZONES.UTC)
      .toFormat(options.format ?? DATE_TIME_FORMAT.YMD_HMS_FORMAT);
  }

  static getCurrentTime(options: { format?: string; timezone?: string }) {
    return DateTime.now()
      .setZone(options.timezone ?? TIMEZONES.UTC)
      .toFormat(options.format ?? DATE_TIME_FORMAT.HMS_FORMAT);
  }

  static getHourMinute(time: string) {
    return time.split(":").slice(0, 2).join(":");
  }

  static setDate(date: string | Date) {
    const dt = new Date(date).toISOString();

    return DateTime.fromISO(dt).toFormat(DATE_TIME_FORMAT.YMD_FORMAT);
  }

  static setTime(time: string) {
    const date = DateTime.now().toFormat(DATE_TIME_FORMAT.YMD_FORMAT);
    const dt = new Date(`${date} ${time}`).toISOString();

    return DateTime.fromISO(dt).toFormat(DATE_TIME_FORMAT.HMS_FORMAT);
  }

  static setDateTime(dateTime: string | Date, timezone?: string) {
    const dt = new Date(dateTime).toISOString();

    return {
      date: DateTime.fromISO(dt).setZone(timezone).toFormat(DATE_TIME_FORMAT.YMD_FORMAT),
      time: DateTime.fromISO(dt).setZone(timezone).toFormat(DATE_TIME_FORMAT.HMS_FORMAT)
    };
  }

  static setDateToEndDay(date: string): string {
    return DateTime.fromISO(date).set({ hour: 23, minute: 59, second: 59 }).toFormat(DATE_TIME_FORMAT.YMD_HMS_FORMAT);
  }

  static getRecentDate(...date: DateTime[]): Date {
    return DateTime.max(...date).toJSDate();
  }

  static addMonthsToDate(date: Date, nMonths: number): Date {
    return DateTime.fromJSDate(date).plus({ months: nMonths }).toJSDate();
  }

  static addDaysToDate(date: Date, nDays: number): Date {
    return DateTime.fromJSDate(date).plus({ days: nDays }).toJSDate();
  }

  static addDays(date: string | Date, days: number) {
    const dt = new Date(date).toISOString();

    return DateTime.fromISO(dt).plus({ days: days }).toFormat(DATE_TIME_FORMAT.YMD_FORMAT);
  }

  static imageExtension(base64String: string) {
    const [imageType] = base64String.split(";base64,");

    return imageType ? imageType.split("/")[1] : "";
  }

  static base64Decoder(base64String: string) {
    return Buffer.from(base64String, FILE_ENCODINGS.BASE64);
  }

  static groupBy<T extends object, K extends keyof T>(records: T[], keys: K[]) {
    const groupedData: Record<keyof T, Record<keyof T, T[]>> = {} as never;

    records.map((record) => {
      let currentGroup: { rows: T[] } = groupedData as never;
      keys.map((key) => {
        if (!currentGroup[record[key as string]]) {
          currentGroup[record[key as string]] = {};
        }
        currentGroup = currentGroup[record[key as string]];
      });

      if (!currentGroup.rows) {
        currentGroup.rows = [];
      }
      currentGroup.rows.push(record);
    });

    return Object.values(groupedData);
  }

  static toCapitalize(word: string) {
    return word ? word.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()) : "";
  }

  static uniqueArrayOfObjects<T extends object, K extends keyof T>(array: T[], props: K[] = []) {
    return [...new Map(array.map((entry) => [props.map((k) => entry[k]).join("|"), entry])).values()];
  }

  static getUniqueArrayFromObject<T extends object, K extends keyof T>(records: T[], prop: K) {
    return [...new Set(records.map((record) => record[prop]))];
  }

  static isFalsyBooleanPresent<T extends object, K extends keyof T>(record: T, prop: K) {
    return prop in record && record[prop] !== null;
  }

  static removeKeys(object) {
    Object.keys(object).forEach((key) => {
      if (object[key] === undefined || object[key] === null || object[key] === "") {
        delete object[key];
      }
    });

    return object;
  }

  static filterKeys(object, filter) {
    if (filter.length > 0) {
      Object.keys(object).forEach((key) => {
        if (!filter.includes(key)) {
          delete object[key];
        }
      });

      return object;
    }

    return object;
  }

  static cleanFloatNumbers(number) {
    if (typeof number === "string") {
      return parseFloat(number.replaceAll(",", ""));
    }

    return number;
  }
}

export default SharedUtils;
