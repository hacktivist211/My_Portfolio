export type Route = "index" | "work" | "experience" | "about" | "contact";

export const NAV_ITEMS: { route: Route; label: string; no: string }[] = [
  { route: "index", label: "Index", no: "00" },
  { route: "work", label: "Work", no: "01" },
  { route: "experience", label: "Experience", no: "02" },
  { route: "about", label: "About", no: "03" },
  { route: "contact", label: "Let's Talk", no: "04" },
];

export const routeLabel = (r: Route) =>
  NAV_ITEMS.find((n) => n.route === r)?.label.toUpperCase() ?? "INDEX";

export const routeFromHash = (): Route => {
  const h = window.location.hash.replace(/^#\/?/, "").split("?")[0].toLowerCase();
  const found = NAV_ITEMS.find((n) => n.route === (h as Route));
  return found ? (found.route as Route) : "index";
};

export const hashFor = (r: Route) => (r === "index" ? "#/" : `#/${r}`);
