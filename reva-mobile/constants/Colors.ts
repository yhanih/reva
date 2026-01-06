// Premium vibrant color palette
export const Colors = {
    // Primary Brand Colors (Cyan/Aqua focus)
    primary: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6', // Main Primary
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a',
        gradient: ['#14b8a6', '#0d9488'] as const,
    },
    // Accent colors (Purple/Indigo)
    accent: {
        50: '#f5f3ff',
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6', // Main Accent
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
        gradient: ['#8b5cf6', '#7c3aed'] as const,
    },
    // Neutral palette (Slate)
    gray: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617',
    },
    // Semantic colors
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',

    // UI specific
    background: {
        primary: '#ffffff',
        secondary: '#f8fafc',
        tertiary: '#f1f5f9',
        glass: 'rgba(255, 255, 255, 0.8)',
    },
    text: {
        primary: '#0f172a',
        secondary: '#475569',
        tertiary: '#94a3b8',
        inverse: '#ffffff',
    },
    border: {
        light: '#f1f5f9',
        DEFAULT: '#e2e8f0',
        dark: '#cbd5e1',
    },
};

// Refined Dark Mode
export const DarkColors = {
    background: {
        primary: '#020617',
        secondary: '#0f172a',
        tertiary: '#1e293b',
        glass: 'rgba(15, 23, 42, 0.8)',
    },
    text: {
        primary: '#f8fafc',
        secondary: '#cbd5e1',
        tertiary: '#64748b',
        inverse: '#0f172a',
    },
    border: {
        light: '#1e293b',
        DEFAULT: '#334155',
        dark: '#475569',
    },
};

