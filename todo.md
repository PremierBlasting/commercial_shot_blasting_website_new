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

## Premier Blasting Image Integration
- [x] Extract images from shot-blasting-near-me page
- [x] Extract images from steel-container-blasting page
- [x] Extract images from steel-shot-blasting page
- [x] Extract images from our-work#shot-blasting section
- [x] Extract metal gate images from our-work#gates section
- [x] Download and organize all images
- [x] Replace Unsplash template images with Premier Blasting images
- [x] Update Home page hero and service sections
- [x] Update Gallery page with real project images
- [x] Update Service Detail pages with relevant images

## Metal Gate Gallery Items
- [x] Add gate restoration before/after images to gallery
- [x] Create new "Gates" category in gallery filter
- [x] Test gallery filtering with new gate items

## Gate Restoration Service Page
- [x] Create Gate Restoration service data with full content
- [x] Add benefits, process steps, applications, case studies, and FAQs
- [x] Update Header navigation dropdown with Gate Restoration link
- [x] Route automatically handled by ServiceDetail dynamic routing
- [x] Test the new service page

## Before-After Image Slider
- [x] Create BeforeAfterSlider component with drag functionality
- [x] Add smooth transitions and touch support
- [x] Integrate slider into Gate Restoration service page
- [x] Test on desktop and mobile

## Extend Before-After Slider to More Pages
- [x] Add slider to Steel Shot Blasting service page
- [x] Add slider to Automotive Restoration service page
- [x] Test both sliders

## Add Sliders to Remaining Service Pages
- [x] Add slider to Concrete Preparation page
- [x] Add slider to Marine Services page
- [x] Add slider to Agricultural Equipment page
- [x] Add slider to Infrastructure Projects page
- [x] Test all service pages

## Request a Quote Button on Sliders
- [x] Add Request a Quote button next to each before-after slider
- [x] Style button to match site theme
- [x] Connect button to quote popup
- [x] Test on all service pages

## Call Now Button on Service Pages
- [x] Add Call Now button next to Request a Quote button
- [x] Style button with phone icon
- [x] Link to tel: for mobile click-to-call
- [x] Test on all service pages

## Homepage Hero Call Now Button
- [x] Add Call Now button to hero section
- [x] Style to match existing hero buttons
- [x] Include phone icon
- [x] Test on desktop and mobile

## Floating Call Now Button (Mobile)
- [x] Create FloatingCallButton component
- [x] Show only on mobile devices (hidden on desktop)
- [x] Fixed position at bottom of screen
- [x] Style with phone icon and teal brand colour
- [x] Add to App layout
- [x] Test on mobile viewport

## Floating WhatsApp Button (Mobile)
- [x] Add WhatsApp button next to Call Now button
- [x] Use WhatsApp number +44 7721 375756
- [x] Style with WhatsApp green colour
- [x] Include WhatsApp icon
- [x] Test on mobile viewport

## Footer Clickable Contact Links
- [x] Add clickable phone number (tel: link)
- [x] Add clickable email address (mailto: link)
- [x] Update all page footers consistently (Home, Gallery, ServiceDetail, PrivacyPolicy)
- [x] Test links on desktop and mobile

## Service Areas Page
- [x] Create ServiceAreas page component
- [x] Add Birmingham section with local content
- [x] Add West Midlands section with local content
- [x] Add Wolverhampton section with local content
- [x] Add route in App.tsx
- [x] Add navigation link in Header (desktop and mobile)
- [x] Test page functionality

## Interactive Map on Service Areas Page
- [x] Create ServiceAreasMap component using Google Maps
- [x] Add markers for Birmingham, West Midlands, and Wolverhampton
- [x] Add coverage area circles/polygons
- [x] Integrate map into Service Areas page
- [x] Test map interactivity

## Expanded Service Areas Coverage
- [x] Add all locations from Premier Blasting sandblasting-near-me page
- [x] Include: Nottingham, Norwich, Northampton, Cambridge, Gloucester, Oxford
- [x] Include: Bristol, Chester, Peterborough, Shrewsbury, Hereford, Swindon
- [x] Include: Stoke, Leicester, Coventry, St Albans, Worcester, Stratford Upon Avon
- [x] Include: Liverpool, Manchester, Derby, Milton Keynes
- [x] Update map to show England-wide coverage with 25+ markers
- [x] Update Service Areas page with 7 regional sections
- [x] Test expanded map functionality

## Map Zoom and Location Updates
- [x] Zoom out map to show more of England/Wales (center adjusted to lat 52.8)
- [x] Add Wrexham location marker
- [x] Add Chesterfield location marker
- [x] Add Ipswich location marker
- [x] Add Cardiff location marker
- [x] Bring headquarters marker to front (z-index 9999)
- [x] Test updated map

## Add Lincoln and Sheffield
- [x] Add Lincoln location marker to map
- [x] Add Sheffield location marker to map
- [x] Add Yorkshire region with Sheffield
- [x] Update Service Areas page with new locations and Yorkshire section
- [x] Test updated map

## Contact Page Map and New Locations
- [x] Add Leeds location marker to map
- [x] Add Bradford location marker to map
- [x] Update Yorkshire region to include Leeds and Bradford
- [x] Add interactive map to Contact page
- [x] Style map section to match Contact page design
- [x] Test Contact page with map


## Local SEO - Birmingham Landing Page
- [x] Create Birmingham landing page component
- [x] Add Birmingham-specific content sections
- [x] Add local industry focus (automotive, manufacturing, engineering)
- [x] Add service highlights for Birmingham area
- [x] Add local testimonials/case studies
- [x] Add route in App.tsx (/service-areas/birmingham)
- [x] Add navigation links from Service Areas page
- [ ] Add LocalBusiness schema markup for Birmingham
- [x] Test Birmingham page functionality


## Bug Fixes
- [x] Fix Google Maps API being loaded multiple times on Service Areas page


## Navigation Menu Enhancement
- [x] Create hierarchical Areas submenu in Header component
- [x] Add regions (West Midlands, East Midlands, Yorkshire, etc.) as submenu items
- [x] Add Birmingham as sub-sub-menu item under West Midlands
- [x] Add Birmingham as clickable link in Areas page
- [x] Test submenu navigation and links


## Breadcrumb Navigation for Location Pages
- [x] Create reusable Breadcrumb component
- [x] Add breadcrumb to Birmingham landing page
- [x] Add breadcrumb schema markup (JSON-LD) for SEO
- [x] Test breadcrumb navigation and styling
- [x] Verify breadcrumb links work correctly


## Apply Breadcrumbs to All Location Pages
- [x] Birmingham landing page - breadcrumb added
- [x] Service Detail pages - breadcrumb added
- [x] Gallery page - breadcrumb added
- [x] Privacy Policy page - breadcrumb added
- [x] Test all location page breadcrumbs
