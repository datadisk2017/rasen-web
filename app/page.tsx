import Image from 'next/image';
import Link from 'next/link';
import topImage from '../public/website_top.png';

export default function Home() {
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
              ラセンのホームページへ
            </h1>
            <p className="mt-6 max-w-2xl text-base text-slate-100/90 sm:text-lg">

            </p>
          </div>

          {/* Overlay a single page1 button on top of the image (Istanbul Exhibition).
            Adjust `left` / `top` values below to fine-tune placement. */}

          <div className="absolute inset-x-0 button-position z-20 flex justify-center px-8">
            <div className="grid w-full max-w-[1000px] gap-4">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { href: '/page1', label: ' ' },
                  { href: '/page2', label: ' ' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex w-full items-center justify-center rounded-3xl bg-transparent px-2 text-center font-semibold text-white transition hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-400 h-14 text-sm sm:h-16 sm:text-base lg:h-21 lg:text-lg"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { href: '/page3', label: ' ' },
                  { href: '/page4', label: ' ' },
                  { href: '/page5', label: ' ' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex w-full items-center justify-center rounded-3xl bg-transparent px-2 text-center font-semibold text-white transition hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-400 h-14 text-sm sm:h-16 sm:text-base lg:h-20 lg:text-lg"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
