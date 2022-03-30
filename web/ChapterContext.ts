import { createContext } from "react";

const ChapterContext = createContext({
    chapter: 1,
    setChapter: (chapter: number) => { }
})

export default ChapterContext