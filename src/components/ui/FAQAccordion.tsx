// =============================================================================
// VINE DENTAL CLINIC — FAQ Accordion Component
// Accessible keyboard-navigable accordion with animation.
// =============================================================================

import { useState, useRef } from "react";
import { cn } from "../../lib/cn";
import type { FAQ } from "../../data/faqs";

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItem({ faq, isOpen, onToggle, index }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const headingId = `faq-heading-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div className="border-b border-gray-200 last:border-0">
      <h3>
        <button
          id={headingId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            "w-full flex items-center justify-between gap-4 py-5 px-0 text-left",
            "font-semibold text-gray-900 text-base",
            "hover:text-teal-700 transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-inset",
            isOpen && "text-teal-700"
          )}
        >
          <span>{faq.question}</span>
          <span
            className={cn(
              "h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200",
              isOpen
                ? "border-teal-600 bg-teal-600 text-white rotate-45"
                : "border-gray-300 text-gray-500"
            )}
            aria-hidden="true"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 500}px` : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        <div className="pb-5 pr-10">
          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

interface FAQAccordionProps {
  faqs: FAQ[];
  allowMultiple?: boolean;
  className?: string;
}

export function FAQAccordion({
  faqs,
  allowMultiple = false,
  className,
}: FAQAccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));

  const handleToggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={cn("divide-y-0", className)} role="list">
      {faqs.map((faq, i) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          index={i}
          isOpen={openIndices.has(i)}
          onToggle={() => handleToggle(i)}
        />
      ))}
    </div>
  );
}
