'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '@/data/sistemas';

interface FaqAccordionProps {
  items: FAQItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  // Guardamos el índice del elemento abierto, o null si todos están cerrados.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-slate-200 bg-white rounded-xl shadow-sm transition-all overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors hover:bg-slate-50/80"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 pr-4">
                <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="font-semibold text-slate-900 text-base md:text-lg">
                  {item.pregunta}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-blue-600' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100 bg-slate-50/50">
                {item.respuesta}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
