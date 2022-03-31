import { Chapter, Section } from "../types";
import {
  Box,
  Heading,
  Text,
  TableContainer,
  Table,
  Th,
  Tr,
  Td,
  Thead,
  Tbody,
  useColorMode,
} from "@chakra-ui/react";
import Head from "next/head";

export default function ChapterPage({ chapter }: { chapter: Chapter }) {
  const { colorMode } = useColorMode();
  const formatText = (section: Section, curChapter: number) => {
    let text = section.text;
    chapter.terms.forEach((t) => {
      text = text.replace(
        t.name,
        `<b style="color: ${
          colorMode == "dark"
            ? "var(--chakra-colors-orange-300)"
            : "var(--chakra-colors-orange-400)"
        };">${t.name}</b>`
      );
    });
    chapter.people.forEach((p) => {
      text = text.replace(
        p.name,
        `<u style="color: ${
          colorMode == "dark"
            ? "var(--chakra-colors-green-300)"
            : "var(--chakra-colors-green-400)"
        };">${p.name}</u>`
      );
    });
    return {
      __html: text,
    };
  };

  return (
    <Box maxWidth="90%" marginLeft={[2, 8]} paddingTop={10} paddingBottom={20}>
      <Head>
        <title>{chapter.title} | AMOAC</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Heading size="xl" color="red.500">
        {chapter.title}
      </Heading>
      {chapter.sections.map((s, i) => {
        if (!s.isTable) {
          return (
            <Box marginY={4}>
              {s.title != "Text" && (
                <Heading size="md" color="red.400" marginBottom={1}>
                  {s.title}
                </Heading>
              )}
              <Text dangerouslySetInnerHTML={formatText(s, i + 1)} />
            </Box>
          );
        } else {
          return (
            <Box marginY={4}>
              {s.title != "Text" && (
                <Heading size="md" color="red.400" marginBottom={1}>
                  {s.title}
                </Heading>
              )}
              <TableContainer>
                <Table
                  variant="simple"
                  colorScheme="red"
                  minWidth="60%"
                  width="fit-content"
                  marginX="auto"
                >
                  <Thead>
                    <Tr>
                      {Object.keys(s.table).map((k, i) => (
                        <Th key={i}>{k}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.values(s.table)[0].map((value, i) => {
                      return (
                        <Tr>
                          {Object.keys(s.table).map((k) => (
                            <Td>{s.table[k][i]}</Td>
                          ))}
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          );
        }
      })}
    </Box>
  );
}
