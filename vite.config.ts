import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { defineConfig, Plugin } from 'vite';

function photoUploadPlugin(): Plugin {
  return {
    name: 'photo-upload-handler',
    configureServer(server) {
      server.middlewares.use('/api/upload-photo', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            const { slot, dataUrl } = parsed;
            const validSlots = ['photo1', 'photo2', 'photo3', 'me'];
            if (!validSlots.includes(slot) || !dataUrl) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid slot or missing dataUrl' }));
              return;
            }

            const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            const publicProfileDir = path.resolve(__dirname, 'public/assets/images/profile');
            const distProfileDir = path.resolve(__dirname, 'dist/assets/images/profile');

            fs.mkdirSync(publicProfileDir, { recursive: true });
            fs.mkdirSync(distProfileDir, { recursive: true });

            const targetJpg = path.join(publicProfileDir, `${slot}.jpg`);
            const distJpg = path.join(distProfileDir, `${slot}.jpg`);

            fs.writeFileSync(targetJpg, buffer);
            try {
              if (buffer.length > 1.2 * 1024 * 1024) {
                execSync(`convert "${targetJpg}" -auto-orient -resize "2400x2400>" -quality 90 "${targetJpg}"`);
              }
            } catch (_) {}
            try { fs.copyFileSync(targetJpg, distJpg); } catch (_) {}

            // Remove old fallback avif so the newly uploaded JPG is immediately loaded
            const targetAvif = path.join(publicProfileDir, `${slot}.avif`);
            const distAvif = path.join(distProfileDir, `${slot}.avif`);
            if (fs.existsSync(targetAvif)) {
              try { fs.unlinkSync(targetAvif); } catch (_) {}
            }
            if (fs.existsSync(distAvif)) {
              try { fs.unlinkSync(distAvif); } catch (_) {}
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              slot,
              url: `/assets/images/profile/${slot}.jpg?t=${Date.now()}`
            }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), photoUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
