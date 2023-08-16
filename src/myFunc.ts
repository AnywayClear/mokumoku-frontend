import dayjs, { Dayjs } from "dayjs";


export function dateToStringDot(date: Date): string { 
    let newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
}

export function StringDotToStringDash(date: string): string { 
    return date.replace(".","-");
}

export function dayjsToStringDash(date: Dayjs): string { 
    return date.format('YYYY-MM-DD');
}