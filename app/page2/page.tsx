import Image from 'next/image';
import Link from 'next/link';
import topImage from '../../public/shasti_flyer.jpg';
import subImage from '../../public/shasti_ura.jpg';
import HamburgerMenu from '../components/HamburgerMenu';

export default function Page2() {
    return (
        <main className="w-full h-screen bg-slate-950 text-white shadow-2xl shadow-black/30 mx-auto overflow-y-auto">
            <section className="w-full flex flex-col items-center pb-10 sm:pb-20">
                <div className="w-full max-w-4xl relative px-4 sm:px-6">
                    <HamburgerMenu />

                    <div className="flex flex-col gap-12">
                        <Image
                            src={topImage}
                            alt="フライヤー表面"
                            sizes="100vw"
                            className="w-full h-auto shadow-2xl"
                            priority
                            unoptimized
                        />
                        <Image
                            src={subImage}
                            alt="フライヤー裏面"
                            sizes="100vw"
                            className="w-full h-auto shadow-2xl"
                            unoptimized
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
