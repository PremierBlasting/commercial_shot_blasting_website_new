import { eq, desc, asc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  galleryItems, 
  InsertGalleryItem, 
  GalleryItem,
  testimonials, 
  InsertTestimonial, 
  Testimonial,
  contactSubmissions, 
  InsertContactSubmission, 
  ContactSubmission,
  blogPosts,
  InsertBlogPost,
  BlogPost,
  seoMetadata,
  InsertSeoMetadata,
  SeoMetadata,
  performanceMetrics,
  InsertPerformanceMetric,
  PerformanceMetric,
  versionHistory,
  InsertVersionHistory,
  VersionHistory,
  backupHistory,
  InsertBackupHistory,
  BackupHistory
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ==================== Gallery Items ====================

export async function getActiveGalleryItems(): Promise<GalleryItem[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(galleryItems)
    .where(eq(galleryItems.isActive, true))
    .orderBy(asc(galleryItems.sortOrder), desc(galleryItems.createdAt));
  
  return result;
}

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(galleryItems)
    .orderBy(asc(galleryItems.sortOrder), desc(galleryItems.createdAt));
  
  return result;
}

export async function createGalleryItem(item: InsertGalleryItem): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(galleryItems).values(item);
}

export async function updateGalleryItem(id: number, item: Partial<InsertGalleryItem>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(galleryItems).set(item).where(eq(galleryItems.id, id));
}

export async function deleteGalleryItem(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(galleryItems).where(eq(galleryItems.id, id));
}

// ==================== Testimonials ====================

export async function getActiveTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isActive, true))
    .orderBy(asc(testimonials.sortOrder), desc(testimonials.createdAt));
  
  return result;
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(testimonials)
    .orderBy(asc(testimonials.sortOrder), desc(testimonials.createdAt));
  
  return result;
}

export async function createTestimonial(item: InsertTestimonial): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(testimonials).values(item);
}

export async function updateTestimonial(id: number, item: Partial<InsertTestimonial>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(testimonials).set(item).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

// ==================== Contact Submissions ====================

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));
  
  return result;
}

export async function createContactSubmission(submission: InsertContactSubmission): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(contactSubmissions).values(submission);
}

export async function updateContactSubmissionStatus(
  id: number, 
  status: "new" | "read" | "replied" | "archived"
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(contactSubmissions).set({ status }).where(eq(contactSubmissions.id, id));
}

export async function deleteContactSubmission(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
}

// ==================== Blog Posts ====================

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.isPublished, true))
    .orderBy(desc(blogPosts.publishedAt));
  
  return result;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt));
  
  return result;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);
  
  return result[0];
}

export async function createBlogPost(post: InsertBlogPost): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(blogPosts).values(post);
}

export async function updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(blogPosts).set(post).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

// ========== SEO Metadata ==========

export async function getAllSeoMetadata(): Promise<SeoMetadata[]> {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(seoMetadata).orderBy(asc(seoMetadata.pageType), asc(seoMetadata.pageUrl));
  } catch (error) {
    console.error("[Database] Failed to get SEO metadata:", error);
    return [];
  }
}

export async function getSeoMetadataByUrl(pageUrl: string): Promise<SeoMetadata | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  try {
    const results = await db.select().from(seoMetadata).where(eq(seoMetadata.pageUrl, pageUrl)).limit(1);
    return results[0];
  } catch (error) {
    console.error("[Database] Failed to get SEO metadata by URL:", error);
    return undefined;
  }
}

export async function upsertSeoMetadata(data: InsertSeoMetadata): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    const existing = await getSeoMetadataByUrl(data.pageUrl);
    
    if (existing) {
      await db.update(seoMetadata)
        .set({
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          h1: data.h1,
          pageType: data.pageType,
        })
        .where(eq(seoMetadata.pageUrl, data.pageUrl));
    } else {
      await db.insert(seoMetadata).values(data);
    }
  } catch (error) {
    console.error("[Database] Failed to upsert SEO metadata:", error);
    throw error;
  }
}

export async function deleteSeoMetadata(pageUrl: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    await db.delete(seoMetadata).where(eq(seoMetadata.pageUrl, pageUrl));
  } catch (error) {
    console.error("[Database] Failed to delete SEO metadata:", error);
    throw error;
  }
}

// ========================================
// Performance Metrics
// ========================================

export async function insertPerformanceMetric(data: InsertPerformanceMetric) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(performanceMetrics).values(data);
}

export async function getPerformanceMetricsSummary(days: number = 7) {
  const db = await getDb();
  if (!db) return [];
  
  const since = new Date();
  since.setDate(since.getDate() - days);
  
  return db
    .select()
    .from(performanceMetrics)
    .where(sql`${performanceMetrics.createdAt} >= ${since}`)
    .orderBy(desc(performanceMetrics.createdAt));
}

export async function getPerformanceMetricsByUrl(url: string, limit: number = 100) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(performanceMetrics)
    .where(eq(performanceMetrics.url, url))
    .orderBy(desc(performanceMetrics.createdAt))
    .limit(limit);
}

export async function getAverageMetricsByName(metricName: string, days: number = 7) {
  const db = await getDb();
  if (!db) return [];
  
  const since = new Date();
  since.setDate(since.getDate() - days);
  
  return db
    .select({
      avgValue: sql<number>`AVG(${performanceMetrics.value})`,
      count: sql<number>`COUNT(*)`,
      goodCount: sql<number>`SUM(CASE WHEN ${performanceMetrics.rating} = 'good' THEN 1 ELSE 0 END)`,
      needsImprovementCount: sql<number>`SUM(CASE WHEN ${performanceMetrics.rating} = 'needs-improvement' THEN 1 ELSE 0 END)`,
      poorCount: sql<number>`SUM(CASE WHEN ${performanceMetrics.rating} = 'poor' THEN 1 ELSE 0 END)`,
    })
    .from(performanceMetrics)
    .where(sql`${performanceMetrics.name} = ${metricName} AND ${performanceMetrics.createdAt} >= ${since}`);
}


// ============================================
// Version History helpers
// ============================================

export async function getAllVersionHistory(): Promise<VersionHistory[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(versionHistory)
    .orderBy(desc(versionHistory.createdAt));
}

export async function getVersionHistoryById(versionId: string): Promise<VersionHistory | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const results = await db
    .select()
    .from(versionHistory)
    .where(eq(versionHistory.versionId, versionId))
    .limit(1);
  
  return results[0];
}

export async function createVersionHistory(data: InsertVersionHistory): Promise<VersionHistory> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Mark all existing versions as not current
  await db
    .update(versionHistory)
    .set({ isCurrent: false });
  
  const result = await db
    .insert(versionHistory)
    .values({
      ...data,
      isCurrent: true
    });
  
  const insertedId = result[0].insertId;
  const inserted = await db
    .select()
    .from(versionHistory)
    .where(eq(versionHistory.id, insertedId))
    .limit(1);
  
  return inserted[0];
}

export async function markVersionAsCurrent(versionId: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Mark all versions as not current
  await db
    .update(versionHistory)
    .set({ isCurrent: false });
  
  // Mark the specified version as current
  await db
    .update(versionHistory)
    .set({ isCurrent: true })
    .where(eq(versionHistory.versionId, versionId));
}

export async function deleteVersionHistory(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .delete(versionHistory)
    .where(eq(versionHistory.id, id));
}


// ============================================
// Backup History helpers
// ============================================

export async function getAllBackupHistory(): Promise<BackupHistory[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(backupHistory)
    .orderBy(desc(backupHistory.createdAt));
}

export async function getBackupHistoryById(backupId: string): Promise<BackupHistory | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const results = await db
    .select()
    .from(backupHistory)
    .where(eq(backupHistory.backupId, backupId))
    .limit(1);
  
  return results[0];
}

export async function createBackupHistory(data: InsertBackupHistory): Promise<BackupHistory> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .insert(backupHistory)
    .values(data);
  
  const insertedId = result[0].insertId;
  const inserted = await db
    .select()
    .from(backupHistory)
    .where(eq(backupHistory.id, insertedId))
    .limit(1);
  
  return inserted[0];
}

export async function updateBackupHistory(backupId: string, data: Partial<InsertBackupHistory>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(backupHistory)
    .set(data)
    .where(eq(backupHistory.backupId, backupId));
}

export async function deleteBackupHistory(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .delete(backupHistory)
    .where(eq(backupHistory.id, id));
}

// Export all data from all tables
export async function exportAllData(): Promise<Record<string, any[]>> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const [
    usersData,
    galleryData,
    testimonialsData,
    contactsData,
    blogData,
    seoData,
    performanceData,
    versionData,
    backupData,
  ] = await Promise.all([
    db.select().from(users),
    db.select().from(galleryItems),
    db.select().from(testimonials),
    db.select().from(contactSubmissions),
    db.select().from(blogPosts),
    db.select().from(seoMetadata),
    db.select().from(performanceMetrics),
    db.select().from(versionHistory),
    db.select().from(backupHistory),
  ]);
  
  return {
    users: usersData,
    gallery_items: galleryData,
    testimonials: testimonialsData,
    contact_submissions: contactsData,
    blog_posts: blogData,
    seo_metadata: seoData,
    performance_metrics: performanceData,
    version_history: versionData,
    backup_history: backupData,
  };
}


// Restore data to all tables (WARNING: This will replace existing data)
export async function restoreAllData(data: Record<string, any[]>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Note: This is a simplified restore that inserts data
  // In production, you might want to clear tables first or handle conflicts
  
  // Note: Using try-catch to handle duplicate key errors gracefully
  // This allows partial restores to succeed even if some records already exist
  
  if (data.gallery_items && data.gallery_items.length > 0) {
    for (const item of data.gallery_items) {
      try {
        await db.insert(galleryItems).values(item);
      } catch (e) {
        // Skip duplicates
      }
    }
  }
  
  if (data.testimonials && data.testimonials.length > 0) {
    for (const item of data.testimonials) {
      try {
        await db.insert(testimonials).values(item);
      } catch (e) {
        // Skip duplicates
      }
    }
  }
  
  if (data.contact_submissions && data.contact_submissions.length > 0) {
    for (const item of data.contact_submissions) {
      try {
        await db.insert(contactSubmissions).values(item);
      } catch (e) {
        // Skip duplicates
      }
    }
  }
  
  if (data.blog_posts && data.blog_posts.length > 0) {
    for (const item of data.blog_posts) {
      try {
        await db.insert(blogPosts).values(item);
      } catch (e) {
        // Skip duplicates
      }
    }
  }
  
  if (data.seo_metadata && data.seo_metadata.length > 0) {
    for (const item of data.seo_metadata) {
      try {
        await db.insert(seoMetadata).values(item);
      } catch (e) {
        // Skip duplicates
      }
    }
  }
  
  if (data.performance_metrics && data.performance_metrics.length > 0) {
    for (const item of data.performance_metrics) {
      try {
        await db.insert(performanceMetrics).values(item);
      } catch (e) {
        // Skip duplicates
      }
    }
  }
  
  if (data.version_history && data.version_history.length > 0) {
    for (const item of data.version_history) {
      try {
        await db.insert(versionHistory).values(item);
      } catch (e) {
        // Skip duplicates
      }
    }
  }
}
