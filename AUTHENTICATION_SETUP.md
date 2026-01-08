# Authentication Setup Guide

This document explains how to set up authentication for the Murugan Furniture application.

## Issues Fixed

The following authentication issues have been resolved:

1. **Missing auth callback route** - Created `/auth/callback/route.ts` for OAuth redirects
2. **Missing environment variables** - Created `env.example` template
3. **Validation state management** - Fixed `isSubmitting` state not resetting on validation errors
4. **Auth error handling** - Added auth error page for failed OAuth attempts

## Setup Instructions

### 1. Configure Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or select existing one
3. Navigate to **Project Settings** > **API**
4. Copy the **Project URL** and **anon public key**

### 2. Set Environment Variables

1. Copy the environment template:
   ```bash
   cp env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

### 3. Configure OAuth Providers (Optional)

For Google/Facebook sign-in:

1. In Supabase Dashboard, go to **Authentication** > **Providers**
2. Enable Google and/or Facebook providers
3. Configure the OAuth credentials for each provider
4. Set the redirect URL to: `https://yourdomain.com/auth/callback`

### 4. Database Schema

The application expects a `user_profiles` table with the following structure:

```sql
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own profile
CREATE POLICY "Users can manage their own profile" ON user_profiles
  FOR ALL USING (auth.uid() = id);
```

### 5. Email Configuration

In Supabase Dashboard > Authentication > Settings:

1. Configure SMTP settings for email verification
2. Set the site URL to your application domain
3. Configure email templates as needed

## Authentication Flow

### Sign Up Flow
1. User fills registration form (email, password, name, phone)
2. Account created in Supabase Auth
3. User profile created in `user_profiles` table
4. Email verification sent (if enabled)
5. User redirected to sign-in or auto-signed in

### Sign In Flow
1. User enters email and password
2. Credentials validated with Supabase Auth
3. Session created and stored
4. User redirected to intended page

### OAuth Flow
1. User clicks Google/Facebook button
2. Redirected to OAuth provider
3. Provider redirects back to `/auth/callback`
4. Session created and user redirected

## Components

### AuthModal
- Modal-based authentication (sign in/sign up)
- Used throughout the application
- Handles form validation and submission

### Dedicated Pages
- `/signin` - Full-page sign in form
- `/signup` - Full-page registration form
- `/auth/callback` - OAuth redirect handler
- `/auth/auth-code-error` - Error page for failed auth

## Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Test sign up:
   - Visit `/signup` or use the modal
   - Fill form and submit
   - Check email for verification (if enabled)

3. Test sign in:
   - Visit `/signin` or use the modal
   - Enter credentials
   - Verify successful login

4. Test OAuth:
   - Configure OAuth providers in Supabase
   - Click Google/Facebook buttons
   - Complete OAuth flow

## Troubleshooting

### Common Issues

1. **"Missing NEXT_PUBLIC_SUPABASE_URL"**
   - Ensure `.env.local` exists with correct variables
   - Restart development server after changes

2. **OAuth redirect fails**
   - Check redirect URL configuration in Supabase
   - Ensure `/auth/callback` route exists

3. **Email verification not working**
   - Configure SMTP settings in Supabase
   - Check spam folder for verification emails

4. **Database errors**
   - Ensure `user_profiles` table exists
   - Check RLS policies are correctly configured

### Debug Mode

Add this to your `.env.local` to enable debug logging:
```env
NEXT_PUBLIC_SUPABASE_DEBUG=true
```

## Security Notes

- Always use environment variables for sensitive data
- Enable Row Level Security (RLS) on all tables
- Configure proper CORS settings in Supabase
- Use HTTPS in production
- Regularly rotate API keys
- Monitor authentication logs

## Support

For authentication-related issues:
1. Check Supabase dashboard logs
2. Verify environment variables
3. Test with different browsers
4. Check network requests in browser dev tools
