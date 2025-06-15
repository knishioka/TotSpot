// Modern UK-inspired color palette for busy parents
export const colors = {
  // Primary colors - Inspired by modern UK brands (think Mumsnet, NHS, gov.uk)
  primary: '#005EA5',      // NHS Blue - trustworthy, professional
  primaryLight: '#4A90C2', // Light NHS Blue
  primaryDark: '#003D73',  // Dark NHS Blue
  
  // Secondary colors - Warm British tones
  secondary: '#F47738',    // British Orange (like Sainsbury's)
  secondaryLight: '#FF9A6B', // Light Orange
  secondaryDark: '#E55722', // Dark Orange
  
  // Accent colors - Modern British palette
  accent: '#7B68EE',       // Modern Purple (like Deliveroo)
  accentLight: '#9B88F5',  // Light Purple
  accentDark: '#5A47CC',   // Dark Purple
  
  // Background colors - Clean, contemporary
  background: '#FEFEFE',   // Almost White
  surface: '#FFFFFF',      // Pure White
  surfaceSecondary: '#F8F9FA', // Very Light Gray
  surfaceTertiary: '#F1F3F4', // Light Gray
  white: '#FFFFFF',
  
  // Text colors - High contrast for accessibility
  text: {
    primary: '#1A1A1A',    // Almost Black - excellent readability
    secondary: '#5F6368',  // Medium Gray (Google-inspired)
    tertiary: '#9AA0A6',   // Light Gray
    light: '#9AA0A6',      // Light Gray (alias for compatibility)
    inverse: '#FFFFFF',    // White text
    link: '#1A73E8',       // Modern Blue (Google-inspired)
  },
  
  // Border colors
  border: '#E8EAED',       // Light Gray border
  borderLight: '#F1F3F4',  // Very light border
  borderMedium: '#DADCE0', // Medium border
  
  // Status colors - Accessible and clear
  success: '#137333',      // Dark Green (Google)
  successLight: '#E6F4EA', // Light Green background
  warning: '#F29900',      // Amber (gov.uk inspired)
  warningLight: '#FEF7E0', // Light Amber background
  error: '#D93025',        // Red (Google)
  errorLight: '#FCE8E6',   // Light Red background
  info: '#1A73E8',         // Blue (Google)
  infoLight: '#E8F0FE',    // Light Blue background
  
  // Parent-focused semantic colors
  baby: '#FDE7F3',         // Soft Pink - baby facilities
  child: '#E3F2FD',        // Soft Blue - child facilities
  family: '#E8F5E8',       // Soft Green - family areas
  accessible: '#FFF3E0',   // Soft Orange - accessibility features
  
  // Interactive states
  interactive: {
    hover: '#F8F9FA',      // Light hover state
    pressed: '#F1F3F4',    // Pressed state
    focus: '#E8F0FE',      // Focus state (light blue)
    disabled: '#F8F9FA',   // Disabled background
    disabledText: '#9AA0A6', // Disabled text
  },
  
  // Shadow colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(0, 0, 0, 0.16)',
    elevation: 'rgba(0, 0, 0, 0.08)',
  },
};

// Typography system - UK gov.uk inspired, highly readable
export const typography = {
  // Headings - Clear hierarchy for busy parents
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 30,
    letterSpacing: -0.2,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 26,
    letterSpacing: 0,
  },
  h4: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
    letterSpacing: 0,
  },
  
  // Body text - Optimized for quick scanning
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 28,
    letterSpacing: 0,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  bodyMedium: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
    letterSpacing: 0,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  
  // Interactive text
  button: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 18,
    letterSpacing: 0.1,
  },
  buttonLarge: {
    fontSize: 18,
    fontWeight: '500' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },
  
  // Supporting text
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 18,
    letterSpacing: 0.1,
  },
  overline: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
  },
};

// Spacing system - 8px grid system (Material Design inspired)
export const spacing = {
  xs: 4,   // 0.25rem - tight spacing
  sm: 8,   // 0.5rem - small spacing
  md: 16,  // 1rem - standard spacing
  lg: 24,  // 1.5rem - large spacing
  xl: 32,  // 2rem - extra large spacing
  xxl: 48, // 3rem - section spacing
  xxxl: 64, // 4rem - page spacing
  
  // Component-specific spacing
  component: {
    cardPadding: 16,
    buttonPadding: 12,
    inputPadding: 14,
    listItemPadding: 16,
    sectionSpacing: 24,
    pageMargin: 20,
  },
};

// Border radius - Modern, subtle curves
export const borderRadius = {
  none: 0,
  sm: 4,   // Small radius for buttons
  md: 8,   // Standard radius for cards
  lg: 12,  // Large radius for modals
  xl: 16,  // Extra large for special components
  xxl: 24, // Very large for hero elements
  full: 999, // Circular/pill shape
  round: 999,
};

// Elevation system - Material Design inspired
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: colors.shadow.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.shadow.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: colors.shadow.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Button styles - UK gov.uk inspired
export const buttons = {
  primary: {
    backgroundColor: colors.primary,
    color: colors.text.inverse,
    borderRadius: borderRadius.sm,
    paddingVertical: 14,
    paddingHorizontal: 24,
    ...shadows.sm,
  },
  secondary: {
    backgroundColor: colors.surface,
    color: colors.primary,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: borderRadius.sm,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  tertiary: {
    backgroundColor: 'transparent',
    color: colors.primary,
    borderRadius: borderRadius.sm,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  danger: {
    backgroundColor: colors.error,
    color: colors.text.inverse,
    borderRadius: borderRadius.sm,
    paddingVertical: 14,
    paddingHorizontal: 24,
    ...shadows.sm,
  },
};

// Card styles - Clean, modern cards
export const cards = {
  default: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.sm,
  },
  elevated: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.md,
  },
  outlined: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
};

// Export everything as theme object
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  buttons,
  cards,
};

// Brand constants
export const brand = {
  name: 'TotSpot',
  tagline: 'Find family-friendly spots with confidence',
  description: 'The UK\'s most trusted app for finding child-friendly venues with detailed facility information.',
};

// Accessibility constants
export const accessibility = {
  minTouchTarget: 44, // Minimum touch target size
  maxLineLength: 75,  // Maximum characters per line for readability
  contrastRatio: {
    normal: 4.5,      // WCAG AA normal text
    large: 3.0,       // WCAG AA large text
    enhanced: 7.0,    // WCAG AAA
  },
};

export default theme;