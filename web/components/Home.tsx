import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import ChapterDisplay from "./ChapterDisplay";
import { Chapter } from "../types";
export default function Home({ notes }: { notes: Chapter[] }) {
  return (
    <Box
      paddingY={10}
      maxWidth="90%"
      marginLeft={[0, 4, 8]}
      marginX={["auto", "0", "0"]}
    >
      <Heading size="lg">All Chapters</Heading>
      <SimpleGrid
        marginTop={4}
        marginBottom={10}
        minChildWidth={["70%", null, "40%", null, "30%", "20%"]}
        columnGap={3}
        rowGap={5}
      >
        {notes.map((c, i) => (
          <ChapterDisplay key={i} chapter={c} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
