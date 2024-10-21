'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
			<button onClick={toggleTheme} className='rounded-lg p-3 px-5 font-bold mx-auto mt-8 block border-2 ease-in-out duration-300 bg-grey-800  text-white border-grey-800 dark:bg-gradient-to-t dark:from-grey-500 dark:to-grey-700 dark:text-grey-100 dark:border-grey-500 dark:shadow-inner'>
				{theme === 'dark' ? 'Light' : 'Dark'} Mode
			</button>
	);
};

export default ThemeSwitcher;
