import Image from 'next/image';
import topImage from '../../public/rasen001.jpg';
import subImage from '../../public/rasen002.jpg';
import HamburgerMenu from '../components/HamburgerMenu';

export default function Page3() {
    return (
        <main className="w-full h-screen bg-slate-950 text-white shadow-2xl shadow-black/30 mx-auto overflow-y-auto">
            <section className="w-full flex flex-col items-center pb-10 sm:pb-20">
                <div className="w-full max-w-4xl relative px-4 sm:px-6">
                    <div className="fixed top-4 left-4 sm:left-6 z-50">
                        <HamburgerMenu />
                    </div>
                    <div className="flex flex-col gap-12 mt-20">
                        <Image
                            src={topImage}
                            alt="Coodinates"
                            sizes="100vw"
                            className="w-full h-auto shadow-2xl"
                            priority
                            unoptimized
                        />
                        <Image
                            src={subImage}
                            alt="Coodinates_ura"
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
