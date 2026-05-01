import { type ReactNode, useEffect, useId, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

type Direction = null | "l" | "r";

type ShiftTab = {
  id: number;
  title: string;
  links: Array<{ href: string; label: string; description?: string }>;
};

export function ShiftingDropDown({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const tabs: ShiftTab[] = useMemo(
    () => [
      {
        id: 1,
        title: "About",
        links: [
          { href: "/about", label: "About Us", description: "Our story, instructors, and partners." },
        ],
      },
    ],
    [],
  );

  return <Tabs className={className} tabs={tabs} tone={tone} />;
}

function Tabs({
  className,
  tabs,
  tone,
}: {
  className?: string;
  tabs: ShiftTab[];
  tone: "light" | "dark";
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [dir, setDir] = useState<Direction>(null);

  const handleSetSelected = (val: number | null) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }

    setSelected(val);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className={cn("relative flex h-fit gap-2", className)}
    >
      {tabs.map((t) => (
        <Tab key={t.id} tab={t.id} handleSetSelected={handleSetSelected} selected={selected} tone={tone}>
          {t.title}
        </Tab>
      ))}

      <AnimatePresence>
        {selected !== null && (
          <Content key="overlay" selected={selected} dir={dir} tabs={tabs} handleSetSelected={handleSetSelected} />
        )}
      </AnimatePresence>
    </div>
  );
}

function Tab({
  children,
  tab,
  handleSetSelected,
  selected,
  tone,
}: {
  children: ReactNode;
  tab: number;
  handleSetSelected: (val: number | null) => void;
  selected: number | null;
  tone: "light" | "dark";
}) {
  const isActive = selected === tab;
  return (
    <button
      id={`shift-tab-${tab}`}
      type="button"
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={cn(
        "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        tone === "dark"
          ? isActive
            ? "bg-white/15 text-white shadow-sm"
            : "text-white/80 hover:bg-white/10 hover:text-white"
          : isActive
            ? "bg-secondary text-foreground shadow-sm"
            : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
      )}
      aria-expanded={isActive}
      aria-haspopup="menu"
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 transition-transform", isActive && "rotate-180")} aria-hidden="true" />
    </button>
  );
}

function Content({
  selected,
  dir,
  tabs,
  handleSetSelected,
}: {
  selected: number;
  dir: Direction;
  tabs: ShiftTab[];
  handleSetSelected: (val: number | null) => void;
}) {
  const overlayId = useId();
  const tab = tabs.find((t) => t.id === selected);

  return (
    <motion.div
      id="overlay-content"
      role="menu"
      aria-label={tab?.title ?? "Menu"}
      className={cn(
        "absolute left-0 top-full mt-2 z-[60]",
        "min-w-[320px] rounded-2xl border border-border bg-popover text-popover-foreground shadow-soft",
        "p-2",
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      onMouseLeave={() => handleSetSelected(null)}
    >
      <Bridge />
      <Nub selected={selected} key={`nub-${overlayId}`} />

      <div className="p-2">
        {tabs.map((t) => (
          <AnimatePresence key={t.id} mode="wait">
            {selected === t.id && (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: dir === "l" ? -12 : dir === "r" ? 12 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir === "l" ? 12 : dir === "r" ? -12 : 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <MenuLinks links={t.links} />
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </motion.div>
  );
}

function Bridge() {
  // Invisible hover bridge so users can move from the tab to the menu without it closing.
  return <div className="absolute -top-3 left-0 right-0 h-3" />;
}

function Nub({ selected }: { selected: number }) {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const moveNub = () => {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;
      setLeft(tabCenter);
    };

    moveNub();
    window.addEventListener("resize", moveNub);
    return () => window.removeEventListener("resize", moveNub);
  }, [selected]);

  return (
    <div
      className="absolute -top-2 h-4 w-4 rotate-45 border border-border bg-popover"
      style={{ left: left - 8 }}
      aria-hidden="true"
    />
  );
}

function MenuLinks({ links }: { links: Array<{ href: string; label: string; description?: string }> }) {
  const location = useLocation();

  return (
    <div className="grid gap-1">
      {links.map((l) => {
        const active = location.pathname === l.href;
        return (
          <Link
            key={l.href}
            to={l.href}
            role="menuitem"
            className={cn(
              "rounded-xl px-3 py-2 transition-colors",
              active ? "bg-secondary text-foreground" : "hover:bg-secondary/60",
            )}
          >
            <div className="text-sm font-medium text-foreground">{l.label}</div>
            {l.description ? <div className="text-xs text-muted-foreground mt-0.5">{l.description}</div> : null}
          </Link>
        );
      })}
    </div>
  );
}
