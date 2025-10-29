@echo off
echo ========================================
echo    Fashion Shop Q - Quick Start
echo ========================================
echo.

echo [1/4] Checking project structure...
if not exist "backend" (
    echo ❌ Backend folder not found!
    pause
    exit /b 1
)
if not exist "frontend-new" (
    echo ❌ Frontend folder not found!
    pause
    exit /b 1
)
echo ✅ Project structure verified

echo.
echo [2/4] Starting Backend Server...
cd backend
start "Fashion Shop Backend" cmd /k "echo Starting Spring Boot Backend... && mvn spring-boot:run"
cd ..

echo [3/4] Waiting for backend to initialize...
echo (This may take 30-60 seconds for first run)
timeout /t 15 /nobreak > nul

echo [4/4] Starting Frontend Application...
cd frontend-new
start "Fashion Shop Frontend" cmd /k "echo Starting React Frontend... && npm start"
cd ..

echo.
echo ========================================
echo    🚀 Fashion Shop Q is Starting!
echo ========================================
echo.
echo 📱 Frontend: http://localhost:3001
echo 🔧 Backend:  http://localhost:8084
echo 📊 API Docs: http://localhost:8084/api/auth/health
echo.
echo 💡 Tips:
echo - Wait for both servers to fully start
echo - Frontend will open automatically in browser
echo - Check console windows for any errors
echo.
echo Press any key to close this window...
pause > nul