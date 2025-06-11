import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function AvatarImg({ to, ...rest }) {
  if (to) {
    return (
      <Link to={to}>
        <Avatar {...rest} />
      </Link>
    );
  }

  return <Avatar {...rest} />;
}
