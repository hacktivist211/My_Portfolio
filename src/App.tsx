import { useCallback, useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import Loader from "@/components/Loader";
import TransitionVeil, { type VeilHandle } from "@/components/TransitionVeil";
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import Experience from "@/pages/Experience";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import { hashFor, routeFromHash, routeLabel, type Route } from "@/lib/routes";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [route, setRoute] = useState<Route>(() => routeFromHash());
  const veilRef = useRef<VeilHandle>(null);
  const busyRef = useRef(false);

  // back/forward buttons follow the hash
  useEffect(() => {
    const onHash = () => {
      if (busyRef.current) return; // mid-transition, we set this hash ourselves
      const r = routeFromHash();
      setRoute(r);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback(
    async (to: Route, e: React.MouseEvent | React.KeyboardEvent, hashOverride?: string) => {
      if (busyRef.current) return;
      if (to === route && !hashOverride) return;
      busyRef.current = true;
      try {
        const el = e.currentTarget as HTMLElement;
        const rect = el?.getBoundingClientRect?.();
        const me = e as React.MouseEvent;
        const x = me.clientX || (rect ? rect.left + rect.width / 2 : window.innerWidth / 2);
        const y = me.clientY || (rect ? rect.top + rect.height / 2 : window.innerHeight / 2);

        await veilRef.current?.cover(x, y, routeLabel(to));
        window.location.hash = hashOverride ?? hashFor(to);
        setRoute(to);
        window.scrollTo(0, 0);
        // let the incoming page mount + first paint under the veil
        await new Promise((r) => setTimeout(r, 90));
        await veilRef.current?.uncover();
      } finally {
        busyRef.current = false;
      }
    },
    [route]
  );

  const openFile = useCallback(
    (fileId: string, e: React.MouseEvent) => navigate("work", e, `#/work?f=${fileId}`),
    [navigate]
  );

  return (
    <div className="grain min-h-screen bg-ink text-bone">
      {!booted && <Loader onDone={() => setBooted(true)} />}

      <Nav route={route} onNavigate={navigate} />

      <main key={route}>
        {route === "index" && <Home booted={booted} onNavigate={navigate} onOpenFile={openFile} />}
        {route === "work" && <Work />}
        {route === "experience" && <Experience />}
        {route === "about" && <About />}
        {route === "contact" && <Contact />}
      </main>

      <TransitionVeil ref={veilRef} />
    </div>
  );
}
