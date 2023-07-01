import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Ticket from "../Components/Ticket";

export default function Tickets() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1300);
  }, []);

  return (
    <div className="mb-4">
      <Header>My Tickets</Header>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {isLoading ? (
          <>
            {Array(3)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="relative flex aspect-[2/1] w-72 animate-pulse overflow-hidden rounded-2xl bg-accent/20"
                >
                  <div className="flex basis-2/3 flex-col gap-1">
                    <div className="flex h-1/3 w-full items-center justify-start border-r-2 border-dashed border-background bg-accent/20"></div>
                    <div className="flex h-2/3 w-full flex-col gap-2 border-r-2 border-dashed border-background px-4 pt-1">
                      <div className="flex flex-col gap-1">
                        <div className="h-4 w-4/5 rounded bg-accent/20"></div>
                        <div className="h-3 w-1/4 rounded bg-accent/20"></div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="h-4 w-1/2 rounded bg-accent/20"></div>
                        <div className="h-3 w-1/4 rounded bg-accent/20"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex basis-1/3 flex-col gap-1">
                    <div className="flex h-1/3 w-full items-center justify-center border-l-2 border-dashed border-background bg-accent/20"></div>
                    <div className="bt-2 flex h-2/3 w-full items-center justify-center border-l-2 border-dashed border-background">
                      <div className="h-1/2 w-1/2 rounded-md bg-accent/20"></div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-1/3 h-4 w-4 translate-x-1/2 translate-y-1/2 rounded-full bg-background"></div>
                  <div className="absolute right-1/3 top-0 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-background"></div>
                </div>
              ))}
          </>
        ) : (
          <>
            <Ticket movie="Fast X" name="John Doe" seat="4" />
            <Ticket
              movie="The Super Mario Bros. Movie"
              name="John Doe"
              seat="5"
            />
            <Ticket
              movie="Ant-Man and The Wasp: Quantumania"
              name="John Doe"
              seat="12"
            />
            <Ticket movie="Top Gun: Maverick" name="John Doe" seat="26" />
          </>
        )}
      </div>
    </div>
  );
}
