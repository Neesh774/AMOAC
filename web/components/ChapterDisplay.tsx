import { Flex, Heading, Button, useColorModeValue } from "@chakra-ui/react";
import { Chapter } from "../types";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
export default function ChapterDisplay({ chapter }: { chapter: Chapter }) {
  return (
    <Flex
      borderRadius="lg"
      backgroundColor={useColorModeValue("gray.100", "blue.900")}
      paddingX={4}
      paddingY={4}
      flexDirection="column"
      gap={4}
    >
      <Flex flexDirection="column" height="100%">
        <Heading size="sm" color={useColorModeValue("gray.500", "gray.300")}>
          Chapter {chapter.chapterNum}
        </Heading>
        <Heading size="md">{chapter.title}</Heading>
      </Flex>
      <Flex gap={4} flexDirection="column">
        <Flex gap={4}>
          {chapter.terms.length > 0 && (
            <Link href={`/chapter/${chapter.chapterNum}#terms`} passHref>
              <Button
                color={useColorModeValue("gray.600", "gray.300")}
                variant="link"
                rightIcon={<ChevronRightIcon />}
              >
                {chapter.terms.length} Terms
              </Button>
            </Link>
          )}
          {chapter.people.length > 0 && (
            <Link href={`/chapter/${chapter.chapterNum}#people`} passHref>
              <Button
                color={useColorModeValue("gray.600", "gray.300")}
                variant="link"
                rightIcon={<ChevronRightIcon />}
              >
                {chapter.people.length} People
              </Button>
            </Link>
          )}
        </Flex>
        <Flex>
          <Link href={`/chapter/${chapter.chapterNum}`} passHref>
            <Button colorScheme="blue">View Chapter</Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
