import NavLink from "@/components/NavLink";

export default function DestinationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="subnav-wrap">
        <nav className="container subnav" aria-label="Розділи напрямків">
          <NavLink href="/destinations" exact className="subnav-link">Усі напрямки</NavLink>
          <NavLink href="/destinations/ukraine" className="subnav-link">Україна</NavLink>
          <NavLink href="/destinations/europe" className="subnav-link">Європа</NavLink>
        </nav>
      </div>
      <div className="container section">{children}</div>
    </>
  );
}
