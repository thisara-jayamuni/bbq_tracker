# 🔥 BBQ Tracker

A comprehensive BBQ tracking and management system built with HTML, CSS, JavaScript, Materialize CSS, Node.js, Express, and MongoDB.

## 🚀 Features

- Show nearby BBQ location with real-time updates
- Interactive fault reporting system
- User Management and Authentication
- BBQ device management and issues tracking
- Job scheduling and tracking
- Responsive and modern UI with Materialize CSS
- RESTful API architecture
- Device readings monitoring and analytics
- Data visualization and reporting

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Materialize CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: Docker
- **Development**: Nodemon for hot-reloading

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v6.0 or higher)
- Docker and Docker Compose (for containerized deployment)

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/thisara-jayamuni/bbq_tracker.git
   cd bbq_tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `env` directory
   - Copy the contents from `.env.example` (if available)
   - Update the variables as needed

4. Run the application:

   **Development mode:**
   ```bash
   npm run dev
   ```

   **Production mode:**
   ```bash
   npm start
   ```

## 🐳 Docker Deployment

1. Build and run using Docker Compose:
   ```bash
   docker-compose up -d
   ```

2. The application will be available at:
   - API: http://localhost:5000
   - MongoDB: mongodb://localhost:27017

## 📁 Project Structure

```
bbq_tracker/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── docker/        # Docker configuration
├── env/           # Environment variables
├── jobs/          # Background jobs
├── middlewares/   # Custom middlewares
├── models/        # Database models
├── public/        # Static files
├── routes/        # API routes
├── services/      # Business logic
├── server.js      # Application entry point
└── docker-compose.yml
```

## 🔌 API Endpoints

- `/api/auth` - Authentication routes
- `/api/users` - User management
- `/api/bbqs` - BBQ device management
- `/api/faults` - Fault reporting
- `/api/jobs` - Job management
- `/api/devices` - Device management
- `/api/read` - Device readings

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS enabled
- Environment variable configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Thisara Jayamuni
Harshana Fernando

## 📞 Support

For support, please open an issue in the GitHub repository. 