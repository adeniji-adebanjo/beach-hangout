# NLWC Ikorodu Beach Hangout

Welcome to the **NLWC Ikorodu Beach Hangout** project! This is a Next.js application designed to manage registrations, group assignments, and event details for the annual family beach hangout.

## Features

- **Registration Form**: Allows users to register for the event with fields for personal details, phone number, and group preferences.
- **Dynamic Group Assignments**: Automatically assigns attendees with a "paid" status to groups in Google Sheets and displays them on the frontend.
- **Group Tabs**: Interactive tabs with icons for each group, allowing users to view group members.
- **Custom 404 Page**: A visually appealing error page with a background image and a link to return to the homepage.
- **Scroll to Top Button**: A floating button that allows users to scroll back to the top of the page.
- **Responsive Design**: Fully optimized for mobile and desktop screens.
- **Google Sheets Integration**: Fetches and updates attendee data directly from Google Sheets.
- **Background Animations**: Pages like `/groups` feature animated backgrounds for an engaging user experience.

---

## Technologies Used

- **Next.js**: Framework for building the application.
- **React Hook Form**: For managing form state and validation.
- **Google Sheets API**: For fetching and updating attendee data.
- **Tailwind CSS**: For styling and responsive design.
- **Framer Motion**: For animations and transitions.
- **React Icons**: For group icons and other visual elements.
- **Toastify**: For displaying notifications.
- **Cloudinary**: For managing and displaying images.
- **TypeScript**: For type safety and better developer experience.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/beach-hangout.git
   cd beach-hangout
   ```
2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up environment variables:

   - Create a `.env.local` file in the root of the project.
   - Add your Google Sheets API credentials and other necessary variables. See `.env.example` for reference.

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## File Structure

The project is organized into the following structure:

```
src/
├── app/
│   ├── api/
│   │   └── attendees/route.ts  # API route for fetching and updating attendees
│   ├── groups/
│   │   └── page.tsx            # Groups page with group tabs and member display
│   ├── layout.tsx              # Root layout with global styles and ScrollToTop
│   ├── not-found.tsx           # Custom 404 page
│   └── page.tsx                # Homepage
├── components/
│   ├── Navbar.tsx              # Navigation bar
│   ├── Footer.tsx              # Footer
│   ├── GroupTabs.tsx           # Group tabs with icons
│   ├── GroupTable.tsx          # Table for displaying group members
│   ├── Registration.tsx        # Registration form
│   └── ScrollToTop.tsx         # Scroll to top button
├── lib/
│   └── googleSheets.ts         # Utility functions for Google Sheets API
└── styles/
    └── globals.css             # Global styles
```
