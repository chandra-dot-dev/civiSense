# How to Deploy CivicResolve (Vercel + Supabase)

Because you built this with Next.js 14, **Vercel** is the absolute easiest and best place to deploy it for a hackathon. It will take less than 5 minutes.

### Step 1: Push your code to GitHub
If you haven't already:
1. Go to [GitHub](https://github.com/) and create a new repository (e.g., `civic-resolve`).
2. Open a new terminal in your VScode and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for hackathon"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### Step 2: Connect to Vercel
1. Go to [Vercel](https://vercel.com/) and Sign Up / Log In using your GitHub account.
2. Click **"Add New Project"** from your dashboard.
3. Import the `civic-resolve` repository you just created.
4. Leave the Framework Preset as **Next.js**.

### Step 3: Add your Supabase Environment Variables
Before clicking "Deploy", you need to tell Vercel how to connect to your Supabase database.
1. In the Vercel deployment screen, open the **Environment Variables** dropdown.
2. Add the two variables exactly as they appear in your `.env.local` file:
   * **Name**: `NEXT_PUBLIC_SUPABASE_URL` | **Value**: *(Your Supabase URL)*
   * **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Value**: *(Your Supabase Anon Key)*
3. Click "Add" for each one.

### Step 4: Deploy Let's Go! 🚀
1. Click the big **Deploy** button.
2. Vercel will install dependencies, build the project (`npm run build`), and assign you a live `.vercel.app` URL.

### Step 5: Important - Update Supabase Redirects
Because your app is now hosted on Vercel instead of `localhost:3000`, you must tell Supabase Authentication that the Vercel URL is a safe place to redirect users after logging in/signing up.
1. Go to your **Supabase Dashboard**.
2. Go to **Authentication** > **URL Configuration**.
3. Under **Site URL**, change `http://localhost:3000` to your new Vercel URL (e.g., `https://civic-resolve.vercel.app`).
4. (Optional) Under **Redirect URLs**, add your Vercel URL with `/**` at the end (e.g., `https://civic-resolve.vercel.app/**`).

That's it! Your hackathon demo is live.
