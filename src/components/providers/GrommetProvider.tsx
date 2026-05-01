import { Grommet, ThemeType } from 'grommet';
import { ReactNode } from 'react';

// Custom Grommet theme that aligns with Vibemakers design system
const vibeTheme: ThemeType = {
  global: {
    colors: {
      brand: 'hsl(262, 83%, 58%)', // Primary purple
      'brand-light': 'hsl(262, 83%, 68%)',
      focus: 'hsl(262, 83%, 58%)',
      'accent-1': 'hsl(280, 100%, 70%)',
      'accent-2': 'hsl(262, 83%, 58%)',
      'neutral-1': 'hsl(240, 10%, 3.9%)',
      'neutral-2': 'hsl(240, 5.9%, 10%)',
      text: {
        dark: 'hsl(0, 0%, 98%)',
        light: 'hsl(240, 10%, 3.9%)',
      },
      background: {
        dark: 'hsl(240, 10%, 3.9%)',
        light: 'hsl(0, 0%, 100%)',
      },
      border: {
        dark: 'hsl(240, 3.7%, 15.9%)',
        light: 'hsl(240, 5.9%, 90%)',
      },
      control: 'brand',
    },
    font: {
      family: "'Space Grotesk', 'Inter', sans-serif",
      size: '16px',
      height: '24px',
    },
    focus: {
      border: {
        color: 'brand',
      },
      outline: {
        color: 'brand',
        size: '2px',
      },
      shadow: {
        color: 'brand',
        size: '2px',
      },
    },
    control: {
      border: {
        radius: '8px',
        width: '1px',
      },
    },
    input: {
      weight: 400,
      padding: {
        horizontal: '12px',
        vertical: '10px',
      },
    },
    elevation: {
      light: {
        small: '0 1px 2px rgba(0, 0, 0, 0.08)',
        medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
        large: '0 8px 16px rgba(0, 0, 0, 0.12)',
      },
      dark: {
        small: '0 1px 2px rgba(0, 0, 0, 0.2)',
        medium: '0 4px 8px rgba(0, 0, 0, 0.3)',
        large: '0 8px 16px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  button: {
    border: {
      radius: '8px',
      width: '1px',
    },
    padding: {
      horizontal: '16px',
      vertical: '8px',
    },
    primary: {
      background: { color: 'brand' },
      border: { color: 'brand' },
      color: 'white',
      font: { weight: 500 },
    },
    secondary: {
      background: { color: 'transparent' },
      border: { color: 'brand', width: '1px' },
      color: 'brand',
      font: { weight: 500 },
    },
    default: {
      background: { color: 'transparent' },
      border: { color: 'border' },
      color: 'text',
    },
    hover: {
      primary: {
        background: { color: 'brand-light' },
      },
      secondary: {
        background: { color: 'brand', opacity: 0.1 },
      },
    },
    size: {
      small: {
        border: { radius: '6px' },
        pad: { horizontal: '12px', vertical: '6px' },
      },
      medium: {
        border: { radius: '8px' },
        pad: { horizontal: '16px', vertical: '10px' },
      },
      large: {
        border: { radius: '10px' },
        pad: { horizontal: '24px', vertical: '12px' },
      },
    },
  },
  card: {
    container: {
      background: 'background',
      elevation: 'small',
      round: '12px',
    },
    header: {
      pad: { horizontal: '24px', vertical: '16px' },
    },
    body: {
      pad: { horizontal: '24px', vertical: '16px' },
    },
    footer: {
      pad: { horizontal: '24px', vertical: '16px' },
    },
  },
  textInput: {
    container: {
      extend: `
        border-radius: 8px;
      `,
    },
  },
  formField: {
    border: {
      color: 'border',
      position: 'outer',
      side: 'all',
    },
    content: {
      pad: 'small',
    },
    label: {
      margin: { horizontal: '0', vertical: '8px' },
      size: 'small',
      weight: 500,
    },
    round: '8px',
  },
  select: {
    control: {
      extend: `
        border-radius: 8px;
      `,
    },
  },
  checkBox: {
    border: {
      color: 'border',
      width: '2px',
    },
    check: {
      radius: '4px',
    },
    color: 'brand',
    hover: {
      border: {
        color: 'brand',
      },
    },
    size: '20px',
    toggle: {
      radius: '20px',
      size: '40px',
    },
  },
};

interface GrommetProviderProps {
  children: ReactNode;
}

export function GrommetProvider({ children }: GrommetProviderProps) {
  return (
    <Grommet theme={vibeTheme} full={false} cssVars>
      {children}
    </Grommet>
  );
}
