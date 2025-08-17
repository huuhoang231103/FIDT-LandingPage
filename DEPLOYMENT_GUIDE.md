# 🚀 Deployment Guide - FIDT Landing Page

## 📋 Prerequisites

### Server Requirements
- **PHP**: 8.0 or higher
- **Web Server**: Apache 2.4+ or Nginx 1.18+
- **SSL Certificate**: HTTPS required for production
- **Domain**: Registered domain name
- **Email**: Working email service

### Development Requirements
- **Node.js**: 18 or higher
- **npm**: Latest version
- **Git**: Version control

## 🌐 Domain Configuration

### 1. Domain Registration
- Register your domain (e.g., `fidt.com`, `yourcompany.com`)
- Ensure DNS is properly configured
- Set up SSL certificate (Let's Encrypt recommended)

### 2. DNS Configuration
```bash
# Example DNS records
A     @          YOUR_SERVER_IP
CNAME www        @
A     api        YOUR_SERVER_IP
A     mail       YOUR_SERVER_IP
```

### 3. SSL Certificate
```bash
# Using Let's Encrypt (recommended)
sudo apt install certbot
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com
```

## 📧 Email Configuration

### 1. Email Service Setup

#### Option A: Gmail SMTP
```env
# Backend .env
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
```

#### Option B: Custom SMTP Server
```env
# Backend .env
MAIL_DRIVER=smtp
MAIL_HOST=mail.yourdomain.com
MAIL_PORT=587
MAIL_USERNAME=admin@yourdomain.com
MAIL_PASSWORD=your-email-password
MAIL_ENCRYPTION=tls
```

#### Option C: SendGrid
```env
# Backend .env
MAIL_DRIVER=smtp
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=your-sendgrid-api-key
MAIL_ENCRYPTION=tls
```

### 2. Update Email Addresses

#### Backend Configuration
```php
// backend/services/mail.php
function buildEmailHeaders(string $customerEmail): string {
    return 'MIME-Version: 1.0' . "\r\n" .
           'Content-type: text/html; charset=UTF-8' . "\r\n" .
           'From: admin@yourdomain.com' . "\r\n" .        // UPDATE THIS
           'Reply-To: contact@yourdomain.com' . "\r\n";   // UPDATE THIS
}

function sendContactMailWithPHPMail(array $data): bool|string {
    $mailto = "admin@yourdomain.com"; // UPDATE THIS
    // ... rest of the function
}
```

#### Frontend Configuration
```env
# frontend/.env
VITE_CONTACT_EMAIL=admin@yourdomain.com
VITE_REPLY_TO_EMAIL=contact@yourdomain.com
```

### 3. Email Testing
```bash
# Test email functionality
curl -X POST http://yourdomain.com/api/send_mail.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+84 123 456 789",
    "email": "test@example.com",
    "service": "Test Service",
    "message": "Test message",
    "subscribe": true
  }'
```

## 🏗️ Backend Deployment

### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install PHP and extensions
sudo apt install php8.0 php8.0-fpm php8.0-mysql php8.0-curl php8.0-json php8.0-mbstring php8.0-xml php8.0-zip

# Install web server
sudo apt install apache2
# OR
sudo apt install nginx
```

### 2. File Upload
```bash
# Upload backend files
scp -r backend/ user@your-server:/var/www/html/

# Set permissions
sudo chown -R www-data:www-data /var/www/html/backend
sudo chmod -R 755 /var/www/html/backend
sudo chmod -R 777 /var/www/html/backend/data_consolidated
```

### 3. Environment Configuration
```bash
# Copy example file
cp /var/www/html/backend/env.example /var/www/html/backend/.env

# Edit configuration
nano /var/www/html/backend/.env
```

#### Production .env Example
```env
# Backend .env for production
APP_DEBUG=false
APP_ENV=production

# Email Configuration
MAIL_FROM=admin@yourdomain.com
MAIL_REPLY_TO=contact@yourdomain.com
MAIL_TO=info@yourdomain.com

# Domain Configuration
SITE_DOMAIN=yourdomain.com
SITE_URL=https://yourdomain.com

# CORS Configuration
CORS_ORIGIN=https://yourdomain.com

# Security Configuration
SESSION_SECRET=your-very-long-random-secret-key-here
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-strong-password

# Timezone Configuration
TIMEZONE=Asia/Ho_Chi_Minh

# Logging Configuration
LOG_LEVEL=error
LOG_FILE=/var/log/fidt/app.log
```

### 4. Web Server Configuration

#### Apache Configuration
```apache
# /etc/apache2/sites-available/yourdomain.com.conf
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    DocumentRoot /var/www/html/backend
    
    <Directory /var/www/html/backend>
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/yourdomain.com_error.log
    CustomLog ${APACHE_LOG_DIR}/yourdomain.com_access.log combined
</VirtualHost>
```

#### Nginx Configuration
```nginx
# /etc/nginx/sites-available/yourdomain.com
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/html/backend;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
    }

    error_log /var/log/nginx/yourdomain.com_error.log;
    access_log /var/log/nginx/yourdomain.com_access.log;
}
```

### 5. Enable Site
```bash
# Apache
sudo a2ensite yourdomain.com.conf
sudo systemctl reload apache2

# Nginx
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🎨 Frontend Deployment

### 1. Build Production Version
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Build for production
npm run build
```

### 2. Upload Frontend Files
```bash
# Upload built files
scp -r dist/ user@your-server:/var/www/html/frontend/

# Set permissions
sudo chown -R www-data:www-data /var/www/html/frontend
sudo chmod -R 755 /var/www/html/frontend
```

### 3. Frontend Environment Configuration
```env
# frontend/.env for production
VITE_API_BASE_URL=https://yourdomain.com/backend
VITE_APP_NAME=FIDT Landing Page
VITE_APP_VERSION=2.0.0

# Email Configuration
VITE_CONTACT_EMAIL=admin@yourdomain.com
VITE_REPLY_TO_EMAIL=contact@yourdomain.com

# Domain Configuration
VITE_DOMAIN=yourdomain.com
VITE_SITE_URL=https://yourdomain.com

# Development Configuration
VITE_DEV_MODE=false
VITE_DEBUG_LEVEL=error
```

## 🔒 Security Configuration

### 1. Firewall Setup
```bash
# Configure UFW firewall
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2. SSL/HTTPS Setup
```bash
# Install Certbot
sudo apt install certbot python3-certbot-apache
# OR for Nginx
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com
# OR
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

### 3. Admin Password Change
```bash
# Set admin credentials
# Edit backend/.env file
ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-strong-password
```

## 📊 Monitoring & Maintenance

### 1. Log Monitoring
```bash
# Check application logs
sudo tail -f /var/log/apache2/yourdomain.com_error.log
# OR
sudo tail -f /var/log/nginx/yourdomain.com_error.log

# Check PHP error logs
sudo tail -f /var/log/php8.0-fpm.log
```

### 2. Performance Monitoring
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs

# Monitor system resources
htop
```

### 3. Backup Strategy
```bash
# Create backup script
nano /home/user/backup.sh
```

#### Backup Script Example
```bash
#!/bin/bash
# Backup script for FIDT Landing Page

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/user/backups"
SITE_DIR="/var/www/html"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup backend
tar -czf $BACKUP_DIR/backend_$DATE.tar.gz -C $SITE_DIR backend/

# Backup frontend
tar -czf $BACKUP_DIR/frontend_$DATE.tar.gz -C $SITE_DIR frontend/

# Backup data files
tar -czf $BACKUP_DIR/data_$DATE.tar.gz -C $SITE_DIR/backend data_consolidated/

# Keep only last 7 backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
```

```bash
# Make script executable
chmod +x /home/user/backup.sh

# Add to crontab (daily backup at 2 AM)
crontab -e
# Add this line:
0 2 * * * /home/user/backup.sh
```

## 🧪 Testing Deployment

### 1. Backend API Testing
```bash
# Test connectivity
curl https://yourdomain.com/backend/test_connection.php

# Test services API
curl https://yourdomain.com/backend/service_apis/get_services.php

# Test authentication
curl https://yourdomain.com/backend/auth/check_login.php
```

### 2. Frontend Testing
- Open https://yourdomain.com in browser
- Test all functionality
- Verify responsive design
- Check form submissions

### 3. Email Testing
- Submit contact form
- Verify email delivery
- Check spam folder
- Test reply functionality

## 🚨 Troubleshooting

### Common Issues

#### 1. CORS Errors
```bash
# Check CORS configuration in backend
# Ensure CORS_ORIGIN matches your frontend domain
```

#### 2. File Permissions
```bash
# Fix file permissions
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
sudo chmod -R 777 /var/www/html/backend/data_consolidated
```

#### 3. Email Not Sending
```bash
# Check email configuration
# Verify SMTP settings
# Check server logs
sudo tail -f /var/log/mail.log
```

#### 4. 500 Internal Server Error
```bash
# Check PHP error logs
sudo tail -f /var/log/php8.0-fpm.log

# Check web server logs
sudo tail -f /var/log/apache2/error.log
# OR
sudo tail -f /var/log/nginx/error.log
```

## 📞 Support

### Contact Information
- **Technical Support**: Available for deployment issues
- **Documentation**: Comprehensive guides provided
- **Email**: cskh@newtoyovn.com

### Emergency Procedures
1. **Site Down**: Check web server status
2. **Email Issues**: Verify SMTP configuration
3. **Performance Issues**: Monitor system resources
4. **Security Breach**: Immediately change admin passwords

---

**Last Updated**: August 2025
**Version**: 2.0.0
**Status**: Production Ready
