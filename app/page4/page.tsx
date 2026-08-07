import Image from 'next/image';
import Link from 'next/link';
import topImage from '../../public/shasti_flyer.jpg';
import subImage from '../../public/shasti_ura.jpg';
import thirdImage from '../../public/Season.jpg';
import fourthImage from '../../public/uma.jpeg';
import fifthImage from '../../public/chocho.jpg';

import HamburgerMenu from '../components/HamburgerMenu';

export default function Page4() {
    return (
        <main className="w-full h-screen bg-slate-950 text-white shadow-2xl shadow-black/30 mx-auto overflow-y-auto">
            <section className="w-full flex flex-col items-center pb-10 sm:pb-20">
                <div className="w-full max-w-4xl relative px-4 sm:px-6">
                    <div className="fixed top-4 left-4 sm:left-6 z-50">
                        <HamburgerMenu />
                    </div>

                    <div className="flex flex-col gap-12">
                        <Image
                            src={topImage}
                            alt="shasti_flyer"
                            sizes="100vw"
                            className="w-full h-auto shadow-2xl"
                            priority
                            unoptimized
                        />
                        <Image
                            src={subImage}
                            alt="shastin_ura"
                            sizes="100vw"
                            className="w-full h-auto shadow-2xl"
                            unoptimized
                        />
                        <Image
                            src={thirdImage}
                            alt="shastin_ura"
                            sizes="100vw"
                            className="w-full h-auto shadow-2xl"
                            unoptimized
                        />
                        <Image
                            src={fourthImage}
                            alt="shastin_ura"
                            sizes="100vw"
                            className="w-full h-auto shadow-2xl"
                            unoptimized
                        />
                        <Image
                            src={fifthImage}
                            alt="shastin_ura"
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