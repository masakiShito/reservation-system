import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Loader2 } from 'lucide-react';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:1337/api/auth/local', {
                identifier,
                password,
            });
            localStorage.setItem('jwt', response.data.jwt);
            localStorage.setItem('userId', response.data.user.id);
            navigate('/reservations');
        } catch (err) {
            setError('ログインに失敗しました');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            <div className="max-w-md w-full m-4">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* ヘッダー部分 */}
                    <div className="text-center mb-8">
                        <div className="inline-block p-3 rounded-full bg-green-50 mb-4">
                            <svg
                                className="w-10 h-10 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            予約システムへログイン
                        </p>
                    </div>

                    {/* フォーム部分 */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-5">
                            {/* メールアドレス入力 */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    メールアドレス
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl
                                            text-gray-900 placeholder-gray-400
                                            focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* パスワード入力 */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    パスワード
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl
                                            text-gray-900 placeholder-gray-400
                                            focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* エラーメッセージ */}
                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        {/* ログインボタン */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 px-4 rounded-xl text-sm font-medium text-white
                                bg-green-500 hover:bg-green-600
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                    ログイン中...
                                </span>
                            ) : (
                                'ログイン'
                            )}
                        </button>
                    </form>

                    {/* 区切り線 */}
                    <div className="mt-6 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                アカウントをお持ちでない方
                            </span>
                        </div>
                    </div>

                    {/* 追加リンク */}
                    <div className="mt-6 space-y-4">
                        <button
                            onClick={() => navigate('/signup')}
                            className="w-full py-2.5 px-4 rounded-xl text-sm font-medium text-gray-700
                                border border-gray-300 hover:bg-gray-50
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            新規登録はこちら
                        </button>

                        <div className="text-center">
                            <a
                            href="/forgot-password"
                            className="text-sm font-medium text-green-600 hover:text-green-500"
                            >
                                パスワードをお忘れの方はこちら
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;