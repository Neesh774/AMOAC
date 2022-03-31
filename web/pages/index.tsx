import {
  SimpleGrid,
  Box,
  useColorModeValue,
  Heading,
  Flex,
} from "@chakra-ui/react";
import BookNotes from "../notes/Book17.json";
import { Chapter } from "../types";
import Head from "next/head";
import { createContext, useEffect, useState } from "react";
import Home from "../components/Home";
import ChapterPage from "../components/ChapterPage";
import ChapterContext from "../ChapterContext";
import Sidebar from "../components/SideBar";
import { useRouter } from "next/router";

export default function HomePage({ notes }: { notes: Chapter[] }) {
  const router = useRouter();
  const [chapter, setChapter] = useState(-1);
  useEffect(() => {
    setChapter(router.query.c ? parseInt(router.query.c as string) : -1);
  }, [router]);
  return (
    <ChapterContext.Provider value={{ chapter, setChapter }}>
      <Head>
        <title>AMOAC Notes</title>
      </Head>
      <Sidebar titles={notes.map((n) => n.title)}>
        {chapter == -1 ? (
          <Home notes={notes} />
        ) : (
          <ChapterPage chapter={notes[chapter - 1]} />
        )}
      </Sidebar>
    </ChapterContext.Provider>
  );
}

export async function getStaticProps() {
  const notes = BookNotes.map((bn) => {
    const chapter: Chapter = {
      title: bn.title,
      chapter_number: bn.chapter_number,
      start_date: bn.start_date,
      end_date: bn.end_date,
      sections: bn.sections.map((s) => {
        if (s.text) {
          return {
            text: s.text as string,
            title: s.title ?? "Text",
            isTable: false,
            table: {},
          };
        } else if (s.table) {
          return {
            text: "",
            table: s.table as Object,
            title: s.title ?? "Text",
            isTable: true,
          };
        }
      }),
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
