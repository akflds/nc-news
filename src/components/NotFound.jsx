import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = ({ errorMessage }) => {
  useEffect(() => {
    document.title = "NC News";
  });

  return (
    <section>
      <p>Uhh oh!{!errorMessage ? " We couldn't find that." : ""}</p>
      <p>{errorMessage}</p>
      <Link to={"/"}>Return home</Link>
    </section>
  );
};

export default NotFound;
