import { useEffect, useState } from "react";

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
};

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();

    fetch(url, { ...options, signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (
          ![HTTP_STATUS.OK, HTTP_STATUS.CREATED, HTTP_STATUS.ACCEPTED].includes(
            data.statusCode
          )
        ) {
          setError({ statusCode: data.statusCode, message: data.message });
          return;
        }

        if (data.totalPage) setTotalPages(data.totalPage);
        setData(data.data);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError({ statusCode: 0, message: err.message });
        setIsLoading(false);
      });

    return () => {
      setIsLoading(false);
      controller.abort();
      setIsLoading(false);
    };
    // FIXME: it's causing infinite re-render if options is passed in dependency array
  }, [url]);

  return { data, error, isLoading, totalPages };
}
