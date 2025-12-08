const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Incident = require('../models/Incident');

// Sample incidents data
const sampleIncidents = [
  {
    name: 'Equifax Data Breach',
    year: '2017',
    description: 'One of the largest data breaches in history, compromising personal information of 147 million people. The breach occurred due to an unpatched vulnerability in Apache Struts web application framework.',
    timeline: [
      { date: 'May 13, 2017', event: 'Initial Breach', details: 'Attackers exploited Apache Struts vulnerability CVE-2017-5638' },
      { date: 'July 29, 2017', event: 'Discovery', details: 'Equifax discovered suspicious network traffic and began investigation' },
      { date: 'September 7, 2017', event: 'Public Disclosure', details: 'Equifax publicly announced the breach affecting 147 million consumers' }
    ],
    impact: 'Exposed names, Social Security numbers, birth dates, addresses, and driver license numbers. Cost Equifax over $1.4 billion in cleanup and settlements.'
  },
  {
    name: 'WannaCry Ransomware Attack',
    year: '2017',
    description: 'Global ransomware cyberattack targeting computers running Microsoft Windows. Used EternalBlue exploit developed by NSA and leaked by Shadow Brokers hacker group.',
    timeline: [
      { date: 'May 12, 2017', event: 'Initial Outbreak', details: 'Ransomware began spreading rapidly across the globe' },
      { date: 'May 13, 2017', event: 'Peak Infection', details: 'Over 200,000 computers infected across 150 countries' },
      { date: 'May 15, 2017', event: 'Kill Switch Activated', details: 'Security researcher Marcus Hutchins activated kill switch domain' }
    ],
    impact: 'Affected over 200,000 computers worldwide. Caused estimated $4 billion in damages. NHS hospitals in UK were severely disrupted.'
  },
  {
    name: 'Yahoo Data Breach',
    year: '2013',
    description: 'Massive data breach affecting all 3 billion Yahoo user accounts. Considered the largest data breach in internet history in terms of number of accounts compromised.',
    timeline: [
      { date: 'August 2013', event: 'Initial Breach', details: 'State-sponsored actors gained access to Yahoo systems' },
      { date: 'September 2016', event: 'First Disclosure', details: 'Yahoo disclosed breach affecting 500 million accounts' },
      { date: 'October 2017', event: 'Full Scope Revealed', details: 'Yahoo confirmed all 3 billion accounts were affected' }
    ],
    impact: 'All 3 billion Yahoo accounts compromised. Exposed names, email addresses, telephone numbers, encrypted passwords, and security questions. Led to $350 million reduction in Verizon acquisition price.'
  },
  {
    name: 'Target Corporation Data Breach',
    year: '2013',
    description: 'Cybercriminals stole credit and debit card information from approximately 40 million Target customers during the holiday shopping season.',
    timeline: [
      { date: 'November 27, 2013', event: 'Breach Begins', details: 'Attackers installed malware on Target point-of-sale systems' },
      { date: 'December 15, 2013', event: 'Discovery', details: 'Target was alerted to the breach by Department of Justice' },
      { date: 'December 19, 2013', event: 'Public Announcement', details: 'Target publicly disclosed the breach' }
    ],
    impact: 'Compromised 40 million credit/debit card accounts and 70 million customer records. Cost Target over $292 million in total expenses.'
  },
  {
    name: 'SolarWinds Supply Chain Attack',
    year: '2020',
    description: 'Sophisticated supply chain attack where hackers inserted malicious code into SolarWinds Orion software updates, affecting thousands of organizations.',
    timeline: [
      { date: 'March 2020', event: 'Initial Compromise', details: 'Attackers gained access to SolarWinds build system' },
      { date: 'March-June 2020', event: 'Trojanized Updates', details: 'Malicious updates distributed to approximately 18,000 customers' },
      { date: 'December 13, 2020', event: 'Public Disclosure', details: 'FireEye and Microsoft disclosed the attack' }
    ],
    impact: 'Affected multiple US government agencies and Fortune 500 companies. Considered one of the most sophisticated cyberattacks ever discovered.'
  },
  {
    name: 'Colonial Pipeline Ransomware Attack',
    year: '2021',
    description: 'Ransomware attack on Colonial Pipeline, the largest fuel pipeline in the United States, causing major fuel shortages on the East Coast.',
    timeline: [
      { date: 'May 7, 2021', event: 'Initial Attack', details: 'DarkSide ransomware group encrypted Colonial Pipeline systems' },
      { date: 'May 7, 2021', event: 'Pipeline Shutdown', details: 'Colonial Pipeline voluntarily shut down operations' },
      { date: 'May 12, 2021', event: 'Operations Resume', details: 'Pipeline operations gradually restarted after ransom payment' }
    ],
    impact: 'Caused fuel shortages across the East Coast. Colonial paid $4.4 million ransom (later partially recovered). Led to increased focus on critical infrastructure security.'
  },
  {
    name: 'Facebook Cambridge Analytica Scandal',
    year: '2018',
    description: 'Political consulting firm Cambridge Analytica harvested personal data of millions of Facebook users without consent for political advertising.',
    timeline: [
      { date: '2013-2015', event: 'Data Collection', details: 'Cambridge Analytica collected data through personality quiz app' },
      { date: 'March 17, 2018', event: 'Public Exposure', details: 'Whistleblower Christopher Wylie revealed the data harvesting' },
      { date: 'April 2018', event: 'Congressional Hearing', details: 'Mark Zuckerberg testified before US Congress' }
    ],
    impact: 'Affected 87 million Facebook users. Resulted in $5 billion FTC fine for Facebook. Led to increased scrutiny of data privacy practices.'
  },
  {
    name: 'Marriott International Data Breach',
    year: '2018',
    description: 'Massive breach of Marriott Starwood guest reservation database, one of the largest hospitality industry breaches.',
    timeline: [
      { date: '2014', event: 'Initial Breach', details: 'Hackers gained access to Starwood systems before Marriott acquisition' },
      { date: 'September 2018', event: 'Discovery', details: 'Marriott security team detected suspicious activity' },
      { date: 'November 30, 2018', event: 'Public Disclosure', details: 'Marriott announced the breach affecting 500 million guests' }
    ],
    impact: 'Exposed data of 500 million guests including passport numbers, payment card information, and personal details. Resulted in $124 million in fines and settlements.'
  },
  {
    name: 'NotPetya Cyberattack',
    year: '2017',
    description: 'Devastating cyberattack disguised as ransomware but actually designed to cause maximum destruction. Initially targeted Ukraine but spread globally.',
    timeline: [
      { date: 'June 27, 2017', event: 'Initial Attack', details: 'NotPetya malware deployed through compromised Ukrainian tax software' },
      { date: 'June 27-28, 2017', event: 'Global Spread', details: 'Malware spread rapidly to multinational corporations' },
      { date: 'July 2017', event: 'Attribution', details: 'Security experts attributed attack to Russian military' }
    ],
    impact: 'Caused over $10 billion in total damages worldwide. Affected major corporations including Maersk, FedEx, and Merck. Considered most costly cyberattack in history.'
  },
  {
    name: 'Uber Data Breach Cover-up',
    year: '2016',
    description: 'Uber suffered a major data breach affecting 57 million users and drivers, then paid hackers $100,000 to delete the data and keep quiet.',
    timeline: [
      { date: 'October 2016', event: 'Initial Breach', details: 'Hackers accessed Uber cloud storage on AWS containing user data' },
      { date: 'November 2016', event: 'Ransom Payment', details: 'Uber paid hackers $100,000 to delete stolen data' },
      { date: 'November 2017', event: 'Public Disclosure', details: 'New CEO revealed the breach and cover-up one year later' }
    ],
    impact: 'Exposed data of 57 million users and drivers including names, email addresses, and phone numbers. Led to $148 million settlement and criminal charges against former security chief.'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing data (optional - comment out if you want to keep existing data)
    await Incident.deleteMany({});
    console.log('🗑️  Cleared existing incidents');

    // Create or find a test user
    let testUser = await User.findOne({ email: 'demo@cyberaware.com' });
    
    if (!testUser) {
      const hashedPassword = await bcrypt.hash('Demo123!', 10);
      testUser = await User.create({
        name: 'Demo User',
        email: 'demo@cyberaware.com',
        password: hashedPassword,
        role: 'user'
      });
      console.log('👤 Created demo user: demo@cyberaware.com / Demo123!');
    } else {
      console.log('👤 Using existing demo user');
    }

    // Add createdBy field to each incident
    const incidentsWithUser = sampleIncidents.map(incident => ({
      ...incident,
      createdBy: testUser._id
    }));

    // Insert incidents
    const createdIncidents = await Incident.insertMany(incidentsWithUser);
    console.log(`✨ Created ${createdIncidents.length} incidents`);

    // Display summary
    console.log('\n📊 Database Seeding Summary:');
    console.log(`   - Total Incidents: ${createdIncidents.length}`);
    console.log(`   - From Years: 2013-2021`);
    console.log(`   - Major Breaches: Equifax, Yahoo, Target, SolarWinds, Colonial Pipeline`);
    console.log(`   - Average Timeline Events: ${Math.round(createdIncidents.reduce((sum, i) => sum + i.timeline.length, 0) / createdIncidents.length)}`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n🔑 Demo Account Credentials:');
    console.log('   Email: demo@cyberaware.com');
    console.log('   Password: Demo123!');
    console.log('\n💡 You can now login and view all incidents at http://localhost:3000');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
