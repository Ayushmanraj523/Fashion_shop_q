# Fashion Shop Q - E-commerce Platform

A modern, full-stack e-commerce platform built with React and Spring Boot, featuring OTP-based authentication, product management, and a responsive design.

## 🚀 Features

- **OTP-Based Authentication**: Secure login/registration via email and SMS
- **Product Management**: Browse, search, and filter products
- **Shopping Cart**: Add/remove items with persistent storage
- **Responsive Design**: Mobile-first, modern UI
- **Real-time Notifications**: Email and SMS integration
- **Secure API**: JWT-based authentication with CORS support

## 🛠️ Tech Stack

### Backend
- **Spring Boot 3.5.6** - Java framework
- **MySQL** - Database
- **JWT** - Authentication tokens
- **Twilio** - SMS notifications
- **Spring Mail** - Email notifications
- **Maven** - Dependency management

### Frontend
- **React 19.2.0** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Modern CSS** - Responsive styling

## 📁 Project Structure

```
Fashion_shop_q/
├── backend/                    # Spring Boot API
│   ├── src/main/java/com/fashion/backend/
│   │   ├── config/            # Security & configuration
│   │   ├── controller/        # REST API endpoints
│   │   ├── dto/              # Data transfer objects
│   │   ├── model/            # JPA entities
│   │   ├── repository/       # Data access layer
│   │   ├── service/          # Business logic
│   │   └── util/             # Utility classes
│   └── src/main/resources/
│       ├── application.properties  # Configuration
│       └── data.sql              # Sample data
├── frontend-new/              # React Application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── config/          # API configuration
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   ├── styles/          # CSS files
│   │   └── utils/           # Utility functions
│   └── public/              # Static assets
├── RUN_PROJECT.bat           # Quick start script
└── README.md                # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 16+
- MySQL 8.0+
- Maven 3.6+

### 1. Database Setup
```sql
CREATE DATABASE fashion_shop_db;
```

### 2. Backend Configuration
Edit `backend/src/main/resources/application.properties`:
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/fashion_shop_db
spring.datasource.username=your_username
spring.datasource.password=your_password

# Email (Gmail)
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password

# Twilio SMS
twilio.account.sid=your_twilio_sid
twilio.auth.token=your_twilio_token
twilio.phone.number=your_twilio_phone
```

### 3. Start Backend
```bash
cd backend
mvn spring-boot:run
```
Backend runs on: http://localhost:8084

### 4. Start Frontend
```bash
cd frontend-new
npm install
npm start
```
Frontend runs on: http://localhost:3001

### 5. Quick Start (Windows)
```bash
RUN_PROJECT.bat
```

## 🔐 Authentication Flow

1. **Registration**: User provides name, email, phone
2. **OTP Verification**: OTP sent via email and SMS
3. **Login**: User requests OTP for login
4. **JWT Token**: Secure session management

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-otp` - Verify registration OTP
- `POST /api/auth/request-otp` - Request login OTP
- `POST /api/auth/verify-login-otp` - Verify login OTP
- `GET /api/auth/health` - Health check

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/{id}` - Update product (admin)
- `DELETE /api/products/{id}` - Delete product (admin)

## 🎨 Frontend Pages

- **HomePage** - Product showcase with search/filter
- **Login/Signup** - OTP-based authentication
- **Cart** - Shopping cart management
- **Checkout** - Order processing
- **Profile** - User account management
- **Orders** - Order history
- **Wishlist** - Saved products
- **Customer Support** - Help and support

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```
PORT=3001
REACT_APP_API_URL=http://localhost:8084
```

#### Backend (application.properties)
```
server.port=8084
jwt.secret=your_jwt_secret
jwt.expiration=86400000
```

## 🛡️ Security Features

- JWT token-based authentication
- OTP verification for registration/login
- CORS configuration
- Input validation and sanitization
- Secure password handling (OTP-based, no passwords stored)

## 🚀 Deployment

### Production Build
```bash
# Frontend
cd frontend-new
npm run build

# Backend
cd backend
mvn clean package
```

### Docker (Optional)
```dockerfile
# Backend Dockerfile
FROM openjdk:17-jdk-slim
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8084
ENTRYPOINT ["java", "-jar", "/app.jar"]

# Frontend Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend-new
npm test
```

## 📊 Performance

- **Responsive Design**: Mobile-first approach
- **Loading States**: Smooth user experience
- **Error Handling**: Comprehensive error boundaries
- **Code Splitting**: Optimized bundle sizes
- **Image Optimization**: Lazy loading and fallbacks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: ayushmanraj927@gmail.com

## 🔄 Version History

- **v1.0.0** - Initial release with OTP authentication and product management
- **v1.1.0** - Enhanced UI and performance improvements
- **v1.2.0** - Mobile responsiveness and bug fixes

---

**Status**: ✅ Production Ready  
**Last Updated**: January 2025  
**Maintained by**: Fashion Shop Q Team