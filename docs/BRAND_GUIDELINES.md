# Knoux Clipboard AI - Brand & Design Guidelines

## 1. Logo Usage
The Knoux logo represents intelligence, efficiency, and seamless integration.

- **Primary Logo**: The Clipboard icon with a gradient fill (Primary to Secondary) and the "Knoux" wordmark in bold.
- **Icon Only**: The gradient Clipboard icon on its own.
- **Monochrome**: Use pure white or black for high-contrast applications.
- **Clear Space**: Maintain at least 50% of the logo height as clear space around the logo.

## 2. Color System

### Primary Palette (Midnight Theme)
- **Primary (Smart Blue)**: `#667EEA` - Used for primary actions, active states, and brand identity.
- **Secondary (AI Green)**: `#00D4AA` - Used for success states, AI features, and accents.
- **Accent (Purple-Blue)**: `#764BA2` - Used for gradients and special highlights.
- **Background**: `#0F0F1A` - Deep dark blue/black for main application background.
- **Surface**: `#1A1A2E` - Slightly lighter for cards, sidebars, and panels.

### Secondary Palette (Daylight Theme)
- **Primary**: `#4F46E5`
- **Secondary**: `#059669`
- **Background**: `#F8FAFC`
- **Surface**: `#FFFFFF`

### Functional Colors
- **Success**: `#00D4AA`
- **Warning**: `#FFA502`
- **Error**: `#FF4757`
- **Info**: `#667EEA`

## 3. Typography
Knoux uses a modern, sans-serif font stack prioritizing readability and clean aesthetics.

- **Font Family**: `Inter`, `system-ui`, `-apple-system`, `sans-serif`.
- **Weights**:
  - **Regular (400)**: Body text.
  - **Medium (500)**: Labels, buttons, navigation.
  - **Bold (700)**: Headings, emphasis.

### Type Scale
- **H1**: 24px (1.5rem) - Page Titles
- **H2**: 20px (1.25rem) - Section Headers
- **H3**: 18px (1.125rem) - Card Titles
- **Body**: 14px (0.875rem) - Standard Text
- **Small**: 12px (0.75rem) - Captions, Metadata

## 4. Iconography
Icons should be consistent, clear, and follow the "Outline" style with 2px stroke width.

- **Library**: Lucide React
- **Style**: Rounded line caps and joins.
- **Size**: 
  - Small: 16px
  - Medium (Default): 20px
  - Large: 24px
- **Usage**: Use icons to enhance navigation and indicate actions. Do not rely solely on icons without labels for complex actions.

## 5. Components

### Buttons
- **Primary**: Gradient background, white text, rounded corners (8px/12px).
- **Secondary**: Transparent background, border (1px), text color matches border.
- **Ghost**: No background/border, hover effect only.

### Cards
- **Background**: Surface color (`#1A1A2E` dark / `#FFFFFF` light).
- **Border**: 1px solid `rgba(255, 255, 255, 0.05)`.
- **Shadow**: `lg` or `xl` for elevation.
- **Glassmorphism**: Use `backdrop-blur-xl` and semi-transparent backgrounds for overlays and floating panels.

### Inputs
- **Background**: Darker/Lighter than surface.
- **Border**: 1px solid border, focused state has primary color ring.
- **Radius**: 8px or 12px.

## 6. Spacing & Layout
- **Grid System**: 12-column grid for dashboard layouts.
- **Spacing Scale**: Based on 4px (Tailwind scale).
  - `p-2` (8px), `p-4` (16px), `p-6` (24px), `p-8` (32px).
- **Container**: Max-width constraints for readability on large screens.

## 7. Animations
- **Duration**: 200ms - 300ms for UI interactions.
- **Easing**: `ease-in-out` or `cubic-bezier`.
- **Types**:
  - `Fade In`: For page transitions and modals.
  - `Slide Up`: For toast notifications.
  - `Pulse`: For loading states and AI processing.
