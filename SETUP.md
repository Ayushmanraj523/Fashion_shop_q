# Fashion Shop Q - Setup Instructions

## Environment Configuration

### 1. Copy Environment File
```bash
cp .env.example .env
```

### 2. Configure Database
- Install MySQL 8.0+
- Create database: `CREATE DATABASE fashion_shop_db;`
- Update `.env` with your MySQL credentials

### 3. Configure Email (Gmail)
- Enable 2-Factor Authentication
- Generate App Password: https://myaccount.google.com/apppasswords
- Update `.env` with your Gmail credentials

### 4. Configure Twilio (SMS)
- Create Twilio account: https://www.twilio.com/
- Get Account SID, Auth Token, and Phone Number
- Update `.env` with Twilio credentials

### 5. Security Configuration
- Generate strong JWT secret (minimum 32 characters)
- Update CORS origins for production

## Quick Start
```bash
# Backend
cd backend
mvn spring-boot:run

# Frontend
cd frontend-new
npm install
npm start
```

## Production Deployment
- Set `JPA_SHOW_SQL=false`
- Set `SECURITY_ENABLED=true`
- Use strong JWT secret
- Configure proper CORS origins
- Use environment-specific database