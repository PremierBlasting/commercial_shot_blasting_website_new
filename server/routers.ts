import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getActiveGalleryItems,
  getAllGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getActiveTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getContactSubmissions,
  createContactSubmission,
  updateContactSubmissionStatus,
  deleteContactSubmission,
  getPublishedBlogPosts,
  getAllBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllSeoMetadata,
  getSeoMetadataByUrl,
  upsertSeoMetadata,
  deleteSeoMetadata,
  insertPerformanceMetric,
  getPerformanceMetricsSummary,
  getPerformanceMetricsByUrl,
  getAverageMetricsByName,
  getAllVersionHistory,
  getVersionHistoryById,
  createVersionHistory,
  markVersionAsCurrent,
  deleteVersionHistory,
  getAllBackupHistory,
  getBackupHistoryById,
  createBackupHistory,
  updateBackupHistory,
  deleteBackupHistory,
  exportAllData,
  restoreAllData,
} from "./db";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

// Admin check middleware
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Upload endpoint for S3 images
  upload: router({
    image: adminProcedure
      .input(z.object({
        fileName: z.string(),
        fileData: z.string(), // Base64 encoded
        contentType: z.string(),
        folder: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { fileName, fileData, contentType, folder = "gallery" } = input;
        
        // Decode base64 to buffer
        const buffer = Buffer.from(fileData, "base64");
        
        // Generate unique file key
        const ext = fileName.split(".").pop() || "jpg";
        const uniqueId = nanoid(10);
        const fileKey = `${folder}/${uniqueId}-${Date.now()}.${ext}`;
        
        // Upload to S3
        const { url } = await storagePut(fileKey, buffer, contentType);
        
        return { url, key: fileKey };
      }),

    // Upload with WebP variants for optimized loading
    imageWithWebP: adminProcedure
      .input(z.object({
        fileName: z.string(),
        mainData: z.string(), // Base64 encoded main image (JPEG)
        mainContentType: z.string(),
        webpData: z.string(), // Base64 encoded WebP version
        thumbnailData: z.string(), // Base64 encoded WebP thumbnail
        folder: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { fileName, mainData, mainContentType, webpData, thumbnailData, folder = "gallery" } = input;
        
        const uniqueId = nanoid(10);
        const timestamp = Date.now();
        const baseName = fileName.replace(/\.[^/.]+$/, "");
        
        // Upload main image (JPEG)
        const mainBuffer = Buffer.from(mainData, "base64");
        const mainKey = `${folder}/${uniqueId}-${timestamp}.jpg`;
        const { url: mainUrl } = await storagePut(mainKey, mainBuffer, mainContentType);
        
        // Upload WebP version
        const webpBuffer = Buffer.from(webpData, "base64");
        const webpKey = `${folder}/${uniqueId}-${timestamp}.webp`;
        const { url: webpUrl } = await storagePut(webpKey, webpBuffer, "image/webp");
        
        // Upload thumbnail WebP
        const thumbBuffer = Buffer.from(thumbnailData, "base64");
        const thumbKey = `${folder}/${uniqueId}-${timestamp}-thumb.webp`;
        const { url: thumbnailUrl } = await storagePut(thumbKey, thumbBuffer, "image/webp");
        
        return { 
          url: mainUrl, 
          key: mainKey,
          webpUrl,
          webpKey,
          thumbnailUrl,
          thumbnailKey: thumbKey,
        };
      }),
  }),

  // Gallery Items
  gallery: router({
    // Public: Get active gallery items
    list: publicProcedure.query(async () => {
      return await getActiveGalleryItems();
    }),
    
    // Admin: Get all gallery items
    listAll: adminProcedure.query(async () => {
      return await getAllGalleryItems();
    }),
    
    // Admin: Create gallery item
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        category: z.string().min(1),
        description: z.string().optional(),
        beforeImage: z.string().url(),
        afterImage: z.string().url(),
        isActive: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        await createGalleryItem(input);
        return { success: true };
      }),
    
    // Admin: Update gallery item
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        category: z.string().min(1).optional(),
        description: z.string().optional(),
        beforeImage: z.string().url().optional(),
        afterImage: z.string().url().optional(),
        isActive: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateGalleryItem(id, data);
        return { success: true };
      }),
    
    // Admin: Delete gallery item
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteGalleryItem(input.id);
        return { success: true };
      }),
  }),

  // Testimonials
  testimonials: router({
    // Public: Get active testimonials
    list: publicProcedure.query(async () => {
      const items = await getActiveTestimonials();
      // Parse images JSON string to array
      return items.map(item => ({
        ...item,
        images: item.images ? JSON.parse(item.images) : [],
      }));
    }),
    
    // Admin: Get all testimonials
    listAll: adminProcedure.query(async () => {
      const items = await getAllTestimonials();
      return items.map(item => ({
        ...item,
        images: item.images ? JSON.parse(item.images) : [],
      }));
    }),
    
    // Admin: Create testimonial
    create: adminProcedure
      .input(z.object({
        name: z.string().min(1),
        company: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        text: z.string().min(1),
        project: z.string().optional(),
        images: z.array(z.string()).optional(),
        isNew: z.boolean().optional(),
        isActive: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { images, ...rest } = input;
        await createTestimonial({
          ...rest,
          images: images ? JSON.stringify(images) : null,
        });
        return { success: true };
      }),
    
    // Admin: Update testimonial
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        company: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        text: z.string().min(1).optional(),
        project: z.string().optional(),
        images: z.array(z.string()).optional(),
        isNew: z.boolean().optional(),
        isActive: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, images, ...rest } = input;
        await updateTestimonial(id, {
          ...rest,
          ...(images !== undefined ? { images: JSON.stringify(images) } : {}),
        });
        return { success: true };
      }),
    
    // Admin: Delete testimonial
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteTestimonial(input.id);
        return { success: true };
      }),
  }),

  // Contact Form Submissions
  contact: router({
    // Public: Submit contact form
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        message: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        await createContactSubmission(input);
        return { success: true };
      }),
    
    // Admin: Get all submissions
    list: adminProcedure.query(async () => {
      return await getContactSubmissions();
    }),
    
    // Admin: Update status
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "read", "replied", "archived"]),
      }))
      .mutation(async ({ input }) => {
        await updateContactSubmissionStatus(input.id, input.status);
        return { success: true };
      }),
    
    // Admin: Toggle read status
    toggleRead: adminProcedure
      .input(z.object({
        id: z.number(),
        isRead: z.boolean(),
      }))
      .mutation(async ({ input }) => {
        await updateContactSubmissionStatus(input.id, input.isRead ? "read" : "new");
        return { success: true };
      }),
    
    // Admin: Delete submission
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteContactSubmission(input.id);
        return { success: true };
      }),
  }),

  // Blog Posts
  blog: router({
    // Public: Get published blog posts
    list: publicProcedure.query(async () => {
      return await getPublishedBlogPosts();
    }),
    
    // Public: Get blog post by slug
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await getBlogPostBySlug(input.slug);
      }),
    
    // Admin: Get all blog posts
    listAll: adminProcedure.query(async () => {
      return await getAllBlogPosts();
    }),
    
    // Admin: Create blog post
    create: adminProcedure
      .input(z.object({
        slug: z.string().min(1),
        title: z.string().min(1),
        excerpt: z.string().min(1),
        content: z.string().min(1),
        featuredImage: z.string().url(),
        author: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(), // JSON string
        metaDescription: z.string().optional(),
        isPublished: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        await createBlogPost(input);
        return { success: true };
      }),
    
    // Admin: Update blog post
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        slug: z.string().min(1).optional(),
        title: z.string().min(1).optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        featuredImage: z.string().url().optional(),
        author: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        metaDescription: z.string().optional(),
        isPublished: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateBlogPost(id, data);
        return { success: true };
      }),
    
    // Admin: Delete blog post
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteBlogPost(input.id);
        return { success: true };
      }),
  }),

  // Call Tracking Analytics
  callTracking: router({
    // Log a call button click
    logCall: publicProcedure
      .input(z.object({
        location: z.string(),
        phoneNumber: z.string(),
        userAgent: z.string().optional(),
        referrer: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { getDb } = await import("./db");
        const { callTrackingEvents } = await import("../drizzle/schema");
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
        
        await db.insert(callTrackingEvents).values({
          location: input.location,
          phoneNumber: input.phoneNumber,
          userAgent: input.userAgent,
          ipAddress: ctx.req.ip || ctx.req.socket.remoteAddress,
          referrer: input.referrer,
          userId: ctx.user?.id,
        });
        
        return { success: true };
      }),
    
    // Get call analytics (admin only)
    getAnalytics: adminProcedure
      .input(z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }))
      .query(async ({ input }) => {
        const { getDb } = await import("./db");
        const { callTrackingEvents } = await import("../drizzle/schema");
        const { sql, gte, lte, and } = await import("drizzle-orm");
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
        
        let conditions = [];
        if (input.startDate) {
          conditions.push(gte(callTrackingEvents.createdAt, new Date(input.startDate)));
        }
        if (input.endDate) {
          conditions.push(lte(callTrackingEvents.createdAt, new Date(input.endDate)));
        }
        
        const events = await db.select()
          .from(callTrackingEvents)
          .where(conditions.length > 0 ? and(...conditions) : undefined)
          .orderBy(callTrackingEvents.createdAt);
        
        return events;
      }),
    
    // Get call statistics by location (admin only)
    getLocationStats: adminProcedure
      .query(async () => {
        const { getDb } = await import("./db");
        const { callTrackingEvents } = await import("../drizzle/schema");
        const { sql } = await import("drizzle-orm");
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
        
        const stats = await db.select({
          location: callTrackingEvents.location,
          count: sql<number>`count(*)`
        })
        .from(callTrackingEvents)
        .groupBy(callTrackingEvents.location)
        .orderBy(sql`count(*) DESC`);
        
        return stats;
      }),
  }),

  // SEO Metadata Management
  seo: router({
    // Admin: Get all SEO metadata
    listAll: adminProcedure.query(async () => {
      return await getAllSeoMetadata();
    }),
    
    // Public: Get SEO metadata by URL
    getByUrl: publicProcedure
      .input(z.object({ pageUrl: z.string() }))
      .query(async ({ input }) => {
        return await getSeoMetadataByUrl(input.pageUrl);
      }),
    
    // Admin: Upsert SEO metadata
    upsert: adminProcedure
      .input(z.object({
        pageUrl: z.string(),
        pageType: z.enum(['static', 'service', 'location', 'blog']),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        h1: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await upsertSeoMetadata(input);
        return { success: true };
      }),
    
    // Admin: Delete SEO metadata
    delete: adminProcedure
      .input(z.object({ pageUrl: z.string() }))
      .mutation(async ({ input }) => {
        await deleteSeoMetadata(input.pageUrl);
        return { success: true };
      }),
  }),

  // Performance monitoring
  performance: router({
    // Public: Report performance metric
    report: publicProcedure
      .input(z.object({
        name: z.string(),
        value: z.number(),
        rating: z.string(),
        delta: z.number(),
        id: z.string(),
        navigationType: z.string().optional(),
        url: z.string(),
        userAgent: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await insertPerformanceMetric({
          name: input.name,
          value: input.value,
          rating: input.rating,
          delta: input.delta,
          metricId: input.id,
          navigationType: input.navigationType || null,
          url: input.url,
          userAgent: input.userAgent || null,
        });
        return { success: true };
      }),

    // Admin: Get performance summary
    getSummary: adminProcedure
      .input(z.object({ days: z.number().optional() }))
      .query(async ({ input }) => {
        return await getPerformanceMetricsSummary(input.days || 7);
      }),

    // Admin: Get metrics by URL
    getByUrl: adminProcedure
      .input(z.object({ url: z.string(), limit: z.number().optional() }))
      .query(async ({ input }) => {
        return await getPerformanceMetricsByUrl(input.url, input.limit || 100);
      }),

    // Admin: Get average metrics by name
    getAverageByName: adminProcedure
      .input(z.object({ metricName: z.string(), days: z.number().optional() }))
      .query(async ({ input }) => {
        return await getAverageMetricsByName(input.metricName, input.days || 7);
      }),
  }),

  // Version History management
  versionHistory: router({
    // Admin: List all versions
    listAll: adminProcedure
      .query(async () => {
        return await getAllVersionHistory();
      }),

    // Admin: Get version by ID
    getById: adminProcedure
      .input(z.object({ versionId: z.string() }))
      .query(async ({ input }) => {
        return await getVersionHistoryById(input.versionId);
      }),

    // Admin: Create new version record
    create: adminProcedure
      .input(z.object({
        versionId: z.string(),
        description: z.string().optional(),
        changesSummary: z.string().optional(),
        createdBy: z.string().optional(),
        screenshotUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await createVersionHistory(input);
      }),

    // Admin: Mark version as current (after rollback)
    markAsCurrent: adminProcedure
      .input(z.object({ versionId: z.string() }))
      .mutation(async ({ input }) => {
        await markVersionAsCurrent(input.versionId);
        return { success: true };
      }),

    // Admin: Delete version
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteVersionHistory(input.id);
        return { success: true };
      }),
  }),

  // Backup and Restore management
  backup: router({
    // Admin: List all backups
    listAll: adminProcedure
      .query(async () => {
        return await getAllBackupHistory();
      }),

    // Admin: Get backup by ID
    getById: adminProcedure
      .input(z.object({ backupId: z.string() }))
      .query(async ({ input }) => {
        return await getBackupHistoryById(input.backupId);
      }),

    // Admin: Create new backup
    create: adminProcedure
      .input(z.object({
        description: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const backupId = `backup-${Date.now()}-${nanoid(8)}`;
        
        try {
          // Create backup record
          const backup = await createBackupHistory({
            backupId,
            description: input.description || `Backup created on ${new Date().toLocaleString()}`,
            createdBy: ctx.user.name || ctx.user.email || "Unknown",
            status: "creating",
          });

          // Export all data
          const allData = await exportAllData();
          
          // Create backup object
          const backupData = {
            version: "1.0",
            timestamp: new Date().toISOString(),
            tables: allData,
            metadata: {
              backupId,
              description: backup.description,
              createdBy: backup.createdBy,
              createdAt: backup.createdAt,
            },
          };

          // Convert to JSON and upload to S3
          const backupJson = JSON.stringify(backupData, null, 2);
          const backupBuffer = Buffer.from(backupJson, 'utf-8');
          
          const { url } = await storagePut(
            `backups/${backupId}.json`,
            backupBuffer,
            "application/json"
          );

          // Update backup record with file info
          await updateBackupHistory(backupId, {
            fileUrl: url,
            fileSize: backupBuffer.length,
            tablesIncluded: JSON.stringify(Object.keys(allData)),
            filesIncluded: 0, // File references are in the data, not separate files
            status: "completed",
          });

          return { success: true, backupId, fileUrl: url };
        } catch (error) {
          // Mark backup as failed
          await updateBackupHistory(backupId, {
            status: "failed",
          });
          throw error;
        }
      }),

    // Admin: Download backup
    download: adminProcedure
      .input(z.object({ backupId: z.string() }))
      .query(async ({ input }) => {
        const backup = await getBackupHistoryById(input.backupId);
        if (!backup || !backup.fileUrl) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Backup not found' });
        }
        return { fileUrl: backup.fileUrl };
      }),

    // Admin: Delete backup
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteBackupHistory(input.id);
        return { success: true };
      }),

    // Admin: Restore from backup
    restore: adminProcedure
      .input(z.object({ backupId: z.string() }))
      .mutation(async ({ input }) => {
        const backup = await getBackupHistoryById(input.backupId);
        if (!backup || !backup.fileUrl) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Backup not found' });
        }

        try {
          // Fetch backup file from S3
          const response = await fetch(backup.fileUrl);
          if (!response.ok) {
            throw new Error('Failed to fetch backup file');
          }

          const backupData = await response.json();
          
          // Validate backup structure
          if (!backupData.tables || !backupData.version) {
            throw new Error('Invalid backup file format');
          }

          // Restore data
          await restoreAllData(backupData.tables);

          return { 
            success: true, 
            message: `Restored ${Object.keys(backupData.tables).length} tables from backup` 
          };
        } catch (error) {
          throw new TRPCError({ 
            code: 'INTERNAL_SERVER_ERROR', 
            message: `Restore failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
