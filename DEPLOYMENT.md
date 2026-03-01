# Deployment Guide

This guide covers deploying the House Rent Management System to production.

## Prerequisites

- MongoDB Atlas account or self-hosted MongoDB
- Node.js server (Heroku, AWS, DigitalOcean, etc.)
- Git repository

## Backend Deployment

### Heroku Deployment

1. **Install Heroku CLI**

```bash
npm install -g heroku
```

2. **Login to Heroku**

```bash
heroku login
```

3. **Create Heroku App**

```bash
cd backend
heroku create your-app-name
```

4. **Set Environment Variables**

```bash
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set JWT_EXPIRE=7d
heroku config:set NODE_ENV=production
heroku config:set CORS_ORIGIN=https://your-frontend-url.com
```

5. **Deploy**

```bash
git push heroku main
```

### AWS EC2 Deployment

1. **Launch EC2 Instance**
   - Ubuntu 20.04 LTS
   - Security group allowing ports 80, 443, 22, 5000

2. **Install Dependencies**

```bash
sudo apt update
sudo apt install nodejs npm mongodb
```

3. **Clone Repository**

```bash
git clone YOUR_REPO_URL
cd YOUR_REPO/backend
npm install
```

4. **Set Environment Variables**

```bash
nano .env
```

5. **Start with PM2**

```bash
npm install -g pm2
pm2 start server.js --name "house-rent-api"
pm2 startup
pm2 save
```

6. **Setup Nginx Reverse Proxy**

```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

Configure Nginx to proxy to Node.js on port 5000

7. **Setup SSL with Certbot**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com
```

## Frontend Deployment

### Vercel Deployment

1. **Connect GitHub Repository**
   - Go to vercel.com
   - Connect your GitHub account
   - Select the frontend repository

2. **Configure Environment**
   - Set `REACT_APP_API_URL` to your backend URL

3. **Auto Deploy**
   - Vercel automatically deploys on push to main branch

### Netlify Deployment

1. **Install Netlify CLI**

```bash
npm install -g netlify-cli
```

2. **Build Frontend**

```bash
cd frontend
npm run build
```

3. **Deploy**

```bash
netlify deploy --prod --dir=build
```

4. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `build`

### GitHub Pages Deployment

1. **Update package.json**

```json
{
  "homepage": "https://yourusername.github.io/house-rent-frontend"
}
```

2. **Install gh-pages**

```bash
npm install --save-dev gh-pages
```

3. **Add scripts to package.json**

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

4. **Deploy**

```bash
npm run deploy
```

## Database Setup

### MongoDB Atlas

1. **Create Account** - Visit mongodb.com/cloud/atlas

2. **Create Cluster**
   - Choose shared tier for free option
   - Select region closest to your users

3. **Create Database User**
   - Username and password
   - Set IP Whitelist

4. **Get Connection String**
   - Copy connection string
   - Use in `MONGODB_URI` environment variable

### Self-Hosted MongoDB

```bash
# Install MongoDB
# On Ubuntu
sudo apt install mongodb

# Start MongoDB
sudo systemctl start mongodb

# Backup
mongodump --out /path/to/backup

# Restore
mongorestore /path/to/backup
```

## SSL/HTTPS Setup

### Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get Certificate
sudo certbot certonly --nginx -d yourdomain.com

# Renew (automatic)
sudo certbot renew --dry-run
```

## Monitoring & Logging

### PM2 Monitoring

```bash
pm2 plus  # Real-time monitoring
pm2 logs  # View logs
pm2 restart all  # Restart app
```

### Application Logging

```bash
# View application logs
tail -f ~/.pm2/logs/house-rent-api-error.log
tail -f ~/.pm2/logs/house-rent-api-out.log
```

## Performance Optimization

### Backend

1. Enable MongoDB compression
2. Implement caching with Redis
3. Use load balancer (NGINX, HAProxy)
4. Enable gzip compression
5. Optimize database queries

### Frontend

1. Enable gzip compression
2. Minify CSS and JavaScript
3. Optimize images
4. Use CDN for static assets
5. Enable browser caching

## Security Checklist

- [ ] Disable debug mode in production
- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Set secure CORS headers
- [ ] Implement rate limiting
- [ ] Sanitize user input
- [ ] Use environment variables for secrets
- [ ] Enable CSRF protection
- [ ] Set security headers (Helmet.js)
- [ ] Regular security audits

## Troubleshooting

### Deployment Issues

**Issue**: "Cannot find module"

- Solution: Run `npm install` immediately after deployment

**Issue**: "CORS error"

- Solution: Check CORS_ORIGIN environment variable matches frontend URL

**Issue**: "Database connection timeout"

- Solution: Whitelist server IP in MongoDB Atlas

**Issue**: "SSL certificate error"

- Solution: Renew certificate with certbot

## Backup & Recovery

### Backup Strategy

```bash
# Monthly MongoDB backup
0 0 1 * * mongodump --out /backups/mongodb-$(date +\%Y\%m\%d)

# GitHub automatic backup (recommended)
```

### Recovery Procedure

```bash
# Restore from backup
mongorestore /path/to/backup/mongodb-20240101
```

## Scaling

For increased traffic:

1. Implement horizontal scaling with load balancer
2. Use MongoDB Atlas auto-scaling
3. Implement caching layer (Redis)
4. CDN for static assets
5. Database read replicas

## Maintenance

### Regular Tasks

- Monitor error logs
- Update dependencies monthly
- Review security logs
- Check database backups
- Test disaster recovery
- Performance optimization

## Support

For deployment issues, consult:

- Cloud provider documentation
- MongoDB documentation
- React deployment guides
- Node.js best practices
