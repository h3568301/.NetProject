# .NET Calendar Project

A full-stack calendar application built with .NET 9 Web API backend and React TypeScript frontend. This project provides user authentication, event management, and commenting functionality for a comprehensive calendar experience.

## 🏗️ Project Structure

```
.NetProject/
├── api/                    # .NET 9 Web API Backend
│   ├── Controllers/        # API Controllers
│   ├── Models/            # Data Models
│   ├── Data/              # Database Context
│   ├── Repository/        # Data Access Layer
│   ├── Service/           # Business Logic
│   ├── Interfaces/        # Service Contracts
│   ├── Dtos/              # Data Transfer Objects
│   ├── Mappers/           # Object Mapping
│   ├── Attributes/        # Custom Attributes
│   └── Migrations/        # EF Core Migrations
└── mycalender/            # React TypeScript Frontend
    ├── src/               # Source Code
    ├── public/            # Public Assets
    └── package.json       # Dependencies
```

## 🚀 Technologies Used

### Backend (.NET 9 Web API)
- **Framework**: .NET 9
- **Database**: SQL Server with Entity Framework Core 9.0.8
- **Authentication**: JWT Bearer Token + ASP.NET Core Identity
- **API Documentation**: Swagger/OpenAPI
- **JSON Serialization**: Newtonsoft.Json

### Frontend (React TypeScript)
- **Framework**: React 19.1.1 with TypeScript
- **Routing**: React Router 7.8.2
- **Forms**: React Hook Form 7.62.0 with Yup validation
- **HTTP Client**: Axios 1.11.0
- **Styling**: Tailwind CSS 3.4.17
- **Notifications**: React Toastify 11.0.5
- **Testing**: Jest & React Testing Library

## 📋 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Event Management**: Create, read, update, and delete calendar events
- **Comments**: Add and manage comments on events
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **API Documentation**: Interactive Swagger UI for API exploration

## 🛠️ Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js](https://nodejs.org/) (v16 or higher)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or SQL Server Express

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd .NetProject
```

### 2. Backend Setup

1. **Navigate to the API directory:**
   ```bash
   cd api
   ```

2. **Update Connection String:**
   - Edit `appsettings.json` and configure your SQL Server connection string
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Your SQL Server connection string here"
     }
   }
   ```

3. **Configure JWT Settings:**
   - Update JWT configuration in `appsettings.json`:
   ```json
   {
     "JWT": {
       "Issuer": "your-issuer",
       "Audience": "your-audience", 
       "SigningKey": "your-super-secret-key-here"
     }
   }
   ```

4. **Install Dependencies & Run Migrations:**
   ```bash
   dotnet restore
   dotnet ef database update
   ```

5. **Run the API:**
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:5001` or `http://localhost:5000`

### 3. Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd mycalender
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

## 📚 API Documentation

Once the backend is running, visit `https://localhost:5001/swagger` to explore the interactive API documentation.

### Main Endpoints

- **Authentication**: `/api/account/*` - User registration and login
- **Events**: `/api/event/*` - Calendar event management
- **Comments**: `/api/comment/*` - Event comment management

```

## 🔒 Security Features

- **Password Requirements**: 12+ characters with uppercase, lowercase, digit, and special character
- **JWT Authentication**: Secure token-based authentication
- **CORS Configuration**: Configured for React frontend on localhost:3000
- **Input Validation**: Form validation with Yup schema validation

Built with ❤️ using .NET 9 and React