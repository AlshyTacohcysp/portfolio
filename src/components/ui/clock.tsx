"use client";

import { useEffect, useState } from "react";

/** Live local clock for a given IANA timezone (server renders a static placeholder). */
export function Clock({ timezone, city }: { timezone: string; city: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fr-FR", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [timezone]);

  return (
    <span className="font-mono text-xs tracking-widest text-ash">
      <span className="text-bone">{city}</span> — {time ?? "--:--:--"}
    </span>
  );
}
