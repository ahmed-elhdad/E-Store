import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description:
        "API documentation for E-commerce application with authentication, products, cart, orders, and wishlist management",
      contact: {
        name: "API Support",
        email: process.env.EMAIL_USER,
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: "Development server",
      },
      {
        url: "http://localhost:5000/docs",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token in the format: Bearer <token>",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "User ID",
            },
            name: {
              type: "string",
              description: "User name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email",
            },
            photo: {
              type: "string",
              description: "User photo URL",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              default: "user",
            },
            cart: {
              type: "array",
              items: {
                $ref: "#/components/schemas/CartItem",
              },
            },
            wishList: {
              type: "array",
              items: {
                type: "string",
                description: "Product ID",
              },
            },
            orders: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Order",
              },
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Product ID",
            },
            title: {
              type: "string",
              description: "Product title",
            },
            description: {
              type: "string",
              description: "Product description",
            },
            category: {
              type: "string",
              description: "Product category",
            },
            images: {
              type: "array",
              items: {
                type: "string",
                format: "uri",
              },
              description: "Product images URLs",
            },
            price: {
              type: "number",
              description: "Product price",
            },
            saler: {
              type: "string",
              description: "Seller email",
            },
            quantity: {
              type: "number",
              description: "Available quantity",
            },
          },
        },
        CartItem: {
          type: "object",
          properties: {
            productId: {
              type: "string",
              description: "Product ID",
            },
            quantity: {
              type: "number",
              description: "Quantity",
            },
            price: {
              type: "number",
              description: "Price per unit",
            },
          },
        },
        Order: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Order ID",
            },
            items: {
              type: "array",
              items: {
                $ref: "#/components/schemas/CartItem",
              },
            },
            total_price: {
              type: "number",
              description: "Total order price",
            },
            orderDate: {
              type: "string",
              format: "date-time",
            },
            status: {
              type: "string",
              enum: ["pending", "completed", "cancelled"],
              default: "pending",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
            },
            message: {
              type: "string",
              description: "Error message",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js", "./server.js"], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, swaggerUi };
