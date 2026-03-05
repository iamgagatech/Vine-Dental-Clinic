# Troubleshooting Guide

## Build Issues

### "Command failed: vite build"

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Type Errors After Build

**Solution:**
```bash
npm run type-check
# Fix reported errors manually
npm run build
```

## Development Issues

### Port 5173 Already in Use

Run with a different port:
```bash
npm run dev -- --port 3000
# or
vite --port 3000
```

### Hot Module Replacement Not Working

Restart the dev server and check for TypeScript errors first:
```bash
npm run type-check
npm run dev
```

## Deployment Issues

### Vercel Build Fails

1. Check that all dependencies are in `package.json`
2. Ensure `vercel.json` has correct build command
3. Verify `vite.config.ts` is configured for production
4. Check environment variables are set in Vercel dashboard

### Images Not Loading

1. Verify images are in `public/images/`
2. Check image paths start with `/`
3. Verify image files have correct extensions

### Styles Not Applied

1. Check that `index.css` imports in `main.tsx`
2. Verify Tailwind CSS is configured correctly
3. Check `postcss.config.js` exists and is correct

## Runtime Issues

### Booking Form Not Submitting

1. Check browser console for errors
2. Verify Zod validation is passing
3. Check that all required fields are filled

### WhatsApp Link Not Working

1. Verify phone number format is correct
2. Check that `whatsapp.ts` is generating proper links
3. Ensure message is properly encoded

### Admin Dashboard Not Accessible

1. Check `ADMIN_TOKEN` environment variable is set
2. Verify token is being sent correctly
3. Check browser console for authentication errors

## Performance Issues

### Slow Loading Images

```bash
# Optimize images before adding
# Use tools like: sharp, imagemin, squoosh
```

### Large Bundle Size

1. Check Vite bundle analyzer: `npm run analyze`
2. Lazy load heavy components: `React.lazy()`
3. Code split by route

## Getting Help

If issues persist:
1. Check browser console for errors
2. Review the error message
3. Search for similar issues
4. Contact the development team