import { useEffect, useState } from "react";

const useSortPath = (sort) => {
  const [sort_by, setSort] = useState(undefined);
  const [order, setOrder] = useState(undefined);

  useEffect(() => {
    switch (sort) {
      case "hot":
        setSort("comment_count");
        setOrder("desc");
        break;
      case "cold":
        setSort("comment_count");
        setOrder("asc");
        break;
      case "new":
        setSort("created_at");
        setOrder("desc");
        break;
      case "old":
        setSort("created_at");
        setOrder("asc");
        break;
      case "top":
        setSort("votes");
        setOrder("desc");
        break;
      case "bottom":
        setSort("votes");
        setOrder("asc");
        break;
      default:
        setSort("created_at");
        setOrder("desc");
        break;
    }
  }, [sort]);

  return { order, sort_by };
};

export default useSortPath;
