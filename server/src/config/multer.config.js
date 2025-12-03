import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../../uploads");
const productsDir = path.join(uploadsDir, "products");
const usersDir = path.join(uploadsDir, "users");

[uploadsDir, productsDir, usersDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Set storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter });
// Storage configuration for product images
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, productsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `product-${uniqueSuffix}${ext}`);
  },
});

// Storage configuration for user photos
const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, usersDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `user-${uniqueSuffix}${ext}`);
  },
});

// File filter for images
const imageFilter = (req, file, cb) => {
  // Allowed image types
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      new Error("Only image files are allowed! (jpeg, jpg, png, gif, webp)"),
      false
    );
  }
};

// Multer instance for product images (multiple files)
export const uploadProductImages = multer({
  storage: productStorage,
  limits: {
    
  },
  fileFilter: imageFilter,
}).array("images", 10); // Allow up to 10 images

// Multer instance for single product image
export const uploadSingleProductImage = multer({
  storage: productStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: imageFilter,
}).single("image");

// Multer instance for user photo (single file)
export const uploadUserPhoto = multer({
  storage: userStorage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: imageFilter,
}).single("photo");

// Helper function to get file URL
export const getFileUrl = (filePath) => {
  if (!filePath) return null;
  // If it's already a URL, return it
  if (filePath.startsWith("http")) return filePath;
  // Otherwise, construct the URL
  const relativePath = filePath.replace(uploadsDir, "").replace(/\\/g, "/");
  return `/uploads${relativePath}`;
};

// Helper function to get product image URL
export const getProductImageUrl = (filename) => {
  if (!filename) return null;
  if (filename.startsWith("http")) return filename;
  return `/uploads/products/${filename}`;
};

// Helper function to get user photo URL
export const getUserPhotoUrl = (filename) => {
  if (!filename) return null;
  if (filename.startsWith("http")) return filename;
  return `/uploads/users/${filename}`;
};

export { productsDir, usersDir, uploadsDir };
