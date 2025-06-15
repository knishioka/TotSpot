export const colors = {
  primary: '#4ECDC4',      // Soft Teal
  secondary: '#FF6B6B',    // Coral
  background: '#FAF9F6',   // Warm White
  white: '#FFFFFF',
  
  text: {
    primary: '#2D3436',    // Charcoal
    secondary: '#636E72',  // Slate Gray
    light: '#B2BEC3',      // Light Gray
  },
  
  success: '#95E1D3',      // Sage Green
  warning: '#FFA502',      // Amber
  error: '#FF6B6B',        // Coral
  
  border: '#E0E0E0',
  shadow: '#000000',
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};