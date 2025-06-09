import React, { useContext } from "react";
import AuthLogin from "./AuthLogin";
import AuthDefault from "./AuthDefault";
import UserContext from "../../contexts/UserContext";

export default function Auth() {
  const { user } = useContext(UserContext);
  return <>{user ? <AuthLogin /> : <AuthDefault />}</>;
}
