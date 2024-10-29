// components/Header.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, LogIn, UserPlus, LogOut } from 'lucide-react'; // アイコンのインポート

const Header: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // ログイン状態をチェックする
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        setIsAuthenticated(!!token); // トークンがある場合に認証済みとする
    }, []);

    // ログアウト処理
    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setIsAuthenticated(false);
    };

    return (
        <header className="bg-gradient-to-r from-green-200 to-green-400 shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* ロゴとホームリンク */}
                <h1 className="text-2xl font-bold text-green-900 flex items-center space-x-2">
                    <Link href="/" className="flex items-center">
                        <Calendar className="w-6 h-6 text-green-700 mr-2" />
                        <span>予約システム</span>
                    </Link>
                </h1>

                {/* ナビゲーションメニュー */}
                <nav className="space-x-6 flex items-center">
                    <Link href="/reservations" className="flex items-center text-green-800 hover:text-green-600 font-medium transition-colors duration-200">
                        <Calendar className="w-5 h-5 mr-1" />
                        <span>予約一覧</span>
                    </Link>
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="flex items-center text-green-800 hover:text-green-600 font-medium transition-colors duration-200">
                            <LogOut className="w-5 h-5 mr-1" />
                            <span>ログアウト</span>
                        </button>
                    ) : (
                        <>
                            <Link href="/login" className="flex items-center text-green-800 hover:text-green-600 font-medium transition-colors duration-200">
                                <LogIn className="w-5 h-5 mr-1" />
                                <span>ログイン</span>
                            </Link>
                            <Link href="/signup" className="flex items-center text-green-800 hover:text-green-600 font-medium transition-colors duration-200">
                                <UserPlus className="w-5 h-5 mr-1" />
                                <span>新規登録</span>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
