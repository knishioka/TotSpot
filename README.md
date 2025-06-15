# TotSpot - Find Family-Friendly Venues

TotSpot is a mobile application that helps parents in the UK find child-friendly venues with detailed facility information. Starting in Oxford and expanding across Europe.

## 🌟 Key Features

- **AI-Powered Recommendations**: Get personalized venue suggestions based on your child's age and needs
- **Real-Time Crowd Levels**: See how busy venues are right now and plan the perfect time to visit
- **Essential Facilities Info**: Find venues with baby changing, high chairs, nursing rooms, and more
- **Parent Reviews**: Read honest experiences from other parents in your community
- **Offline Support**: Access previously viewed venues without internet connection

## 📱 Screenshots

(Coming soon)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator
- Supabase account for backend services

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/TotSpot.git
   cd TotSpot
   ```

2. **Install dependencies**
   ```bash
   cd apps/mobile
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.sample .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Set up the database**
   
   In your Supabase dashboard, run the SQL migrations in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_seed_data.sql`
   - `supabase/migrations/003_demo_data.sql`

5. **Install pre-commit hooks**
   ```bash
   npm install --save-dev husky
   npx husky install
   npx husky add .husky/pre-commit "cd apps/mobile && npm run lint"
   ```

6. **Set up demo data (optional)**
   ```bash
   npm run setup-demo
   ```
   
   This creates demo users:
   - sarah@demo.com / DemoPass123!
   - james@demo.com / DemoPass123!
   - emma@demo.com / DemoPass123!
   - test@demo.com / DemoPass123!

### Running the App

1. **Start the development server**
   ```bash
   npm start
   ```

2. **Run on iOS Simulator**
   ```bash
   npm run ios
   ```

3. **Run on Android Emulator**
   ```bash
   npm run android
   ```

4. **Run on physical device**
   - Install Expo Go app on your device
   - Scan the QR code from the terminal

## 🛠️ Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run setup-demo` - Set up demo data

### Project Structure

```
TotSpot/
├── apps/
│   └── mobile/              # React Native mobile app
│       ├── src/
│       │   ├── components/  # Reusable UI components
│       │   ├── screens/     # Screen components
│       │   ├── navigation/  # Navigation configuration
│       │   ├── services/    # API services
│       │   ├── hooks/       # Custom React hooks
│       │   ├── utils/       # Utility functions
│       │   ├── constants/   # App constants
│       │   └── types/       # TypeScript types
│       ├── assets/          # Images, fonts, etc.
│       └── app.json        # Expo configuration
├── supabase/
│   └── migrations/         # Database migrations
└── docs/                   # Documentation
```

### Tech Stack

- **Frontend**: React Native with Expo
- **State Management**: Zustand + React Query
- **Backend**: Supabase (PostgreSQL + PostGIS)
- **Maps**: react-native-maps
- **UI/UX**: Custom design system
- **Testing**: Jest + React Native Testing Library

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## 📝 Code Style

This project uses ESLint and Prettier for code formatting. Linting is automatically run on pre-commit.

To manually run linting:
```bash
npm run lint
```

To fix linting issues:
```bash
npm run lint -- --fix
```

## 🤝 Contributing

Please read [CLAUDE.md](CLAUDE.md) for detailed development guidelines and coding standards.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Japan's ママパパマップ (MamaPapaMap)
- Built with love for parents everywhere
- Special thanks to all contributors

## 📞 Support

For support, email support@totspot.app or join our Slack channel.

## 🚀 Deployment

### Building for Production

**iOS**
```bash
npm run build:ios
```

**Android**
```bash
npm run build:android
```

### Environment Variables

Make sure to set up the following environment variables in your production environment:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (for admin operations only)

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Advanced filtering options
- [ ] Social features (parent meetups)
- [ ] Business dashboard for venues
- [ ] Booking integration

---

Made with ❤️ by parents, for parents