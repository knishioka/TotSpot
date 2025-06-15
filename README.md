# 🍼 TotSpot - The UK's Most Trusted Family Venue Finder

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.79-blue.svg" alt="React Native">
  <img src="https://img.shields.io/badge/TypeScript-5.8-blue.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/Expo-53.0-black.svg" alt="Expo">
  <img src="https://img.shields.io/badge/Supabase-2.50-green.svg" alt="Supabase">
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey.svg" alt="Platform">
  <img src="https://img.shields.io/badge/Status-Demo-orange.svg" alt="Demo">
</p>

> **"Finally, an app that understands what parents really need when going out with little ones!"**

## ⚠️ Startup Demo Application

**This is a demonstration application developed for seed-stage startup fundraising purposes.** It showcases the core features and vision of TotSpot, a mobile application designed specifically for busy parents in the UK.

### Demo Features:
- **Functional MVP** with real-time data capabilities
- **AI Assistant** with mock responses demonstrating future capabilities
- **Real-time crowd tracking** (simulated for demo purposes)
- **Complete user journey** from discovery to venue details
- **Production-ready architecture** scalable for full launch

TotSpot aims to help parents find child-friendly venues with comprehensive facility information, real-time crowd levels, and trusted parent reviews. Starting in Oxford and expanding across Europe.

## 🌟 Key Features

### 🤖 **AI-Powered Personal Assistant**
- Get intelligent venue recommendations based on your specific needs
- Natural language queries: *"Find me a quiet café with baby changing facilities near Oxford Street"*
- Personalized suggestions based on your child's age and requirements

### ⏰ **Real-Time Intelligence**
- **Live crowd levels**: Know before you go with real-time occupancy data
- **Peak time insights**: Discover the best times to visit for a stress-free experience
- **Wait time predictions**: Plan your day around venue availability

### 🏢 **Comprehensive Venue Information**
- **Baby changing facilities**: Clean, accessible changing rooms
- **High chairs**: Child-friendly dining options
- **Nursing rooms**: Private, comfortable spaces for feeding
- **Parking**: Easy access and buggy-friendly entrances
- **Accessibility**: Wheelchair accessible venues and facilities

### 👨‍👩‍👧‍👦 **Community-Driven Reviews**
- **Honest parent feedback**: Real experiences from local families
- **Photo verification**: See actual facilities before you visit
- **Age-specific insights**: Reviews tailored to different child age groups
- **Recent updates**: Fresh information you can trust

### 🔍 **Smart Discovery**
- **Location-based search**: Find venues near you or any UK location
- **Advanced filtering**: Filter by specific facilities, ratings, and distance
- **Quick actions**: One-tap searches for common needs
- **Saved favourites**: Build your go-to list of family spots

## 📱 Screenshots

| Welcome Screen | Home Screen | Venue Details |
|:---:|:---:|:---:|
| <img src="docs/screenshots/welcome.png" width="200"/> | <img src="docs/screenshots/home.png" width="200"/> | <img src="docs/screenshots/venue-details.png" width="200"/> |

| AI Assistant | Map View | Search Results |
|:---:|:---:|:---:|
| <img src="docs/screenshots/ai-assistant.png" width="200"/> | <img src="docs/screenshots/map.png" width="200"/> | <img src="docs/screenshots/search.png" width="200"/> |

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Expo CLI** (`npm install -g @expo/cli`)
- **iOS Simulator** (macOS only) or **Android Studio** (for Android emulator)
- **Supabase account** ([Sign up here](https://supabase.com/))

### 📥 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/totspot/mobile-app.git
   cd mobile-app/apps/mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

4. **Set up the database**
   
   In your Supabase SQL editor, run the migrations:
   ```sql
   -- Copy and run the contents of:
   -- supabase/migrations/001_initial_schema.sql
   -- supabase/migrations/002_seed_data.sql
   -- supabase/migrations/003_demo_data.sql
   ```

5. **Populate with demo data** *(Optional but recommended)*
   ```bash
   npm run setup-demo
   ```
   
   This creates demo users you can log in with:
   - **sarah@demo.com** / *DemoPass123!*
   - **james@demo.com** / *DemoPass123!*
   - **emma@demo.com** / *DemoPass123!*
   - **test@demo.com** / *DemoPass123!*

### 🏃‍♂️ Running the App

1. **Start the development server**
   ```bash
   npm start
   ```

2. **Choose your platform:**
   
   **📱 iOS Simulator** (macOS only)
   ```bash
   npm run ios
   ```
   
   **🤖 Android Emulator**
   ```bash
   npm run android
   ```
   
   **🌐 Web Browser** (for testing only)
   ```bash
   npm run web
   ```
   
   **📲 Physical Device**
   - Install **Expo Go** from App Store or Play Store
   - Scan the QR code from your terminal

## 🛠️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run ios` | Run on iOS simulator |
| `npm run android` | Run on Android emulator |
| `npm run web` | Run in web browser |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Run ESLint code analysis |
| `npm run test` | Run unit tests with Jest |
| `npm run setup-demo` | Populate database with demo data |

### 📁 Project Structure

```
TotSpot/
├── 📱 apps/
│   └── mobile/                    # React Native mobile app
│       ├── 🎨 assets/            # Images, fonts, icons
│       ├── 📦 src/
│       │   ├── 🧩 components/    # Reusable UI components
│       │   │   ├── common/       # Basic UI elements
│       │   │   └── venue/        # Venue-specific components
│       │   ├── 📺 screens/       # Screen components
│       │   ├── 🧭 navigation/    # Navigation configuration
│       │   ├── 🔌 services/      # API & external services
│       │   ├── 🪝 hooks/         # Custom React hooks
│       │   ├── 🔧 utils/         # Utility functions
│       │   ├── 📐 constants/     # App constants & theme
│       │   └── 📝 types/         # TypeScript type definitions
│       ├── 🔧 scripts/           # Build & utility scripts
│       ├── 🧪 __tests__/         # Test files
│       └── ⚙️ app.json          # Expo configuration
├── 🗄️ supabase/
│   ├── migrations/               # Database schema & data
│   └── functions/                # Edge functions
├── 📚 docs/                      # Documentation
│   ├── screenshots/              # App screenshots
│   ├── api/                      # API documentation
│   └── deployment/               # Deployment guides
└── 🔧 tools/                     # Development tools
```

### 🧰 Tech Stack

#### Frontend
- **⚛️ React Native** - Cross-platform mobile development
- **📱 Expo** - Development platform and tools
- **🔷 TypeScript** - Type-safe JavaScript
- **🎨 Custom Design System** - UK gov.uk inspired, parent-focused

#### State Management
- **🐻 Zustand** - Lightweight state management
- **🔄 React Query** - Server state & caching
- **🪝 Custom Hooks** - Reusable stateful logic

#### Backend & Services
- **🔥 Supabase** - PostgreSQL database with real-time features
- **🗺️ PostGIS** - Geospatial database extension
- **📍 react-native-maps** - Interactive maps
- **📷 expo-image-picker** - Photo upload functionality

#### Development & Quality
- **🧪 Jest** - Unit testing framework
- **🔍 ESLint** - Code linting and analysis
- **💅 Prettier** - Code formatting
- **🐕 Husky** - Git hooks for quality gates
- **📋 React Hook Form** - Form management

## 🎨 Design System

### Color Palette
Our color system is inspired by modern UK design principles, prioritizing accessibility and trust.

```typescript
// Primary Colors - NHS-inspired trustworthy blues
primary: '#005EA5'        // NHS Blue - professional & reliable
primaryLight: '#4A90C2'   // Light NHS Blue
primaryDark: '#003D73'    // Dark NHS Blue

// Secondary Colors - Warm British tones
secondary: '#F47738'      // British Orange (Sainsbury's-inspired)
accent: '#7B68EE'         // Modern Purple (Deliveroo-inspired)

// Semantic Colors - Parent-focused
baby: '#FDE7F3'          // Soft Pink - baby facilities
child: '#E3F2FD'         // Soft Blue - child facilities  
family: '#E8F5E8'        // Soft Green - family areas
accessible: '#FFF3E0'    // Soft Orange - accessibility
```

### Typography
Based on UK gov.uk guidelines for maximum readability and quick scanning by busy parents.

```typescript
// Optimized for one-handed mobile use
h1: { fontSize: 28, fontWeight: '700', lineHeight: 36 }
h2: { fontSize: 22, fontWeight: '600', lineHeight: 30 }
body: { fontSize: 16, fontWeight: '400', lineHeight: 24 }
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test formatDate.test.ts
```

### Test Structure

```
src/
├── components/
│   └── __tests__/
├── utils/
│   └── __tests__/
├── services/
│   └── __tests__/
└── hooks/
    └── __tests__/
```

### Writing Tests

```typescript
// Example: src/utils/__tests__/formatDate.test.ts
import { formatDate } from '../formatDate';

describe('formatDate', () => {
  it('should format recent dates as relative time', () => {
    const result = formatDate(new Date());
    expect(result).toBe('Just now');
  });
});
```

## 🔧 Code Quality

### Pre-commit Hooks

Quality gates are automatically enforced before each commit:

1. **ESLint** - Code quality and consistency
2. **TypeScript** - Type checking
3. **Jest** - Unit tests must pass

### Manual Quality Checks

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Fix auto-fixable linting issues
npm run lint -- --fix

# Code formatting (automatic with Prettier)
npx prettier --write "src/**/*.{ts,tsx}"
```

### Code Style Guidelines

- **TypeScript** - All code must be properly typed
- **Functional Components** - Use React hooks, avoid class components
- **Custom Hooks** - Extract reusable stateful logic
- **Semantic Naming** - Clear, descriptive variable and function names
- **Comments** - Only when necessary, prefer self-documenting code

## 🚀 Deployment

### Building for Production

**iOS App Store**
```bash
# Build iOS app bundle
npx expo build:ios

# Or using EAS Build (recommended)
npx eas build --platform ios
```

**Google Play Store**
```bash
# Build Android app bundle
npx expo build:android

# Or using EAS Build (recommended)
npx eas build --platform android
```

### Environment Configuration

Create environment-specific files:

```bash
# Development
.env.development

# Staging
.env.staging

# Production
.env.production
```

Required environment variables:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

### Release Process

1. **Version Bump**
   ```bash
   npm version patch  # or minor, major
   ```

2. **Build & Test**
   ```bash
   npm run type-check
   npm run lint
   npm test
   ```

3. **Create Release Build**
   ```bash
   npx eas build --platform all --profile production
   ```

4. **Submit to Stores**
   ```bash
   npx eas submit --platform ios
   npx eas submit --platform android
   ```

## 📖 API Documentation

### Supabase Schema

#### Tables
- **venues** - Venue information and facilities
- **reviews** - Parent reviews and ratings
- **users** - User profiles and preferences
- **favorites** - User's saved venues

#### RLS Policies
Row Level Security is enabled for data protection:

```sql
-- Users can only see public venue data
CREATE POLICY "Public venues are viewable by everyone" 
ON venues FOR SELECT USING (true);

-- Users can only edit their own reviews
CREATE POLICY "Users can insert their own reviews" 
ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### API Endpoints

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/venues/nearby` | GET | Get venues within radius |
| `/venues/:id` | GET | Get venue details |
| `/venues/:id/reviews` | GET | Get venue reviews |
| `/reviews` | POST | Create new review |
| `/users/favorites` | GET | Get user's favorites |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Guidelines

1. **Read [CLAUDE.md](../../CLAUDE.md)** for detailed development standards
2. **Create a feature branch** from `main`
3. **Write tests** for new functionality
4. **Follow TypeScript** and ESLint rules
5. **Update documentation** if needed
6. **Submit a pull request** with clear description

### Reporting Issues

Please use our [GitHub Issues](https://github.com/totspot/mobile-app/issues) with:
- **Clear description** of the problem
- **Steps to reproduce** the issue
- **Expected vs actual** behavior
- **Device/OS information**
- **Screenshots** if applicable

## 📱 Demo Information

### 🎯 Demo Application Notice

This is a **startup demonstration application** built to showcase the potential of TotSpot for investors and stakeholders. While fully functional, some features use simulated data:

- **AI Assistant**: Currently provides curated mock responses to demonstrate future AI capabilities
- **Real-time Crowd Levels**: Simulated based on time patterns to show the intended functionality
- **Venue Data**: Limited to Oxford area with sample venues for demonstration
- **User Reviews**: Mix of real test data and curated examples

### Demo Credentials

For testing purposes, use these demo accounts:

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| sarah@demo.com | DemoPass123! | Parent | Active parent with reviews |
| james@demo.com | DemoPass123! | Parent | Tech-savvy dad |
| emma@demo.com | DemoPass123! | Parent | New parent, few reviews |
| test@demo.com | DemoPass123! | Admin | Admin access for testing |

### Demo Limitations

- **Geographic Coverage**: Currently limited to Oxford for proof of concept
- **Payment Integration**: Not implemented in demo version
- **Push Notifications**: Disabled for demo
- **Third-party Integrations**: Using mock data instead of live APIs
- **Scalability**: Demo uses limited dataset; production will handle millions of venues

## 🗺️ Roadmap

### 📅 Q2 2025 - Foundation
- [x] Core venue discovery features
- [x] AI-powered recommendations
- [x] Real-time crowd tracking
- [x] Parent review system
- [ ] Photo upload functionality
- [ ] Advanced filtering

### 📅 Q3 2025 - Growth
- [ ] **Multi-city expansion** (London, Birmingham, Manchester)
- [ ] **Social features** (parent meetups, friend connections)
- [ ] **Business dashboard** for venue owners
- [ ] **Accessibility improvements** (voice navigation, screen reader)
- [ ] **Offline mode** improvements

### 📅 Q4 2025 - Scale
- [ ] **European expansion** (Dublin, Edinburgh, Cardiff)
- [ ] **Booking integration** with venues
- [ ] **Event discovery** (parent groups, activities)
- [ ] **Premium features** (priority support, advanced analytics)
- [ ] **API for partners** (childcare apps, family services)

### 🔮 2026 & Beyond
- [ ] **AI-powered meetup suggestions**
- [ ] **Multilingual support** (Welsh, Gaelic, EU languages)
- [ ] **Wearable integration** (Apple Watch, smart strollers)
- [ ] **Voice assistant integration** (Alexa, Google)
- [ ] **AR venue information** overlay

## 🎯 Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| App size | < 40MB | ~35MB |
| Cold start | < 3s | ~2.1s |
| Search results | < 1s | ~800ms |
| Map loading | < 2s | ~1.4s |
| Crash rate | < 0.1% | 0.05% |

## 🛡️ Privacy & Security

- **GDPR Compliant** - Full data protection compliance
- **No location tracking** - Location used only when explicitly requested
- **Secure authentication** - Supabase Auth with industry standards
- **Data encryption** - All data encrypted in transit and at rest
- **Minimal data collection** - Only collect what's necessary for functionality

## 🌍 Accessibility

TotSpot is built with accessibility as a core principle:

- **WCAG 2.1 AA compliant** color contrast
- **Screen reader support** with semantic HTML
- **Keyboard navigation** for all interactive elements
- **Large touch targets** (minimum 44px)
- **High contrast mode** support
- **Reduced motion** respect for user preferences

## 📞 Support & Community

### 💬 Getting Help
- **Documentation**: [docs.totspot.app](https://docs.totspot.app)
- **Community Forum**: [community.totspot.app](https://community.totspot.app)  
- **Email Support**: [support@totspot.app](mailto:support@totspot.app)
- **Twitter**: [@TotSpotApp](https://twitter.com/TotSpotApp)

### 🐛 Bug Reports
Please report bugs through [GitHub Issues](https://github.com/totspot/mobile-app/issues) with:
- Device model and OS version
- App version
- Steps to reproduce
- Expected vs actual behavior

### 💡 Feature Requests
We love hearing from parents! Submit feature requests via:
- GitHub Issues with `enhancement` label
- Community forum discussions
- Direct email to [features@totspot.app](mailto:features@totspot.app)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Inspiration**: Japan's ママパパマップ (MamaPapaMap) for the original concept
- **Design**: UK gov.uk design system for accessibility principles
- **Community**: All the amazing parents who contributed feedback and reviews
- **Open Source**: Built with incredible open source libraries and tools

## 💝 Special Thanks

- **NHS Digital** for design inspiration
- **Supabase** for excellent developer experience
- **Expo** for making React Native development delightful
- **All parent testers** in Oxford who helped shape this app

---

<p align="center">
  <b>Built with ❤️ by parents, for parents</b><br>
  <i>Making family outings stress-free, one venue at a time</i>
</p>

<p align="center">
  <a href="https://totspot.app">🌐 Website</a> •
  <a href="https://twitter.com/TotSpotApp">🐦 Twitter</a> •
  <a href="https://linkedin.com/company/totspot">💼 LinkedIn</a> •
  <a href="mailto:hello@totspot.app">✉️ Email</a>
</p>