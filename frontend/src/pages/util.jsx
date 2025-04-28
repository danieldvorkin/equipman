import { CloseButton } from "@chakra-ui/react";

export const getEndElement = (search, setSearch, inputRef) => {
  return search ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setSearch("");
        inputRef.current.focus();
      }}
      me="-2"
    />
  ) : undefined;
};