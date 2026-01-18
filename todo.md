# Commercial Shot Blasting Website TODO

## Database & Backend
- [x] Create gallery_items table schema
- [x] Create testimonials table schema
- [x] Create contact_submissions table schema
- [x] Implement gallery CRUD API endpoints
- [x] Implement testimonials CRUD API endpoints
- [x] Implement contact form submission API endpoint
- [x] Push database migrations

## Home Page
- [x] Sticky header with CSB logo and navigation
- [x] Hero section with gradient background
- [x] Services grid with 6 service cards
- [x] About section with trust indicators
- [x] CTA section (Home)
- [x] Industries served section
- [x] Contact form section
- [x] Footer with CSB branding

## Gallery Page
- [x] Gallery header with back navigation
- [x] Category filter buttons
- [x] Before/after image grid with hover effect
- [x] Dialog modal for full image view
- [x] Testimonials section with featured review
- [x] Testimonial cards with star ratings
- [x] Image lightbox functionality
- [x] CTA section (Gallery)
- [x] Footer (Gallery)

## Styling & Branding
- [x] Apply teal color scheme (#2C5F7F)
- [x] Apply cream backgrounds (#F5F1E8)
- [x] Add Google Fonts (Playfair Display, Open Sans)
- [x] Rebrand all "Shot Blasting" to "Commercial Shot Blasting"
- [x] Change logo from "SB" to "CSB"

## Testing
- [x] Write contact form submission test
- [x] Write gallery API test
- [x] Write testimonials API test

## Deployment
- [x] Create GitHub repository
- [x] Push code to repository

## Mobile Navigation
- [x] Add hamburger menu icon for mobile
- [x] Create slide-out mobile menu with all navigation links
- [x] Add smooth open/close animations
- [x] Implement on Home page
- [x] Implement on Gallery page

## Client Logo Carousel
- [x] Create client logo carousel section on Home page
- [x] Add auto-scrolling animation
- [x] Include placeholder company logos
- [x] Style with teal/cream color scheme

## Gallery Category Filtering Enhancement
- [x] Add Industrial category filter
- [x] Add Automotive category filter
- [x] Update gallery items with proper category assignments
- [x] Implement smooth filter transitions
- [x] Add category count badges

## Content Management System (CMS)
### Admin Dashboard
- [x] Create admin dashboard layout with sidebar navigation
- [x] Implement admin-only route protection
- [x] Add dashboard overview with statistics

### Gallery Management
- [x] Create gallery items list view with search/filter
- [x] Implement add new gallery item form
- [x] Implement edit gallery item functionality
- [x] Implement delete gallery item with confirmation
- [x] Add image URL input for before/after images

### Testimonials Management
- [x] Create testimonials list view
- [x] Implement add/edit/delete testimonials
- [x] Add featured testimonial toggle (isNew)

### Contact Submissions
- [x] Create contact submissions list view
- [x] Add read/unread status toggle
- [x] Implement delete submission functionality

## S3 Image Upload Integration
- [x] Create S3 upload API endpoint for images
- [x] Create reusable ImageUpload component with drag-and-drop
- [x] Update Gallery form to use ImageUpload component
- [x] Add image preview functionality
- [x] Handle upload progress and error states

## Client-Side Image Compression
- [x] Implement canvas-based image compression
- [x] Add quality and max dimension settings
- [x] Show compression stats (original vs compressed size)
- [x] Maintain aspect ratio during resize
- [x] Support JPEG and PNG formats

## WebP Thumbnail Generation
- [x] Generate WebP versions during image upload
- [x] Create multiple sizes (thumbnail, medium, full)
- [x] Update upload API to return WebP URLs
- [x] Update gallery to use WebP with fallback
- [x] Add lazy loading for gallery images

## HubSpot Form Integration
- [x] Add HubSpot script to index.html
- [x] Create HubSpotForm component
- [x] Replace contact section form with HubSpot form
- [x] Create quote popup modal component
- [x] Add popup trigger to all "Get a Free Quote" buttons on Home page
- [x] Add popup trigger to quote buttons on Gallery page
- [x] Style HubSpot form to match site theme

## HubSpot Form Fix
- [x] Update HubSpotForm component to use exact embed code
- [x] Remove custom styling that may interfere with form loading
- [x] Verify form loads and submits correctly

## Clickable Logo Links
- [x] Make header logo clickable link to home page
- [x] Make company name clickable link to home page
- [x] Update on Home page
- [x] Update on Gallery page

## Custom Favicon
- [x] Create SVG favicon with CSB branding
- [x] Add favicon to public folder
- [x] Update index.html with favicon link

## Individual Service Pages
- [x] Create Steel Shot Blasting service page
- [x] Create Concrete Preparation service page
- [x] Create Automotive Restoration service page
- [x] Create Marine Services service page
- [x] Create Agricultural Equipment service page
- [x] Create Infrastructure Projects service page
- [x] Add case studies to each service page
- [x] Update navigation to link to service pages
- [x] Add routes in App.tsx

## Services Dropdown Navigation
- [x] Add desktop dropdown menu for Services nav item
- [x] Add mobile collapsible sub-menu for Services
- [x] Link to all 6 service pages
- [x] Update on Home page
- [x] Update on Gallery page
- [x] Update on ServiceDetail page

## Cookie Consent Banner
- [x] Create CookieConsent component with accept/decline options
- [x] Store user preference in localStorage
- [x] Add smooth slide-up animation
- [x] Style to match teal/cream color scheme
- [x] Integrate into main App layout
- [x] Add link to privacy policy

## Privacy Policy Page
- [x] Create PrivacyPolicy page component
- [x] Add standard GDPR-compliant content sections
- [x] Include cookie policy information
- [x] Add data collection and usage details
- [x] Style to match site theme
- [x] Add route in App.tsx
- [x] Link from cookie consent banner and footer
