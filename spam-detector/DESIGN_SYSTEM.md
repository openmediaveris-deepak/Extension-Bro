# 🎨 Design System

Spam Detector uses a premium design system inspired by Apple, Google, and Uber.

## Color Palette

### Primary (Purple)
- 500: `#8b5cf6` - Main brand color
- 600: `#7c3aed` - Hover states
- 700: `#6d28d9` - Active states

### Accent (Pink)
- 500: `#d946ef` - Accent highlights
- 600: `#c026d3` - Accent hover

### Luxury
- Dark: `#1a1a2e` - Premium dark backgrounds
- Light: `#f8f9fa` - Clean light backgrounds
- Gold: `#ffd700` - Premium accents

## Gradients

### Primary Gradient
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Accent Gradient
```css
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

### Premium Gradient
```css
background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
```

## Typography

- Font Family: SF Pro Display, Segoe UI, Roboto, sans-serif
- Optimized text rendering for crisp display

## Shadows

- `shadow-luxury`: Subtle elevation
- `shadow-luxury-lg`: Prominent elevation
- `shadow-inner-luxury`: Inset depth

## Usage

Apply gradients with Tailwind classes:
```tsx
<div className="bg-gradient-luxury">...</div>
<button className="shadow-luxury">...</button>
```
