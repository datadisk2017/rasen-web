'use client';

import HamburgerMenu from '../components/HamburgerMenu';
import React, { useState } from 'react';

export default function Page5() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        // ここで通常、formDataをバックエンドのAPIルートに送信します。
        // 例: fetchを使用する場合
        /*
        try {
            const response = await fetch('/api/contact', { // /api/contact に新しいAPIルートを作成します
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('メッセージが送信されました！');
                setFormData({ name: '', email: '', message: '' }); // フォームをクリア
            } else {
                alert('メッセージの送信に失敗しました。');
            }
        } catch (error) {
            console.error('フォーム送信エラー:', error);
            alert('エラーが発生しました。');
        }
        */

        // 現在は、アラートを表示してフォームをクリアするのみです。
        alert('メッセージが送信されました！ (実際にはバックエンドが必要です)');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <main className="w-full h-screen bg-slate-950 text-white shadow-2xl shadow-black/30 mx-auto overflow-y-auto">
            <section className="w-full flex flex-col items-center pb-10 sm:pb-20">
                <div className="w-full max-w-4xl relative px-4 sm:px-6">
                    <div className="fixed top-4 left-4 sm:left-6 z-50">
                        <HamburgerMenu />
                    </div>

                    <div className="flex flex-col gap-8 mt-20"> {/* ハンバーガーメニューの下にコンテンツを配置するためにmt-20を追加 */}
                        <h1 className="text-4xl font-bold text-center mb-8">Correspondence</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-slate-800 rounded-lg shadow-lg">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full p-2 border border-slate-600 rounded-md bg-slate-700 text-white focus:ring-indigo-500 focus:border-indigo-500" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full p-2 border border-slate-600 rounded-md bg-slate-700 text-white focus:ring-indigo-500 focus:border-indigo-500" required />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-300">Message</label>
                                <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} className="mt-1 block w-full p-2 border border-slate-600 rounded-md bg-slate-700 text-white focus:ring-indigo-500 focus:border-indigo-500" required></textarea>
                            </div>
                            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
                        </form>
                        <p className="text-center text-sm text-slate-400 mt-4">
                            This form requires a backend API endpoint to function properly.
                            The submitted data is currently displayed in the console.
                            To send emails to `shirakawa.rasen@gmail.com`, please implement server-side processing.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
