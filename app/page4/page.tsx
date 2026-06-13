import Image from 'next/image';
import Link from 'next/link';
import topImage from '../../public/website-top-new.png';
import HamburgerMenu from '../components/HamburgerMenu';

export default function Page4() {
    return (
        <main className="w-auto h-screen overflow-hidden bg-slate-950 text-white shadow-2xl shadow-black/30 mx-auto">
            <section className="relative h-screen w-full overflow-hidden flex justify-center items-center">
                <div
                    className="image-wrapper relative overflow-hidden"
                    style={{ '--aspect-ratio': topImage.width / topImage.height } as any}
                >
                    <Image
                        src={topImage}
                        alt="ホームページトップ画像"
                        fill
                        sizes="100vw"
                        className="object-cover object-center"
                        priority
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
                        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-slate-100/80">ようこそ</p>
                        <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
                            Fragments
                        </h1>
                        <p className="mt-6 max-w-2xl text-base text-slate-100/90 sm:text-lg">
                            Next.js と Tailwind CSS で構成したトップセクションです。
                        </p>
                    </div>

                    {/* Overlay a single page1 button on top of the image (Istanbul Exhibition).
            Adjust `left` / `top` values below to fine-tune placement. */}

                    {/* Hamburger menu (replaces individual buttons) */}
                    <HamburgerMenu />
                </div>
            </section>
        </main>
    );
}
