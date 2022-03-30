import { Chapter } from "../types";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  TableContainer,
  Table,
  Th,
  Tr,
  Td,
  Thead,
  Tbody,
  useColorModeValue,
} from "@chakra-ui/react";
export default function ChapterPage({ chapter }: { chapter: Chapter }) {
  return (
    <Box maxWidth="90%" marginLeft={8} paddingTop={10} paddingBottom={20}>
      <Heading size="xl" color="red.500">
        {chapter.title}
      </Heading>
      {chapter.sections.map((s, i) => {
        if (!s.isTable) {
          let text = <Text>{s.text}</Text>;
          chapter.terms.filter((t) => t.chapter == i + 1).forEach((t) => {});
          return (
            <Box marginY={4}>
              {s.title != "Text" && (
                <Heading size="md" color={"red.400"} marginBottom={1}>
                  {s.title}
                </Heading>
              )}
              <Text>{s.text}</Text>
            </Box>
          );
        } else {
          return (
            <Box marginY={4}>
              {s.title != "Text" && (
                <Heading
                  size="md"
                  color={useColorModeValue("gray.700", "gray.200")}
                  marginBottom={1}
                >
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
