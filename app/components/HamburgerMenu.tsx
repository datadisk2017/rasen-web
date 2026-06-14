"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HamburgerMenu() {
    const [open, setOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState('ja');
    const [translating, setTranslating] = useState(false);
    const originals = new Map<Text, string>();

    useEffect(() => {
        if (selectedLang === 'ja') {
            document.documentElement.removeAttribute('data-translate');
            document.documentElement.lang = 'ja';
        } else {
            document.documentElement.setAttribute('data-translate', selectedLang);
            document.documentElement.lang = selectedLang === 'en' ? 'en' : selectedLang === 'tr' ? 'tr' : 'ar';
        }
    }, [selectedLang]);

    const collectTextNodes = (root: Node) => {
        const nodes: Text[] = [];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                const text = node.nodeValue || '';
                if (!text.trim()) return NodeFilter.FILTER_REJECT;
                const parent = node.parentElement;
                if (!parent) return NodeFilter.FILTER_REJECT;
                if (parent.closest('[data-no-translate]')) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        let cur: Text | null = walker.nextNode() as Text | null;
        while (cur) {
            nodes.push(cur);
            cur = walker.nextNode() as Text | null;
        }
        return nodes;
    };

    const restoreOriginals = () => {
        originals.forEach((text, node) => {
            node.nodeValue = text;
        });
        originals.clear();
    };

    const translateText = async (q: string, target: string) => {
        const GOOGLE_KEY = (process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_KEY as string) || '';
        if (GOOGLE_KEY) {
            try {
                const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ q, source: 'ja', target, format: 'text' })
                });
                if (!res.ok) throw new Error('google translate failed');
                const data = await res.json();
                return data?.data?.translations?.[0]?.translatedText || '';
            } catch (e) {
                console.error('google translate error', e);
                // fallback to libre
            }
        }

        try {
            const res = await fetch('https://libretranslate.de/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ q, source: 'ja', target, format: 'text' })
            });
            if (!res.ok) throw new Error('translate failed');
            const data = await res.json();
            return data.translatedText || '';
        } catch (e) {
            console.error('translate error', e);
            return '';
        }
    };

    const translatePage = async (target: string) => {
        setTranslating(true);
        try {
            const nodes = collectTextNodes(document.body);
            // store originals
            nodes.forEach(n => {
                if (!originals.has(n)) originals.set(n, n.nodeValue || '');
            });

            // translate sequentially in small batches to avoid throttling
            const BATCH = 8;
            for (let i = 0; i < nodes.length; i += BATCH) {
                const batch = nodes.slice(i, i + BATCH);
                await Promise.all(batch.map(async (node) => {
                    const src = node.nodeValue || '';
                    const translated = await translateText(src, target);
                    if (translated) node.nodeValue = translated;
                }));
            }
        } finally {
            setTranslating(false);
        }
    };

    const handleLang = (lang: string) => {
        setSelectedLang(lang);
        if (lang === 'ja') {
            restoreOriginals();
            document.documentElement.removeAttribute('data-translate');
            document.documentElement.lang = 'ja';
        } else {
            document.documentElement.setAttribute('data-translate', lang);
            document.documentElement.lang = lang === 'en' ? 'en' : lang === 'tr' ? 'tr' : 'ar';
            // start translation
            translatePage(lang).catch((e) => console.error(e));
        }
    };

    return (
        <>
            {/* Language buttons (top-right) */}
            {/* <div data-no-translate className="absolute right-4 top-4 z-40 flex gap-2">
                <button
                    type="button"
                    disabled={translating}
                    onClick={() => handleLang('ja')}
                    aria-label="日本語"
                    aria-busy={translating}
                    className={`text-sm px-2 py-1 rounded ${selectedLang === 'ja' ? 'bg-sky-600 text-white' : 'bg-white/20 text-black'} ${translating ? 'opacity-50' : ''}`}
                >
                    日本語
                </button>
                <button
                    type="button"
                    disabled={translating}
                    onClick={() => handleLang('en')}
                    aria-label="English"
                    aria-busy={translating}
                    className={`text-sm px-2 py-1 rounded ${selectedLang === 'en' ? 'bg-sky-600 text-white' : 'bg-white/20 text-black'} ${translating ? 'opacity-50' : ''}`}
                >
                    English
                </button>
                <button
                    type="button"
                    disabled={translating}
                    onClick={() => handleLang('tr')}
                    aria-label="Türkçe"
                    aria-busy={translating}
                    className={`text-sm px-2 py-1 rounded ${selectedLang === 'tr' ? 'bg-sky-600 text-white' : 'bg-white/20 text-black'} ${translating ? 'opacity-50' : ''}`}
                >
                    Türkçe
                </button>
                <button
                    type="button"
                    disabled={translating}
                    onClick={() => handleLang('ar')}
                    aria-label="العربية"
                    aria-busy={translating}
                    className={`text-sm px-2 py-1 rounded ${selectedLang === 'ar' ? 'bg-sky-600 text-white' : 'bg-white/20 text-black'} ${translating ? 'opacity-50' : ''}`}
                >
                    العربية
                </button>
            </div> */}
            <button
                type="button"
                aria-expanded={open}
                aria-label="メニュー"
                onClick={() => setOpen((s) => !s)}
                data-no-translate
                className="absolute left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-md bg-white/30 hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
                <span
                    className={`block h-0.5 w-6 bg-black transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
                />
                <span
                    className={`block h-0.5 w-6 bg-black my-1 transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
                />
                <span
                    className={`block h-0.5 w-6 bg-black transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
                />
            </button>

            {open && (
                <div data-no-translate className="absolute left-4 top-16 z-30 w-48 rounded-md bg-slate-900/90 p-2 shadow-lg">
                    <nav className="flex flex-col">
                        <Link href="/" className="block px-3 py-2 rounded text-white hover:bg-slate-800">ホーム</Link>
                        <Link href="/page1" className="block px-3 py-2 rounded text-white hover:bg-slate-800">ISTANBUL EXHIBITION</Link>
                        <Link href="/page2" className="block px-3 py-2 rounded text-white hover:bg-slate-800">Shasti</Link>
                        <Link href="/page3" className="block px-3 py-2 rounded text-white hover:bg-slate-800">Coodinates</Link>
                        <Link href="/page4" className="block px-3 py-2 rounded text-white hover:bg-slate-800">Fragments</Link>
                        <Link href="/page5" className="block px-3 py-2 rounded text-white hover:bg-slate-800">Correspondence</Link>
                    </nav>
                </div>
            )}
        </>
    );
}
