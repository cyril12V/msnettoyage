import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

/**
 * Jeu d'icônes du site, inlinées en SVG.
 *
 * Aucune librairie externe : le site n'utilise qu'une trentaine d'icônes et les
 * embarquer évite un paquet supplémentaire dans le bundle client. Toutes sont
 * dessinées sur une grille 24×24 et héritent de `currentColor`.
 */

/** Icônes au trait, épaisseur 1.5, sans remplissage. */
const strokeIcons = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
    </>
  ),
  trowel: (
    <>
      <path d="M14 3l7 7-6.5 3.5L11 10z" />
      <path d="M11 10l-6 6a2.5 2.5 0 0 0 3.5 3.5l6-6" />
    </>
  ),
  bed: (
    <>
      <path d="M3 18V8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10" />
      <path d="M3 14h18M3 18v3M21 18v3" />
      <path d="M7 7V5h10v2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="1.5" />
      <path d="M9 7V4h6v3M3 12h18" />
    </>
  ),
  factory: (
    <>
      <path d="M3 20V10l6 4V10l6 4V6h6v14z" />
      <path d="M7 20v-3M13 20v-3M18 20v-3" />
    </>
  ),
  hardhat: (
    <>
      <path d="M4 17a8 8 0 0 1 16 0" />
      <path d="M9 17V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v9" />
      <path d="M2.5 17h19" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.2-2.9 7.5-7 9-4.1-1.5-7-4.8-7-9V6z" />
      <path d="M9 12.2l2.2 2.2L15.5 10" />
    </>
  ),
  bolt: <path d="M13 2L5 13h6l-1 9 8-11h-6z" />,
  sliders: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
      <circle cx="9" cy="7" r="2.2" fill="white" />
      <circle cx="15" cy="12" r="2.2" fill="white" />
      <circle cx="8" cy="17" r="2.2" fill="white" />
    </>
  ),
  trophy: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14L7 22l5-2.5L17 22l-1.5-8" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c0 8-4.5 12-11 12H5" />
      <path d="M4 20c1.5-5 5-8 10-9.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M16 9.5l1.8 1.8L21 8" />
    </>
  ),
  home: <path d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />,
  store: (
    <>
      <path d="M4 9h16v11H4z" />
      <path d="M3 9l1.5-5h15L21 9" />
    </>
  ),
  building: (
    <>
      <path d="M5 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17" />
      <path d="M15 10h3a1 1 0 0 1 1 1v10M9 7h2M9 11h2M9 15h2M3 21h18" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3.5 6l8.5 7 8.5-7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  arrowRight: <path d="M4 12h15m0 0l-6-6m6 6l-6 6" />,
  arrowLeft: <path d="M20 12H5m0 0l6-6m-6 6l6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  document: (
    <>
      <path d="M5 4h9l5 5v11H5z" />
      <path d="M14 4v5h5" />
    </>
  ),
} satisfies Record<string, ReactElement>;

/** Icônes pleines, remplissage `currentColor`, sans contour. */
const filledIcons = {
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="11" />
      <path
        d="M7 12.4l3.2 3.2L17 8.8"
        stroke="white"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  star: <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />,
  quote: (
    <path d="M9.3 5.5C6.2 7 4.5 9.6 4.5 13v5.5h6.2V13H7.9c0-2.2.9-3.8 2.8-4.8zm9.5 0C15.7 7 14 9.6 14 13v5.5h6.2V13h-2.8c0-2.2.9-3.8 2.8-4.8z" />
  ),
  whatsapp: (
    <path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A9.9 9.9 0 1 0 12 2zm5.6 14c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1a13 13 0 0 1-6.4-5.6c-.5-.8-.8-1.7-.8-2.5 0-.9.5-1.6.9-1.9.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6.5.9 1.1 1.6 1.9 2.2.4.3.8.5 1 .6.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.6-.1l2 .9c.2.1.3.2.3.3s0 .6-.2 1.3z" />
  ),
  facebook: (
    <path d="M13 22v-9h3l.5-3.5H13V7.5c0-1 .3-1.7 1.8-1.7h1.9V2.7A26 26 0 0 0 14.1 2.5c-2.7 0-4.6 1.7-4.6 4.7v2.3H6.5V13h3v9z" />
  ),
  instagram: (
    <>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" />
    </>
  ),
  linkedin: (
    <path d="M4.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM2.8 21h3.4V8.9H2.8zM9 8.9V21h3.4v-6.5c0-1.7.9-2.6 2.2-2.6 1.2 0 1.9.8 1.9 2.6V21H20v-7.1c0-3.4-1.8-5-4.2-5-1.9 0-2.9 1-3.4 1.8V8.9z" />
  ),
} satisfies Record<string, ReactElement>;

export type IconName = keyof typeof strokeIcons | keyof typeof filledIcons;

type IconProps = {
  name: IconName;
  className?: string;
  /** Texte alternatif. Omis, l'icône est masquée aux lecteurs d'écran. */
  title?: string;
};

function isFilled(name: IconName): name is keyof typeof filledIcons {
  return name in filledIcons;
}

export function Icon({ name, className, title }: IconProps) {
  const filled = isFilled(name);
  const content = filled ? filledIcons[name] : strokeIcons[name as keyof typeof strokeIcons];

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-6 shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? undefined : "currentColor"}
      strokeWidth={filled ? undefined : 1.5}
      strokeLinecap={filled ? undefined : "round"}
      strokeLinejoin={filled ? undefined : "round"}
    >
      {title ? <title>{title}</title> : null}
      {content}
    </svg>
  );
}
