import type { ReactNode } from "react";

export interface AccordionProps {
  /**
   * The header content - typically the question or title
   */
  header: ReactNode;
  /**
   * The body content - typically the answer or detailed content
   */
  children: ReactNode;
  /**
   * Whether the accordion is open by default
   */
  defaultOpen?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Header CSS classes
   */
  headerClassName?: string;
  /**
   * Body CSS classes
   */
  bodyClassName?: string;
  /**
   * Controlled open state
   */
  isOpen?: boolean;
  /**
   * Callback when open state changes
   */
  onToggle?: (isOpen: boolean) => void;
}
