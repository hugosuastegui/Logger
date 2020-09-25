import React, { useContext } from "react";
import { MyContext } from "../context";
import { Redirect } from "react-router-dom";

function Brief() {
  const { clearCtxUser, user } = useContext(MyContext);
  return user ? (
    <div>
      <h2>Brief: Private Page</h2>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Brief;
