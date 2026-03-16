/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import path from 'path';
import fs from 'fs';

export default {
    nodeResolve: true,
    preserveSymlinks: true,
    rootDir: ".",
    appIndex: "src/index.html",
    open: "/",
    middleware: [
        // Redirect root to src/index.html
        function serveRoot(context, next) {
            if (context.url === '/' || context.url === '/index.html') {
                context.url = '/src/index.html';
            }
            return next();
        },
        // Serve .js files from build/ folder
        function serveJsFromBuild(context, next) {
            if (context.url.endsWith('.js') || context.url.endsWith('.js.map')) {
                const buildPath = path.join(process.cwd(), 'build', path.basename(context.url));
                if (fs.existsSync(buildPath)) {
                    context.url = '/build' + '/' + path.basename(context.url);
                }
            }
            return next();
        },
        // Serve iframe.html from src/iframe.html
        function serveIframe(context, next) {
            if (context.url === '/iframe.html') {
                context.url = '/src/iframe.html';
            }
            return next();
        },
        // Serve /images from src/images
        function serveImages(context, next) {
            if (context.url.startsWith('/images/')) {
                context.url = '/src' + context.url;
            }
            return next();
        }
    ]
};