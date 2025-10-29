# Fashion Shop Q - Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Java 17+ (for backend)
- Node.js 16+ (for frontend)
- MySQL 8.0+ (database)
- Web server (Nginx/Apache)

### 1. Database Setup

```sql
-- Create production database
CREATE DATABASE fashion_shop_db;

-- Create user (optional)
CREATE USER 'fashionshop'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON fashion_shop_db.* TO 'fashionshop'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Backend Deployment

#### Build JAR file
```bash
cd backend
mvn clean package -DskipTests
```

#### Production Configuration
Create `application-prod.properties`:
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/fashion_shop_db
spring.datasource.username=fashionshop
spring.datasource.password=secure_password

# Server
server.port=8084
server.servlet.context-path=/api

# Security
jwt.secret=your_production_jwt_secret_key_here
jwt.expiration=86400000

# Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_production_email@gmail.com
spring.mail.password=your_app_password

# Twilio Configuration
twilio.account.sid=your_production_twilio_sid
twilio.auth.token=your_production_twilio_token
twilio.phone.number=your_production_phone_number

# Logging
logging.level.com.fashion.backend=INFO
logging.file.name=logs/fashion-shop.log
```

#### Run Backend
```bash
java -jar -Dspring.profiles.active=prod target/backend-0.0.1-SNAPSHOT.jar
```

### 3. Frontend Deployment

#### Build Production Bundle
```bash
cd frontend-new
npm install
npm run build
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Frontend
    location / {
        root /path/to/frontend-new/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:8084;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 4. SSL Configuration (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 5. Process Management (PM2)

#### Install PM2
```bash
npm install -g pm2
```

#### Backend Process
```bash
pm2 start "java -jar -Dspring.profiles.active=prod backend/target/backend-0.0.1-SNAPSHOT.jar" --name fashion-backend
```

#### Frontend Process (if using Node.js server)
```bash
cd frontend-new
pm2 start "npm start" --name fashion-frontend
```

#### PM2 Configuration
```bash
pm2 startup
pm2 save
```

### 6. Environment Variables

Create `.env.production`:
```bash
# Frontend
REACT_APP_API_URL=https://your-domain.com/api
GENERATE_SOURCEMAP=false

# Backend (in application-prod.properties)
SPRING_PROFILES_ACTIVE=prod
```

### 7. Database Migration

```sql
-- Run any necessary migrations
-- The application will auto-create tables on first run
-- Add any seed data if needed
```

### 8. Monitoring & Logs

#### Log Files
- Backend: `logs/fashion-shop.log`
- Nginx: `/var/log/nginx/access.log`, `/var/log/nginx/error.log`

#### Health Checks
- Backend: `https://your-domain.com/api/auth/health`
- Frontend: `https://your-domain.com`

### 9. Security Checklist

- [ ] Change default JWT secret
- [ ] Use strong database passwords
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Regular security updates
- [ ] Backup database regularly
- [ ] Monitor application logs

### 10. Backup Strategy

#### Database Backup
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u fashionshop -p fashion_shop_db > backup_$DATE.sql
```

#### Application Backup
```bash
# Backup application files
tar -czf fashion_shop_backup_$DATE.tar.gz backend/ frontend-new/
```

### 11. Performance Optimization

#### Frontend
- Enable gzip compression in Nginx
- Use CDN for static assets
- Implement caching headers

#### Backend
- Configure connection pooling
- Enable JVM optimization flags
- Monitor memory usage

### 12. Troubleshooting

#### Common Issues
1. **Port conflicts**: Ensure ports 8084 and 3001 are available
2. **Database connection**: Check MySQL service and credentials
3. **CORS errors**: Verify backend CORS configuration
4. **Email/SMS not working**: Check service credentials

#### Logs to Check
```bash
# Backend logs
tail -f logs/fashion-shop.log

# PM2 logs
pm2 logs fashion-backend
pm2 logs fashion-frontend

# Nginx logs
tail -f /var/log/nginx/error.log
```

---

## 🔄 Update Deployment

### Backend Update
```bash
cd backend
git pull
mvn clean package -DskipTests
pm2 restart fashion-backend
```

### Frontend Update
```bash
cd frontend-new
git pull
npm install
npm run build
# Copy build files to web server directory
```

---

**Note**: Always test deployments in a staging environment before production!