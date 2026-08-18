import type { Config } from 'tailwindcss'

/**
 * 4X4-RAID — DESIGN SYSTEM
 * Tous les tokens sont pilotés par les variables CSS déclarées dans src/index.css.
 * Ne jamais écrire de valeur hexadécimale en dur dans un composant.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem', xl: '2.5rem' },
      screens: { '2xl': '1600px' },
    },
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        elevated: 'rgb(var(--elevated) / <alpha-value>)',
        bone: 'rgb(var(--bone) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        sand: 'rgb(var(--sand) / <alpha-value>)',
        earth: 'rgb(var(--earth) / <alpha-value>)',
        line: 'rgb(var(--bone) / 0.12)',
        'line-strong': 'rgb(var(--bone) / 0.24)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Échelle fluide — le desktop respire, le mobile reste lisible.
        micro: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.18em' }],
        eyebrow: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.22em' }],
        'display-xl': ['clamp(3rem, 11vw, 11rem)', { lineHeight: '0.86', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.5rem, 7.5vw, 7rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem, 5vw, 4.25rem)', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        lead: ['clamp(1.0625rem, 1.4vw, 1.375rem)', { lineHeight: '1.55', letterSpacing: '-0.01em' }],
      },
      spacing: {
        section: 'clamp(5rem, 12vh, 11rem)',
        'section-sm': 'clamp(3.5rem, 8vh, 7rem)',
      },
      borderRadius: {
        xs: '2px',
        DEFAULT: '3px',
        card: '4px',
        pill: '999px',
      },
      transitionTimingFunction: {
        raid: 'cubic-bezier(0.22, 1, 0.36, 1)',
        power: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        fast: '220ms',
        base: '480ms',
        slow: '900ms',
      },
      maxWidth: {
        measure: '62ch',
        'measure-tight': '46ch',
      },
      screens: {
        xs: '420px',
      },
      keyframes: {
        'sand-drift': {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translate3d(0, 24px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0,0,0)' },
        },
        scan: {
          '0%,100%': { opacity: '0.25' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'sand-drift': 'sand-drift 40s linear infinite',
        'fade-up': 'fade-up 700ms cubic-bezier(0.22,1,0.36,1) both',
        scan: 'scan 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
