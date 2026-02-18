# Restaurant Management Backend

A TypeScript-based Express.js backend API for restaurant management system.

## 🚀 Features

- **TypeScript** - Type-safe development
- **Express.js** - Fast, unopinionated web framework
- **Nodemon** - Auto-restart on file changes during development
- **ESLint Ready** - Code quality and consistency

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

## 🏃 Running the Application

### Development Mode (with hot reload)

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Or run build and start together

```bash
npm run prod
```

## 📜 Available Scripts

| Script               | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| `npm run dev`        | Start development server with nodemon (auto-restart on changes) |
| `npm run build`      | Compile TypeScript to JavaScript in `dist/` folder              |
| `npm start`          | Run the compiled production build                               |
| `npm run clean`      | Remove the `dist/` folder                                       |
| `npm run prod`       | Build and start production server                               |
| `npm run type-check` | Check TypeScript types without emitting files                   |

## 📁 Project Structure

```
restaurant-management-backend/
├── src/
│   └── index.ts          # Main application entry point
├── dist/                 # Compiled JavaScript (generated)
├── node_modules/         # Dependencies
├── .env                  # Environment variables (not in git)
├── .env.example          # Example environment variables
├── .gitignore           # Git ignore rules
├── nodemon.json         # Nodemon configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project dependencies and scripts
└── README.md            # This file
```

## 🔧 Configuration Files

### `tsconfig.json`

TypeScript compiler configuration with strict mode enabled and ES2020 target.

### `nodemon.json`

Nodemon configuration to watch `.ts` and `.json` files in the `src/` directory and auto-restart the server.

### `.env`

Environment variables for the application:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)

## 🌐 API Endpoints

### Base URL

```
http://localhost:3000
```

### Available Routes

| Method | Endpoint  | Description                  |
| ------ | --------- | ---------------------------- |
| GET    | `/`       | Welcome message and API info |
| GET    | `/health` | Health check endpoint        |

## 🔍 Development

The project uses:

- **TypeScript** for type safety
- **Nodemon** for automatic server restart during development
- **ts-node** for running TypeScript directly without compilation

When you run `npm run dev`, nodemon will:

1. Watch for changes in `.ts` and `.json` files
2. Automatically restart the server when changes are detected
3. Use `ts-node` to execute TypeScript directly

## 🏗️ Building for Production

1. Build the project:

```bash
npm run build
```

2. The compiled JavaScript will be in the `dist/` folder

3. Start the production server:

```bash
npm start
```

## 📝 License

ISC

## 👤 Author

Your Name
