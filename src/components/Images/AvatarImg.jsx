import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function AvatarImg(props) {
  const { to, ...rest } = props;
  if (to) {
    return (
      <Link to={to}>
        <Avatar {...rest} />
      </Link>
    );
  }

  return <Avatar {...rest} />;
}
