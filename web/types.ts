export type Section = {
    text: string;
    title?: string;
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
    chapterNum: number;
    startDate: string;
    endDate: string;
    sections: Section[];
    terms: Term[];
    people: Person[];
}