# موقع التجارة الإلكترونية

## نظرة عامة
مشروع موقع تجارة إلكترونية باستخدام:
- **Backend**: Node.js مع بنية Microservices
- **Frontend**: React

## المميزات المطلوبة
- إدارة المستخدمين: إضافة، تعديل، حذف
- إدارة المنتجات: إضافة، تعديل، حذف
- سلة التسوق: إضافة منتجات، تعديل، حذف

## بنية Microservices

### 1. User Service (خدمة المستخدمين)
- إدارة المستخدمين (CRUD)
- المصادقة والتفويض
- الملفات: `users-service/`

### 2. Product Service (خدمة المنتجات)
- إدارة المنتجات (CRUD)
- الملفات: `products-service/`

### 3. Cart Service (خدمة سلة التسوق)
- إدارة سلة التسوق
- إضافة/حذف/تعديل المنتجات في السلة
- الملفات: `cart-service/`

### 4. API Gateway
- نقطة الدخول الوحيدة للخدمات
- التوجيه والتحميل الموازن
- الملفات: `api-gateway/`

### 5. Shared (مشترك)
- نماذج البيانات المشتركة
- أدوات مساعدة
- الملفات: `shared/`

## بنية Frontend (React)
- واجهة المستخدم
- مكونات تفاعلية
- إدارة الحالة
- الملفات: `frontend/`

## التقنيات المستخدمة
- **Backend**: Node.js, Express.js
- **Frontend**: React, React Router
- **Database**: MongoDB (مقترح)
- **Communication**: REST APIs
- **Containerization**: Docker (اختياري)
