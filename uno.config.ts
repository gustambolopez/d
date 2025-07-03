import { globSync } from 'fast-glob';
import fs from 'node:fs/promises';
import { basename } from 'node:path';
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss';

const iconPaths = globSync('./icons/*.svg');

const collectionName = 'bread';

const customIconCollection = iconPaths.reduce(
  (acc, iconPath) => {
    const [iconName] = basename(iconPath).split('.');

    acc[collectionName] ??= {};
    acc[collectionName][iconName] = async () => fs.readFile(iconPath, 'utf8');

    return acc;
  },
  {} as Record<string, Record<string, () => Promise<string>>>,
);

const BASE_COLORS = {
  white: '#FFFFFF',
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },
  bread: {
    accent: {
      50: '#FEF7ED',
      100: '#FDEDD3',
      200: '#FBD6A5',
      300: '#F8B76D',
      400: '#F59332',
      500: '#F2750A',
      600: '#E35D05',
      700: '#BC4508',
      800: '#96370E',
      900: '#792F0F',
      950: '#411505',
    },
    green: {
      50: '#ECFDF5',
      100: '#D1FAE5',
      200: '#A7F3D0',
      300: '#6EE7B7',
      400: '#34D399',
      500: '#10B981',
      600: '#059669',
      700: '#047857',
      800: '#065F46',
      900: '#064E3B',
      950: '#022C22',
    },
    orange: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#F97316',
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12',
      950: '#431407',
    },
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },
};

const COLOR_PRIMITIVES = {
  ...BASE_COLORS,
  alpha: {
    white: generateAlphaPalette(BASE_COLORS.white),
    gray: generateAlphaPalette(BASE_COLORS.gray[900]),
    black: generateAlphaPalette('#000000'),
    red: generateAlphaPalette(BASE_COLORS.red[500]),
    bread: {
      accent: generateAlphaPalette(BASE_COLORS.bread.accent[500]),
    },
  },
};

export default defineConfig({
  shortcuts: {
    'bread-ease-cubic-bezier': 'ease-[cubic-bezier(0.4,0,0.2,1)]',
    'transition-theme': 'transition-[background-color,border-color,color,box-shadow] duration-300 bread-ease-cubic-bezier',
    'animate-float': 'animate-[float_6s_ease-in-out_infinite]',
    kdb: 'bg-bread-elements-code-background text-bread-elements-code-text py-1.5 px-2 rounded-lg text-xs font-mono',
    'max-w-chat': 'max-w-[var(--chat-max-width)]',
    'shadow-3xl': 'shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]',
  },
  rules: [
    ['b', {}],
  ],
  theme: {
    colors: {
      ...COLOR_PRIMITIVES,
      bread: {
        elements: {
          borderColor: 'var(--bread-elements-borderColor)',
          borderColorActive: 'var(--bread-elements-borderColorActive)',
          shadow: 'var(--bread-elements-shadow)',
          background: {
            depth: {
              1: 'var(--bread-elements-background-depth-1)',
              2: 'var(--bread-elements-background-depth-2)',
              3: 'var(--bread-elements-background-depth-3)',
              4: 'var(--bread-elements-background-depth-4)',
            },
          },
          textPrimary: 'var(--bread-elements-textPrimary)',
          textSecondary: 'var(--bread-elements-textSecondary)',
          textTertiary: 'var(--bread-elements-textTertiary)',
          code: {
            background: 'var(--bread-elements-code-background)',
            text: 'var(--bread-elements-code-text)',
          },
          button: {
            primary: {
              background: 'var(--bread-elements-button-primary-background)',
              backgroundHover: 'var(--bread-elements-button-primary-backgroundHover)',
              text: 'var(--bread-elements-button-primary-text)',
            },
            secondary: {
              background: 'var(--bread-elements-button-secondary-background)',
              backgroundHover: 'var(--bread-elements-button-secondary-backgroundHover)',
              text: 'var(--bread-elements-button-secondary-text)',
            },
            danger: {
              background: 'var(--bread-elements-button-danger-background)',
              backgroundHover: 'var(--bread-elements-button-danger-backgroundHover)',
              text: 'var(--bread-elements-button-danger-text)',
            },
          },
          item: {
            contentDefault: 'var(--bread-elements-item-contentDefault)',
            contentActive: 'var(--bread-elements-item-contentActive)',
            contentAccent: 'var(--bread-elements-item-contentAccent)',
            contentDanger: 'var(--bread-elements-item-contentDanger)',
            backgroundDefault: 'var(--bread-elements-item-backgroundDefault)',
            backgroundActive: 'var(--bread-elements-item-backgroundActive)',
            backgroundAccent: 'var(--bread-elements-item-backgroundAccent)',
            backgroundDanger: 'var(--bread-elements-item-backgroundDanger)',
          },
          actions: {
            background: 'var(--bread-elements-actions-background)',
            code: {
              background: 'var(--bread-elements-actions-code-background)',
            },
          },
          artifacts: {
            background: 'var(--bread-elements-artifacts-background)',
            backgroundHover: 'var(--bread-elements-artifacts-backgroundHover)',
            borderColor: 'var(--bread-elements-artifacts-borderColor)',
            inlineCode: {
              background: 'var(--bread-elements-artifacts-inlineCode-background)',
              text: 'var(--bread-elements-artifacts-inlineCode-text)',
            },
          },
          messages: {
            background: 'var(--bread-elements-messages-background)',
            linkColor: 'var(--bread-elements-messages-linkColor)',
            code: {
              background: 'var(--bread-elements-messages-code-background)',
            },
            inlineCode: {
              background: 'var(--bread-elements-messages-inlineCode-background)',
              text: 'var(--bread-elements-messages-inlineCode-text)',
            },
          },
          icon: {
            success: 'var(--bread-elements-icon-success)',
            error: 'var(--bread-elements-icon-error)',
            primary: 'var(--bread-elements-icon-primary)',
            secondary: 'var(--bread-elements-icon-secondary)',
            tertiary: 'var(--bread-elements-icon-tertiary)',
          },
          preview: {
            addressBar: {
              background: 'var(--bread-elements-preview-addressBar-background)',
              backgroundHover: 'var(--bread-elements-preview-addressBar-backgroundHover)',
              backgroundActive: 'var(--bread-elements-preview-addressBar-backgroundActive)',
              text: 'var(--bread-elements-preview-addressBar-text)',
              textActive: 'var(--bread-elements-preview-addressBar-textActive)',
            },
          },
          terminals: {
            background: 'var(--bread-elements-terminals-background)',
            buttonBackground: 'var(--bread-elements-terminals-buttonBackground)',
          },
          dividerColor: 'var(--bread-elements-dividerColor)',
          loader: {
            background: 'var(--bread-elements-loader-background)',
            progress: 'var(--bread-elements-loader-progress)',
          },
          prompt: {
            background: 'var(--bread-elements-prompt-background)',
          },
          sidebar: {
            dropdownShadow: 'var(--bread-elements-sidebar-dropdownShadow)',
            buttonBackgroundDefault: 'var(--bread-elements-sidebar-buttonBackgroundDefault)',
            buttonBackgroundHover: 'var(--bread-elements-sidebar-buttonBackgroundHover)',
            buttonText: 'var(--bread-elements-sidebar-buttonText)',
          },
          cta: {
            background: 'var(--bread-elements-cta-background)',
            text: 'var(--bread-elements-cta-text)',
          },
        },
      },
    },
    animation: {
      float: 'float 6s ease-in-out infinite',
    },
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-10px)' },
      },
    },
  },
  transformers: [transformerDirectives()],
  presets: [
    presetUno({
      dark: {
        light: '[data-theme="light"]',
        dark: '[data-theme="dark"]',
      },
    }),
    presetIcons({
      warn: true,
      collections: {
        ...customIconCollection,
      },
    }),
  ],
});

/**
 * Generates an alpha palette for a given hex color.
 */
function generateAlphaPalette(hex: string) {
  return [1, 2, 3, 4, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100].reduce(
    (acc, opacity) => {
      const alpha = Math.round((opacity / 100) * 255)
        .toString(16)
        .padStart(2, '0');

      acc[opacity] = `${hex}${alpha}`;

      return acc;
    },
    {} as Record<number, string>,
  );
}