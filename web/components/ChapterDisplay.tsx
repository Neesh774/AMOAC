import {
  Flex,
  Heading,
  Button,
  useColorModeValue,
  Text,
  Icon,
} from "@chakra-ui/react";
import { Chapter } from "../types";
import { ChevronRightIcon } from "@chakra-ui/icons";
import ChapterContext from "../ChapterContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { User, StarOutline, ReportColumns } from "iconoir-react";
export default function ChapterDisplay({ chapter }: { chapter: Chapter }) {
  const { setChapter } = useContext(ChapterContext);
  const router = useRouter();
  return (
    <Flex
      borderRadius="lg"
      backgroundColor={useColorModeValue("gray.200", "blue.900")}
      paddingX={4}
      paddingY={4}
      flexDirection="column"
      gap={4}
    >
      <Flex flexDirection="column" height="100%">
        <Flex gap={2} alignItems="center">
          <Heading size="sm" color={useColorModeValue("gray.500", "gray.300")}>
            Chapter {chapter.chapter_number}
          </Heading>
          <Text>&bull;</Text>
          <Heading size="sm" color={useColorModeValue("gray.500", "gray.300")}>
            {chapter.sections.length} Sections
          </Heading>
        </Flex>
        <Heading size="md">{chapter.title}</Heading>
      </Flex>
      <Flex gap={4} flexDirection="column">
        <Flex gap={4}>
          {chapter.terms.length > 0 && (
            <Flex>
              <Text
                color={useColorModeValue("gray.600", "gray.300")}
                marginRight={1}
              >
                <StarOutline strokeWidth={2.5} width="1.3em" height="1.3em" />
              </Text>
              <Text
                color={useColorModeValue("gray.600", "gray.300")}
                fontWeight="bold"
              >
                {chapter.terms.length} Terms
              </Text>
            </Flex>
          )}
          {chapter.people.length > 0 && (
            <Flex>
              <Text
                color={useColorModeValue("gray.600", "gray.300")}
                marginRight={1}
              >
                <User strokeWidth={2.5} width="1.3em" height="1.3em" />
              </Text>
              <Text
                color={useColorModeValue("gray.600", "gray.300")}
                fontWeight="bold"
              >
                {chapter.people.length} People
              </Text>
            </Flex>
          )}
        </Flex>
        <Flex>
          <Button
            colorScheme="blue"
            onClick={() => {
              setChapter(chapter.chapter_number);
              router.push("/?c=" + chapter.chapter_number);
            }}
          >
            View Chapter
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
