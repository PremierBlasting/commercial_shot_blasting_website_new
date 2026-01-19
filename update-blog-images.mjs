import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { blogPosts } from './drizzle/schema.ts';
import { eq } from 'drizzle-orm';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

// Update blog post featured images to use existing site images
const updates = [
  {
    slug: 'complete-guide-shot-blasting-steel-surfaces',
    featuredImage: '/hero-carousel-1.webp' // Steel beams being blasted
  },
  {
    slug: 'shot-blasting-automotive-restoration',
    featuredImage: '/hero-carousel-5.webp' // Automotive/vehicle related
  },
  {
    slug: 'concrete-surface-profiling-shot-blasting',
    featuredImage: '/hero-carousel-7.webp' // Industrial floor/concrete
  },
  {
    slug: 'shot-blasting-marine-applications',
    featuredImage: '/hero-carousel-10.webp' // Marine/industrial
  },
  {
    slug: 'industrial-equipment-maintenance-shot-blasting',
    featuredImage: '/hero-carousel-6.webp' // Industrial equipment
  }
];

for (const update of updates) {
  await db.update(blogPosts)
    .set({ featuredImage: update.featuredImage })
    .where(eq(blogPosts.slug, update.slug));
  console.log(`✅ Updated ${update.slug}`);
}

console.log('✅ All blog post images updated successfully!');
await connection.end();
