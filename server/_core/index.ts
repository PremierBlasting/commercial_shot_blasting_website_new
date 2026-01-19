import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  
  // Sitemap endpoint
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const { getAllBlogPosts } = await import("../db");
      const blogPosts = await getAllBlogPosts();
      
      const baseUrl = req.protocol + '://' + req.get('host');
      const now = new Date().toISOString();
      
      // Static pages
      const staticPages = [
        { url: '', priority: '1.0', changefreq: 'daily' as const, lastmod: now },
        { url: '/about', priority: '0.8', changefreq: 'monthly' as const, lastmod: now },
        { url: '/contact', priority: '0.8', changefreq: 'monthly' as const, lastmod: now },
        { url: '/gallery', priority: '0.7', changefreq: 'weekly' as const, lastmod: now },
        { url: '/blog', priority: '0.9', changefreq: 'daily' as const, lastmod: now },
        { url: '/service-areas', priority: '0.9', changefreq: 'weekly' as const, lastmod: now },
      ];
      
      // Service pages
      const servicePages = [
        '/services/structural-steel-frames',
        '/services/fire-escapes',
        '/services/staircases',
        '/services/bridge-steelwork',
        '/services/crane-beams',
        '/services/ladders',
        '/services/warehouse-racking',
        '/services/pipework',
        '/services/telecom-towers',
      ].map(url => ({ url, priority: '0.8', changefreq: 'monthly' as const, lastmod: now }));
      
      // Location pages
      const locationPages = [
        '/service-areas/birmingham',
        '/service-areas/coventry',
        '/service-areas/leicester',
        '/service-areas/nottingham',
        '/service-areas/derby',
        '/service-areas/wolverhampton',
        '/service-areas/stoke-on-trent',
        '/service-areas/worcester',
        '/service-areas/gloucester',
        '/service-areas/hereford',
        '/service-areas/shrewsbury',
        '/service-areas/telford',
        '/service-areas/stafford',
        '/service-areas/burton-upon-trent',
        '/service-areas/tamworth',
        '/service-areas/cannock',
        '/service-areas/kidderminster',
        '/service-areas/redditch',
        '/service-areas/bromsgrove',
        '/service-areas/solihull',
        '/service-areas/walsall',
        '/service-areas/dudley',
        '/service-areas/west-bromwich',
        '/service-areas/sutton-coldfield',
        '/service-areas/rugby',
        '/service-areas/nuneaton',
        '/service-areas/bedworth',
        '/service-areas/warwick',
        '/service-areas/leamington-spa',
        '/service-areas/stratford-upon-avon',
        '/service-areas/kenilworth',
        '/service-areas/northampton',
        '/service-areas/chesterfield',
        '/service-areas/bradford',
        '/service-areas/peterborough',
        '/service-areas/oxford',
        '/service-areas/wrexham',
      ].map(url => ({ url, priority: '0.7', changefreq: 'monthly' as const, lastmod: now }));
      
      // Blog posts
      const blogPostPages = blogPosts
        .filter(post => post.isPublished)
        .map(post => ({
          url: `/blog/${post.slug}`,
          priority: '0.6',
          changefreq: 'monthly' as const,
          lastmod: post.updatedAt ? new Date(post.updatedAt).toISOString() : now
        }));
      
      // Build XML
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      
      // Add all pages
      [...staticPages, ...servicePages, ...locationPages, ...blogPostPages].forEach(page => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
        xml += `    <lastmod>${page.lastmod || now}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += '  </url>\n';
      });
      
      xml += '</urlset>';
      
      res.header('Content-Type', 'application/xml');
      res.send(xml);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      res.status(500).send('Error generating sitemap');
    }
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
