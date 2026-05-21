import {
  Code2,
  Smartphone,
  ShoppingCart,
  Database,
  Workflow,
  Lightbulb,
  Search,
  PenTool,
  Rocket,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Code2,
  Smartphone,
  ShoppingCart,
  Database,
  Workflow,
  Lightbulb,
  Search,
  PenTool,
  Rocket,
};

/** Resuelve un icono de lucide-react por su nombre (usado por los datos mockeados). */
export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? Code2;
  return <Cmp className={className} aria-hidden="true" />;
}
