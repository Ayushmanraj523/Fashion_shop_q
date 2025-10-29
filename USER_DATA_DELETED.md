# User Data Deletion Instructions

## ✅ To Delete All User Data:

### **Option 1: MySQL Workbench/Command Line**
```sql
USE fashion_shop_db;
DELETE FROM users;
```

### **Option 2: Restart Backend (Auto-creates fresh tables)**
1. Stop backend server
2. Start backend again
3. Fresh empty users table created

### **Option 3: Browser Session Data**
- Open browser Dev Tools (F12)
- Go to Application > Local Storage
- Clear all data

## 🗑️ **Status**: Ready for deletion via MySQL

**Note**: Backend API endpoint exists but requires direct database access for reliable deletion.