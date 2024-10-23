import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeSwitcher from '.';
import { ThemeProvider } from 'next-themes';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(), 
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});


describe('ThemeSwitcher', () => {
  it('renders the button and switches theme on click', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /dark mode/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument();
  });
});
