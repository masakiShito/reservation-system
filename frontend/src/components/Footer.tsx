// components/Footer.tsx
import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react'; // SNSアイコンをインポート

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-green-200 to-green-400 text-green-900 py-8 mt-8 shadow-inner">
            <div className="container mx-auto text-center">
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition-colors duration-200">
                        <Facebook className="w-6 h-6" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition-colors duration-200">
                        <Twitter className="w-6 h-6" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition-colors duration-200">
                        <Instagram className="w-6 h-6" />
                    </a>
                </div>
                <p className="text-sm mb-4">© 2024 予約システム. All rights reserved.</p>
                <div className="space-x-4">
                    <a href="/privacy" className="text-green-800 hover:text-green-700 text-sm transition-colors duration-200">プライバシーポリシー</a>
                    <a href="/terms" className="text-green-800 hover:text-green-700 text-sm transition-colors duration-200">利用規約</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
