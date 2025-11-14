/**
 * Generate professional "Is True?" extension icons
 * Theme: Fact-checking with checkmark and shield
 */
import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Premium gradient colors - Gold and Royal Blue theme
const colors = {
  primary: '#0F172A',    // Royal Blue (dark)
  secondary: '#312E81',  // Indigo
  accent: '#F59E0B',     // Gold
  highlight: '#D97706'   // Amber
};

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Create gradient background (Royal Blue to Indigo)
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, colors.primary);
  gradient.addColorStop(0.5, colors.secondary);
  gradient.addColorStop(1, '#1E1B4B'); // Deep indigo

  // Draw rounded rectangle background
  const radius = size * 0.22;
  ctx.fillStyle = gradient;
  roundRect(ctx, 0, 0, size, size, radius);
  ctx.fill();

  // Add subtle shine effect
  const shine = ctx.createLinearGradient(0, 0, 0, size * 0.4);
  shine.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
  shine.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = shine;
  roundRect(ctx, 0, 0, size, size, radius);
  ctx.fill();

  const centerX = size / 2;
  const centerY = size / 2;
  const scale = size / 100;

  // Draw shield shape with gold gradient
  const shieldGradient = ctx.createLinearGradient(
    centerX - 20 * scale, 
    centerY - 25 * scale,
    centerX + 20 * scale, 
    centerY + 30 * scale
  );
  shieldGradient.addColorStop(0, colors.accent);
  shieldGradient.addColorStop(1, colors.highlight);

  ctx.fillStyle = shieldGradient;
  ctx.shadowColor = 'rgba(245, 158, 11, 0.5)';
  ctx.shadowBlur = size * 0.08;
  ctx.shadowOffsetY = size * 0.02;

  // Shield path
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - 28 * scale); // Top point
  ctx.lineTo(centerX + 20 * scale, centerY - 20 * scale); // Top right
  ctx.lineTo(centerX + 20 * scale, centerY + 8 * scale); // Right side
  ctx.quadraticCurveTo(
    centerX + 20 * scale, 
    centerY + 20 * scale,
    centerX + 10 * scale,
    centerY + 28 * scale
  );
  ctx.quadraticCurveTo(
    centerX,
    centerY + 32 * scale,
    centerX - 10 * scale,
    centerY + 28 * scale
  );
  ctx.quadraticCurveTo(
    centerX - 20 * scale,
    centerY + 20 * scale,
    centerX - 20 * scale,
    centerY + 8 * scale
  );
  ctx.lineTo(centerX - 20 * scale, centerY - 20 * scale); // Left side
  ctx.closePath();
  ctx.fill();

  // Draw checkmark inside shield
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = size * 0.08;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = size * 0.03;
  ctx.shadowOffsetY = size * 0.01;

  ctx.beginPath();
  ctx.moveTo(centerX - 10 * scale, centerY + 2 * scale);
  ctx.lineTo(centerX - 3 * scale, centerY + 10 * scale);
  ctx.lineTo(centerX + 12 * scale, centerY - 8 * scale);
  ctx.stroke();

  return canvas;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Generate icons
const sizes = [16, 48, 128];
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

sizes.forEach(size => {
  const canvas = generateIcon(size);
  const buffer = canvas.toBuffer('image/png');
  const filename = path.join(iconsDir, `${size}.png`);
  fs.writeFileSync(filename, buffer);
  console.log(`✅ Generated ${size}x${size} icon for Is True?`);
});

console.log('🎉 All "Is True?" icons generated successfully!');
console.log('📁 Icons saved to: public/icons/');
console.log('🔨 Run "npm run build" to copy icons to dist folder');
