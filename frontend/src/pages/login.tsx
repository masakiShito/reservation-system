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
        setError('');

        try {
            const response = await axios.post('http://localhost:1337/api/auth/local', {
                identifier,
                password,
            });

            const token = response.data.jwt;
            const userId = response.data.user.id;
            localStorage.setItem('jwt', token);
            localStorage.setItem('userId', userId);

            navigate('/reservations');
        } catch (err) {
            setError('メールアドレスまたはパスワードが正しくありません');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* ロゴやブランド名を表示 */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="mt-2 text-gray-600">予約システムへログイン</p>
                </div>

                {/* カード */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* メールアドレス入力 */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor="email">
                                メールアドレス
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="text"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           placeholder:text-gray-400"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        {/* パスワード入力 */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor="password">
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
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           placeholder:text-gray-400"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* エラーメッセージ */}
                        {error && (
                            <div className="rounded-lg bg-red-50 p-4">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        {/* ログインボタン */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white rounded-lg px-4 py-2
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200
                       flex items-center justify-center"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                            ) : null}
                            {isLoading ? 'ログイン中...' : 'ログイン'}
                        </button>
                    </form>

                    {/* 区切り線 */}
                    <div className="relative mt-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">アカウントをお持ちでない方</span>
                        </div>
                    </div>

                    {/* 新規登録リンク */}
                    <button
                        onClick={() => navigate('/signup')}
                        className="mt-6 w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700
                     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transition-colors duration-200"
                    >
                        新規登録はこちら
                    </button>
                </div>

                {/* フッター */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                        パスワードをお忘れの方はこちら
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;