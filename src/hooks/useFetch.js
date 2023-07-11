import { useEffect, useState } from "react";

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
};

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
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

        setData(data.data);
        setError(null);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError({ statusCode: 0, message: err.message });
      })
      // FIXME: the setIsLoading() executed before setData() causing the data to be null for a few moments
      .finally(() => setIsLoading(false));

    return () => {
      setIsLoading(false);
      controller.abort();
    };
    // FIXME: it's causing infinite re-render if options is passed in dependency array
  }, [url]);

  return { data, error, isLoading };
}
