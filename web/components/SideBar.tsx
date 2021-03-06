import React, { ReactNode, useContext } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  ListItem,
  List,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { Home, Menu, HalfMoon, SunLight, Twitter, GitHub } from "iconoir-react";
import ChapterContext from "../ChapterContext";
import { useRouter } from "next/router";

type Link = {
  name: string;
  chapter: number;
};

export default function Sidebar({
  children,
  titles,
}: {
  children: ReactNode;
  titles: string[];
}) {
  const ChapterProps = useContext(ChapterContext);
  const LinkItems: Link[] = titles.map((t, i) => ({
    name: t,
    chapter: i,
  }));
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue(
        useColorModeValue("gray.100", "gray.900"),
        "gray.900"
      )}
    >
      <SidebarContent
        onClose={() => onClose}
        items={LinkItems}
        display={{ base: "none", md: "block" }}
        chapterProps={ChapterProps}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            chapterProps={ChapterProps}
            items={LinkItems}
            onClose={onClose}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 72 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  items: Link[];
  chapterProps: {
    chapter: number;
    setChapter: (chapter: number) => void;
  };
}

const SidebarContent = ({
  items,
  chapterProps,
  onClose,
  ...rest
}: SidebarProps) => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 72 }}
      paddingBottom={8}
      pos="fixed"
      h="full"
      {...rest}
      overflowY="scroll"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold" color="red.400">
          AMOAC Notes
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex
        align="center"
        p={2}
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue("gray.100", "gray.700"),
        }}
        onClick={() => {
          chapterProps.setChapter(-1);
          router.push("/");
        }}
      >
        <Icon mr="4" fontSize="16" as={Home} color="red.400" />
        Home
      </Flex>
      <Flex
        onClick={toggleColorMode}
        align="center"
        p={2}
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue("gray.100", "gray.700"),
        }}
      >
        {colorMode === "light" ? (
          <>
            <Icon as={HalfMoon} mr="4" fontSize="16" color="red.400" />
            <Text>Dark Mode</Text>
          </>
        ) : (
          <>
            <Icon as={SunLight} mr="4" fontSize="16" color="red.400" />
            <Text>Light Mode</Text>
          </>
        )}
      </Flex>
      <Text ml="4" fontSize="xl" fontWeight="bold" color="red.400">
        Chapters
      </Text>
      {items.map((link) => (
        <NavItem
          key={link.name}
          chapter={link.chapter}
          currentChapter={chapterProps.chapter}
          setChapter={chapterProps.setChapter}
        >
          {link.name}
        </NavItem>
      ))}
      <Flex
        flexDirection="column"
        color={useColorModeValue("gray.600", "gray.500")}
        justifyContent="center"
        alignItems="center"
        marginX={4}
        fontSize="sm"
        mt={4}
      >
        <Text>
          All the notes on this website were originally hosted on{" "}
          <Link
            textDecoration="underline"
            _hover={{ color: "red.400" }}
            href="https://apnotes.net"
          >
            AP Notes
          </Link>
          . I do not take credit for any of the content.
        </Text>
        <Flex gap={2} mt={2}>
          <Link
            _hover={{ color: "red.400" }}
            href="https://twitter.com/Neesh774"
          >
            <Twitter />
          </Link>
          <Link
            textDecoration="underline"
            _hover={{ color: "red.400" }}
            href="https://github.com/Neesh774/apushmeoffacliff"
          >
            <GitHub />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

const NavItem = ({
  children,
  chapter,
  currentChapter,
  setChapter,
  ...rest
}) => {
  const router = useRouter();
  return (
    <Flex
      align="left"
      p={1}
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      alignItems="center"
      _hover={{
        bg: useColorModeValue("gray.100", "gray.700"),
      }}
      fontWeight={chapter + 1 === currentChapter ? "bold" : "normal"}
      color={
        currentChapter === chapter + 1
          ? useColorModeValue("red.500", "red.400")
          : useColorModeValue("gray.600", "gray.400")
      }
      {...rest}
      onClick={() => {
        router.push("/?c=" + (chapter + 1));
        setChapter(chapter + 1);
      }}
    >
      <Text
        fontWeight="bold"
        mr={3}
        color={
          currentChapter === chapter + 1
            ? useColorModeValue("red.400", "red.300")
            : useColorModeValue("gray.500", "gray.600")
        }
      >
        {chapter + 1}
      </Text>
      {children}
    </Flex>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 72 }}
      px={{ base: 4, md: 24 }}
      height="12"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<Menu width={16} height={16} />}
        height={8}
        width={8}
      />

      <Text fontSize="xl" ml="4" fontWeight="bold">
        AMOAC
      </Text>
    </Flex>
  );
};
