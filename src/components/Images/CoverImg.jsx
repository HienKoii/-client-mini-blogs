import { Box, Image } from "@chakra-ui/react";
import coverImageDefault from "../../assets/cover.png";

export default function CoverImg({ src, ...rest }) {
  return (
    <Box w="full" aspectRatio={16 / 9} overflow="hidden" borderRadius="lg">
      <Image src={src || coverImageDefault} alt="Cover" w="full" h="full" objectFit="cover" {...rest} />
    </Box>
  );
}
