import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Download, Github, Mail } from "lucide-react";
import {
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar,
} from "@/components/aceternity/resizable-navbar";
import type { NavItem } from "@/components/aceternity/resizable-navbar";
import { profile } from "@/data/profile";

const SECTIONS: NavItem[] = [
  { name: "Work", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Writing", link: "#writing" },
  { name: "Contact", link: "#contact" },
];

const MENU_ID = "site-menu";

const github = profile.links.find((link) => link.label === "GitHub");

/** Suggested filename for the downloaded CV, rather than the lowercase path. */
const CV_FILENAME = `${profile.name.replace(/\s+/g, "_")}_CV.pdf`;

const SiteNav = () => {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  // Any navigation closes the menu, including an in-page anchor.
  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!bar.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  /*
   * Always a router link to "/#section", on the home page as well as off it.
   * ScrollManager turns that into a smooth scroll when the page is unchanged
   * and an instant jump when arriving from elsewhere. The onClick covers
   * re-selecting the section already in the URL, which changes neither the
   * path nor the hash and so would not trip the effect above.
   */
  const sectionLink = (item: NavItem, className: string) => (
    <Link to={`/${item.link}`} className={className} onClick={() => setOpen(false)}>
      {item.name}
    </Link>
  );

  return (
    <Navbar>
      <div ref={bar}>
        <NavBody>
          <Link
            to="/"
            aria-label={`${profile.name}, home`}
            className="mr-3 flex shrink-0 items-center gap-[9px] text-[17px] font-[650] tracking-[-0.4px] text-ink transition-opacity duration-150 hover:opacity-80"
          >
            <span
              aria-hidden="true"
              className="flex size-[26px] items-center justify-center rounded-[8px] bg-ink text-[13px] font-semibold tracking-normal text-white"
            >
              {profile.name.charAt(0)}
            </span>
            {profile.name}
          </Link>

          <NavItems items={SECTIONS} label="Sections" renderLink={sectionLink} />

          <div className="ml-auto flex items-center gap-1 max-sm:gap-1.5">
            {github && (
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="hidden size-9 items-center justify-center rounded-full text-[#333] transition-colors duration-150 hover:bg-ink/[0.06] hover:text-ink sm:flex"
              >
                <Github size={17} strokeWidth={1.9} aria-hidden="true" />
              </a>
            )}

            <a
              href={profile.cv}
              download={CV_FILENAME}
              className="btn btn-dark h-11 gap-2 pl-[18px] pr-4 text-[14.5px] max-sm:h-10 max-sm:px-3.5 max-sm:text-[14px]"
            >
              <Download size={15} strokeWidth={2.1} aria-hidden="true" />
              <span>
                <span className="max-[400px]:sr-only">Download </span>CV
              </span>
            </a>

            <MobileNavToggle
              isOpen={open}
              onClick={() => setOpen((value) => !value)}
              controls={MENU_ID}
            />
          </div>

          <MobileNavMenu id={MENU_ID} isOpen={open}>
            <nav aria-label="Sections">
              <ul>
                {SECTIONS.map((item) => (
                  <li key={item.link}>
                    {sectionLink(
                      item,
                      "flex h-12 items-center rounded-2xl px-4 text-[16px] font-medium text-ink transition-colors duration-150 hover:bg-ink/[0.06]",
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="grid grid-cols-2 gap-2 px-1.5 pb-1.5 pt-2">
              {github && (
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-white btn-md"
                >
                  <Github size={16} strokeWidth={1.9} aria-hidden="true" />
                  GitHub
                </a>
              )}
              <a href={`mailto:${profile.email}`} className="btn btn-dark btn-md">
                <Mail size={16} strokeWidth={1.9} aria-hidden="true" />
                Email me
              </a>
            </div>
          </MobileNavMenu>
        </NavBody>
      </div>
    </Navbar>
  );
};

export default SiteNav;
