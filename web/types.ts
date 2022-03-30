
export type Section = {
    text: string;
    table: Object;
    title?: string;
    isTable: boolean;
}
export type Term = {
    name: string;
    chapter: number;
    passage: string;
}
export type Person = {
    name: string;
    chapter: number;
    passage: string;
}
export type Chapter = {
    title: string;
    chapter_number: number;
    start_date: string;
    end_date: string;
    sections: Section[];
    terms: Term[];
    people: Person[];
}