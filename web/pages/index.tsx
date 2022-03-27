import Nav from "../components/NavBar";
import { SimpleGrid } from "@chakra-ui/react";
import BookNotes from "../notes/Book17.json";
import { Chapter } from "../types";
import Head from "next/head";
import ChapterDisplay from "../components/ChapterDisplay";
export default function Home({ notes }: { notes: Chapter[] }) {
  return (
    <div>
      <Head>
        <title>AMOAC Notes</title>
      </Head>
      <Nav />
      <SimpleGrid
        maxWidth="80%"
        marginY={10}
        minChildWidth={["70%", null, "40%", null, "30%", "20%"]}
        columnGap={3}
        rowGap={5}
        marginX="auto"
      >
        {notes.map((c, i) => (
          <ChapterDisplay key={i} chapter={c} />
        ))}
      </SimpleGrid>
    </div>
  );
}

export async function getStaticProps() {
  const notes = BookNotes.map((bn) => {
    const chapter: Chapter = {
      title: bn.title,
      chapterNum: bn.chapter_number,
      startDate: bn.start_date,
      endDate: bn.end_date,
      sections: bn.sections.map((s) => ({
        title: s.title ?? "Text",
        text: s.text,
      })),
      terms: bn.terms.map((t) => ({
        name: t.name,
        passage: t.passage,
        chapter: t.chapter,
      })),
      people: bn.people.map((p) => ({
        name: p.name,
        passage: p.passage,
        chapter: p.chapter,
      })),
    };
    return chapter;
  });
  return {
    props: {
      notes: notes,
    },
  };
}
