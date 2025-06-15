const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Supabase setup
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // You'll need to add this to .env

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Environment variables not found!');
  console.error('EXPO_PUBLIC_SUPABASE_URL:', supabaseUrl || 'NOT SET');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'SET' : 'NOT SET');
  console.error('\nPlease check your .env file at:', path.join(__dirname, '..', '.env'));
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Demo users to create
const demoUsers = [
  {
    email: 'sarah@demo.com',
    password: 'DemoPass123!',
    displayName: 'Sarah J',
    metadata: { role: 'demo_user' }
  },
  {
    email: 'james@demo.com',
    password: 'DemoPass123!',
    displayName: 'James W',
    metadata: { role: 'demo_user' }
  },
  {
    email: 'emma@demo.com',
    password: 'DemoPass123!',
    displayName: 'Emma B',
    metadata: { role: 'demo_user' }
  },
  {
    email: 'test@demo.com',
    password: 'DemoPass123!',
    displayName: 'Test User',
    metadata: { role: 'demo_user' }
  },
];

async function createDemoUsers() {
  console.log('Creating demo users...');
  
  for (const user of demoUsers) {
    try {
      // First, try to get existing user
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const existingUser = existingUsers?.users?.find(u => u.email === user.email);
      
      let userId;
      
      if (existingUser) {
        console.log(`User already exists: ${user.email}`);
        userId = existingUser.id;
      } else {
        // Create user
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
          user_metadata: user.metadata
        });

        if (authError) {
          console.error(`Error creating user ${user.email}:`, authError.message);
          continue;
        }

        console.log(`Created user: ${user.email}`);
        userId = authData.user?.id;
      }

      // Create or update profile
      if (userId) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: userId,
            display_name: user.displayName,
          })
          .select()
          .single();

        if (profileError) {
          console.error(`Error creating profile for ${user.email}:`, profileError);
          console.error('Details:', JSON.stringify(profileError, null, 2));
        } else {
          console.log(`Created/updated profile for: ${user.email}`);
        }
      }
    } catch (error) {
      console.error(`Failed to create user ${user.email}:`, error);
    }
  }
}

async function addDemoReviews() {
  console.log('\nAdding demo reviews...');

  // Get demo users
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .in('display_name', ['Sarah J', 'James W', 'Emma B']);

  if (!profiles || profiles.length === 0) {
    console.error('No demo profiles found. Create users first.');
    return;
  }

  // Get venues to review
  const { data: venues } = await supabase
    .from('venues')
    .select('id, name')
    .limit(8);

  if (!venues || venues.length === 0) {
    console.error('No venues found.');
    return;
  }

  const reviews = [
    {
      comment: 'Perfect for families with young children! The baby changing facilities are spotless and they have a great selection of high chairs.',
      rating: 5,
      cleanliness_rating: 5,
      facilities_rating: 5,
      staff_rating: 5
    },
    {
      comment: 'Visited with my 2 year old and baby. Staff were incredibly helpful and the play area kept my toddler entertained while we ate.',
      rating: 5,
      cleanliness_rating: 4,
      facilities_rating: 5,
      staff_rating: 5
    },
    {
      comment: 'Best family cafe in Oxford! They warm baby food, have toys available, and the outdoor space is safely enclosed.',
      rating: 5,
      cleanliness_rating: 5,
      facilities_rating: 5,
      staff_rating: 4
    },
    {
      comment: 'Regular visitor here. Always clean, staff are patient with kids, and they don\'t mind if lunch takes 2 hours with a baby!',
      rating: 4,
      cleanliness_rating: 4,
      facilities_rating: 4,
      staff_rating: 5
    },
    {
      comment: 'Found this through TotSpot and wasn\'t disappointed. Nursing room was private and comfortable.',
      rating: 5,
      cleanliness_rating: 5,
      facilities_rating: 5,
      staff_rating: 4
    },
  ];

  // Add reviews
  for (let i = 0; i < venues.length && i < reviews.length; i++) {
    const venue = venues[i];
    const profile = profiles[i % profiles.length];
    const review = reviews[i % reviews.length];

    try {
      const { error } = await supabase
        .from('reviews')
        .upsert({
          venue_id: venue.id,
          user_id: profile.id,
          ...review,
        });

      if (error) {
        console.error(`Error adding review for ${venue.name}:`, error.message);
      } else {
        console.log(`Added review for: ${venue.name}`);
      }
    } catch (error) {
      console.error(`Failed to add review:`, error);
    }
  }
}

async function addDemoFavorites() {
  console.log('\nAdding demo favorites...');

  // Get demo users
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .in('display_name', ['Sarah J', 'James W', 'Emma B']);

  if (!profiles || profiles.length === 0) {
    console.error('No demo profiles found.');
    return;
  }

  // Get top venues
  const { data: venues } = await supabase
    .from('venues')
    .select('id, name')
    .in('name', ['The Missing Bean', 'Westgate Shopping Centre', 'University Parks', 'The Story Museum'])
    .limit(4);

  if (!venues || venues.length === 0) {
    console.error('No venues found.');
    return;
  }

  // Add favorites
  for (const profile of profiles) {
    for (const venue of venues.slice(0, 2)) { // Each user favorites 2 venues
      try {
        const { error } = await supabase
          .from('favorites')
          .upsert({
            user_id: profile.id,
            venue_id: venue.id,
          });

        if (error) {
          console.error(`Error adding favorite:`, error.message);
        } else {
          console.log(`${profile.display_name} favorited ${venue.name}`);
        }
      } catch (error) {
        console.error(`Failed to add favorite:`, error);
      }
    }
  }
}

async function main() {
  console.log('🚀 Setting up TotSpot demo data...\n');

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables. Please add:');
    console.error('- EXPO_PUBLIC_SUPABASE_URL');
    console.error('- SUPABASE_SERVICE_ROLE_KEY');
    console.error('\nGet the service role key from: Supabase Dashboard > Settings > API > Service Role Key');
    return;
  }

  try {
    // Test database connection
    const { error: testError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('Database connection test failed:', testError);
      console.error('Make sure you have run the database migrations.');
      return;
    }
    
    console.log('Database connection successful!\n');
    // 1. Create demo users
    await createDemoUsers();
    
    // 2. Wait a bit for users to be fully created
    console.log('\nWaiting for user creation to complete...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 3. Add demo reviews
    await addDemoReviews();
    
    // 4. Add demo favorites
    await addDemoFavorites();
    
    console.log('\n✅ Demo data setup complete!');
    console.log('\nYou can now log in with:');
    console.log('Email: sarah@demo.com / Password: DemoPass123!');
    console.log('Email: james@demo.com / Password: DemoPass123!');
    console.log('Email: emma@demo.com  / Password: DemoPass123!');
    console.log('Email: test@demo.com  / Password: DemoPass123!');
  } catch (error) {
    console.error('Setup failed:', error);
  }
}

main();