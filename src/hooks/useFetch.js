import { useEffect, useState } from "react";

import fetch from "../utils/fetch";

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();

    fetch(url, { ...options, signal: controller.signal })
      .then((data) => {
        if (data.totalPage) setTotalPages(data.totalPage);
        setData(data.data);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => {
      setIsLoading(false);
      controller.abort();
      setIsLoading(false);
    };
    // FIXME: it's causing infinite re-render if options is passed in dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, error, isLoading, totalPages };
}
