import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="w-full bg-qrios-primary shadow-md p-4">
            <div className="max-w-5xl mx-auto flex items-center justify-center">
                {/* Centered Title */}
                <div className="flex items-center gap-4">
                    <h1 className="text-xl sm:text-2xl font-semibold text-white">IT-Vaardigheidstest</h1>
                </div>
            </div>
        </header>
    )
}

export default Header;