import type { ReactNode } from "react";
import React, { act, createContext, useContext, useState } from "react";
import { cn } from "~/lib/utils";

const AccordionContext = createContext<{
    activeItems: string[];
    isItemActive: (id: string) => boolean;
    toggleItem: (id: string) => void;
} | null>(null);

const useAccordion = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("useAccordion must be used within an AccordionProvider");
    }
    return context;
}

interface AccordionProps {
    children: ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
    const [activeItems, setActiveItems] = useState<string[]>([]);
    const toggleItem = (id: string) => {
        // Toggle item in the activeItems array
        setActiveItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const isItemActive = (id: string) => activeItems.includes(id);

    return (
        <AccordionContext.Provider value={{ activeItems, isItemActive, toggleItem }}>
            <div className={`w-full space-y-2 rounded-lg`}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
}

// Accordion Item
interface AccordionItemProps {
    id: string;
    children: ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ id, children }) => {
    return (
        <div className={`overflow-hidden border-b border-gray-200`}>
            {children}
        </div>
    );
}

// Accordion Header
interface AccordionHeaderProps {
    id: string;
    children: ReactNode;
    icon?: ReactNode;
}

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({ id, children, icon }) => {
    const { isItemActive, toggleItem } = useAccordion();
    const active = isItemActive(id);

    const defaultIcon = (
        <svg
            className={cn("w-5 h-5 transition-transform duration-200", {
                "rotate-180": active,
            })}
            fill="none"
            stroke="#98A2B3"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
            />
        </svg>
    );

    const handleClick = () => {
        toggleItem(id);
    };

    return (
        <button className={`w-full px-4 py-3 focus:outline-none transition-colors duration-300 flex items-center justify-between cursor-pointer`} onClick={handleClick}>
            {children} {icon || defaultIcon}
        </button>
    );
}

// Accordion Content
interface AccordionContentProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ id, children, className }) => {
    const { isItemActive } = useAccordion();
    const active = isItemActive(id);

    return (
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${className} ${active ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-4 py-3">{children}</div>
        </div>
    );
}
