import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverted";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "bg-white text-ink-soft border border-line hover:border-brand hover:text-brand",
  ghost: "bg-transparent text-brand hover:bg-brand-soft",
  inverted: "bg-white text-brand hover:bg-brand-soft",
};

const sizeClasses: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-[0.95rem]",
};

/**
 * Un libellé d'action se lit d'un coup d'œil : casse normale, pas
 * d'interlettrage. Les capitales ralentissent la lecture sans rien apporter sur
 * un bouton déjà isolé par sa couleur et sa forme.
 */
const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: IconName;
  iconPosition?: "left" | "right";
  /** Occupe toute la largeur disponible. */
  fullWidth?: boolean;
};

type ButtonElementProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & { href?: undefined };

type LinkElementProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href"> & {
    href: string;
  };

type ButtonProps = ButtonElementProps | LinkElementProps;

/** Un href sortant du site (tel:, mailto:, https:) est rendu par une balise `a` native. */
function isExternal(href: string): boolean {
  return !href.startsWith("/");
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    icon,
    iconPosition = "right",
    fullWidth = false,
    ...rest
  } = props;

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {icon && iconPosition === "left" ? <Icon name={icon} className="size-4" /> : null}
      {children}
      {icon && iconPosition === "right" ? <Icon name={icon} className="size-4" /> : null}
    </>
  );

  if (typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as Omit<LinkElementProps, keyof SharedProps>;

    if (isExternal(href)) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonElementProps, keyof SharedProps>;

  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
