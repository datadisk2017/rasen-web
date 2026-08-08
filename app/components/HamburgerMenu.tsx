"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: 'ホーム', href: '/' },
    { name: 'ISTANBUL EXHIBITION', href: '/page1' },
    { name: 'DOKO-ZOKU', href: '/page2' }, // Note: Link text was 'Shasti' before
    { name: 'Coodinates', href: '/page3' },
    { name: 'Fragments', href: '/page4' },
    { name: 'Correspondence', href: '/page5' },
];

export default function HamburgerMenu() {
    const [open, setOpen] = useState(false);

    return (
        <div data-no-translate>
            <button
                type="button"
                aria-expanded={open}
                aria-label="メニュー"
                onClick={() => setOpen((s) => !s)}
                className="z-50 flex h-10 w-10 items-center justify-center rounded-md bg-white/30 hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
                <div className="flex flex-col items-center justify-center">
                    <span
                        className={`block h-0.5 w-6 bg-black transition-transform duration-300 ease-in-out ${open ? "translate-y-[5px] rotate-45" : ""}`}
                    />
                    <span
                        className={`my-1 block h-0.5 w-6 bg-black transition-opacity duration-300 ease-in-out ${open ? "opacity-0" : "opacity-100"}`}
                    />
                    <span
                        className={`block h-0.5 w-6 bg-black transition-transform duration-300 ease-in-out ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
                    />
                </div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.aside
                        initial={{ width: 0 }}
                        animate={{ width: 300 }}
                        exit={{ width: 0, transition: { delay: 0.3, duration: 0.3 } }}
                        className="fixed top-0 left-0 h-full bg-slate-900/95 text-white z-40"
                    >
                        <motion.nav
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={{
                                open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
                                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                            }}
                            className="flex flex-col items-start p-8 pt-24 gap-4"
                        >
                            {navLinks.map(({ name, href }) => (
                                <motion.div
                                    key={name}
                                    variants={{
                                        open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
                                        closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } }
                                    }}
                                >
                                    <Link href={href} onClick={() => setOpen(false)} className="block text-2xl text-slate-200 hover:text-indigo-400">
                                        {name}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.nav>
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
}
