# Supabase Email Template Setup

## How to Set Up the OTP Email Template

1. **Go to Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project

2. **Navigate to Email Templates**
   - Go to **Authentication** → **Email Templates**
   - Find the **"Confirm sign up"** template (or create a new one)

3. **Update the Template**
   - Click on the template to edit it
   - Switch to **"Source"** view (not Preview)
   - Copy the HTML content from `supabase-email-template-otp-simple.html`
   - Paste it into the email body
   - Make sure the subject line is something like: **"Your Verification Code"**

4. **Important Variables**
   - `{{ .Token }}` - This will display the 6-digit OTP code
   - `{{ .Email }}` - User's email address (optional, if you want to include it)
   - `{{ .SiteURL }}` - Your site URL (optional)

5. **Test the Template**
   - Save the template
   - Try signing up/logging in with a test email
   - Verify that you receive the OTP code in the email

## Template Features

- ✅ White background with purple stripe on the right
- ✅ Envelope icon (using emoji for email client compatibility)
- ✅ Large, prominent OTP code display
- ✅ "Valid for 10 minutes only" warning in red
- ✅ Responsive design that works in most email clients
- ✅ Uses inline CSS for maximum compatibility

## Notes

- The template uses `{{ .Token }}` which Supabase will replace with the actual 6-digit code
- Email clients have limited CSS support, so the template uses inline styles
- The purple stripe is created using a border-right style for better email client support
- The envelope icon uses an emoji (📧) for maximum compatibility across email clients

