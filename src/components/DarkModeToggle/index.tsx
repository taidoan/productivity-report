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
			<button onClick={toggleTheme} className='rounded border p-2'>
				{theme === 'dark' ? 'Light' : 'Dark'} Mode
			</button>
	);
};

export default ThemeSwitcher;
