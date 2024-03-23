require('dotenv').config();
const express = require('express');
const { faker } = require('@faker-js/faker');
const { MongoClient, ObjectId } = require('mongodb');
const { initAuth } = require('@propelauth/express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

const {
  requireUser,
  fetchUserMetadataByUserId,
  // ...
} = initAuth({
  authUrl: "https://372270922.propelauthtest.com",
  apiKey: "916856fd6672049d51eb058d122a63d64ffad86962d15e55a311ce421d3af05919b3761f69d76c5251c4578991edcf20", 
});


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = client.db('gamifyCreditCards');
const usersCollection = db.collection('users');
const cardsCollection = db.collection('cards');
const transactionsCollection = db.collection('transactions');

const companiesWithCategories = [
  {"category": "Groceries", "description": "Quantex Markets"},
  {"category": "Dining Out", "description": "Solaris Diner"},
  {"category": "Utilities", "description": "NebulaWeb Power"},
  {"category": "Entertainment", "description": "OrionTech Games"},
  {"category": "Travel", "description": "PulsePoint Travel"},
  {"category": "Health Care", "description": "NovaSphere Clinic"},
  {"category": "Shopping", "description": "ZephyrTech Mall"},
  {"category": "Education", "description": "EchoSystems University"},
  {"category": "Transportation", "description": "CrestWave Transit"},
  {"category": "Home Improvement", "description": "VortexMedia Home"},
  {"category": "Gifts & Donations", "description": "Starfield Gifts"},
  {"category": "Groceries", "description": "GreenGroves"},
  {"category": "Dining Out", "description": "BellaTable"},
  {"category": "Utilities", "description": "AquaFlow Water"},
  {"category": "Entertainment", "description": "CineMax Studios"},
  {"category": "Travel", "description": "SkyHigh Airlines"},
  {"category": "Health Care", "description": "MediCare Plus"},
  {"category": "Shopping", "description": "FashionFront"},
  {"category": "Education", "description": "BookBrains Library"},
  {"category": "Transportation", "description": "FastTrack Taxis"},
  {"category": "Home Improvement", "description": "FixIt Tools"},
  {"category": "Gifts & Donations", "description": "GenerousHearts"},
  {"category": "Groceries", "description": "Organix Market"},
  {"category": "Dining Out", "description": "Café Culture"},
  {"category": "Utilities", "description": "BrightSpark Energy"},
  {"category": "Entertainment", "description": "PlaySphere"},
  {"category": "Travel", "description": "GlobeTrotter Hotels"},
  {"category": "Health Care", "description": "Wellness Waves"},
  {"category": "Shopping", "description": "GadgetGear"},
  {"category": "Education", "description": "Knowledge Nook"},
  {"category": "Transportation", "description": "MetroMove"},
  {"category": "Home Improvement", "description": "HomeCrafters"},
  {"category": "Gifts & Donations", "description": "KindSpirits"},
  {"category": "Groceries", "description": "FreshFinds"},
  {"category": "Dining Out", "description": "SpiceSavvy"},
  {"category": "Utilities", "description": "EcoWatts"},
  {"category": "Entertainment", "description": "JoyJump Arcade"},
  {"category": "Travel", "description": "TrailBlazers Tours"},
  {"category": "Health Care", "description": "HealHub"},
  {"category": "Shopping", "description": "StyleStreet"},
  {"category": "Education", "description": "ScholarStation"},
  {"category": "Transportation", "description": "QuickCommute"},
  {"category": "Home Improvement", "description": "DecorDreams"},
  {"category": "Gifts & Donations", "description": "HopeHarbor"},
  {"category": "Groceries", "description": "PantryProvisions"},
  {"category": "Dining Out", "description": "TasteTwist"},
  {"category": "Utilities", "description": "Streamline Services"},
  {"category": "Entertainment", "description": "Virtual Ventures"},
  {"category": "Travel", "description": "Escape Expeditions"},
  {"category": "Health Care", "description": "PrimeCare Providers"},
  {"category": "Shopping", "description": "Allure Apparel"}
]

async function generateNewCardWithTransactions(userId) {
  const annualFees = [0, 50, 95, 250]
  const card = {
      userId: userId,
      name: `${faker.commerce.productName()} Card`,
      creditLimit: parseFloat(String(generateRandomNumber(5000, 10000)) + "." + String(generateRandomNumber(0, 99))),
      annualFee: annualFees[generateRandomNumber(0, annualFees.length - 1)],
      currentBalance: parseFloat(String(generateRandomNumber(0, 5000)) + "." + String(generateRandomNumber(0, 99))),
      statementBalance: generateRandomNumber(0, 5000),
      minPayment: generateRandomNumber(25, 100),
  };
  const cardResult = await cardsCollection.insertOne(card);
  const cardId = cardResult.insertedId;
  await generateTransactions(userId, cardId);
  console.log(`Generated new card and transactions for user ${userId}`);
}

async function generateTransactions(userId, cardId) {

  const transactions = [];
  for (let i = 0; i < generateRandomNumber(5, 10); i++) {
      const company = companiesWithCategories[generateRandomNumber(0, companiesWithCategories.length - 1)];
      const transaction = {
          userId: userId,
          cardId: cardId,
          category: company.category,
          date: faker.date.recent(),
          description: company.description,
          amount: parseFloat(generateRandomNumber(1, 1000) + '.' + generateRandomNumber(0, 99)),
      };
      transactions.push(transaction);
  }
  await transactionsCollection.insertMany(transactions);
  console.log(`Generated new transactions for user ${userId}`);
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    // Here you can implement your CRUD operations and other logic

    app.post('/generateCard/:userId', requireUser, async (req, res) => {
      const userId = req.user.userId;
      try {
          await generateNewCardWithTransactions(userId);
          res.send('New card and transactions generated successfully.');
      } catch (err) {
          console.error(err);
          res.status(500).send('Failed to generate card and transactions.');
      }
    });

    app.get('/profile', requireUser, async (req, res) => {
    try {
      const userId = req.user.userId;
      console.log(userId)
      let user = await usersCollection.findOne({ _id: userId });
      if (!user) {
        // if user isn't found, create a new user object with the userId
        const newUser = { _id: userId, email: req.user.email, exp: 0, gold: 0, level: 1, creditScore: generateRandomNumber(500, 650) };
        await usersCollection.insertOne(newUser);
        // generate a new card and transactions for the new user
        await generateNewCardWithTransactions(userId);
        user = newUser;
      }
      // get user's cards and embed all transactions for each card
      const cards = await cardsCollection.find({ userId: userId }).toArray();
      for (const card of cards) {
        card.transactions = await transactionsCollection.find({ cardId: card._id }).toArray();
      }
      user.cards = cards;
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Failed to get user data.');
    }
    });

    app.get('/transactions', requireUser, async (req, res) => {
      try {
        const userId = req.user.userId;
        const transactions = await transactionsCollection.find({ userId: userId }).toArray();
        res.json(transactions);
      } catch (err) {
        console.error(err);
        res.status(500).send('Failed to get transactions.');
      }
    });

    app.get('/cards', requireUser, async (req, res) => {
      try {
        const userId = req.user.userId;
        const cards = await cardsCollection.find({ userId: userId }).toArray();
        res.json(cards);
      } catch (err) {
        console.error(err);
        res.status(500).send('Failed to get cards.');
      }
    });

    // make a payment on a card
    app.post('/makePayment/:cardId', requireUser, async (req, res) => {
      try {
        const cardId = new ObjectId(req.params.cardId);
        const paymentAmount = parseFloat(req.body.amount);
        console.log("payment amt", paymentAmount)
        const card = await cardsCollection.findOne({ _id: cardId });
        if (!card) {
          res.status(404).send('Card not found.');
          return;
        }
        const newBalance = card.currentBalance - paymentAmount;
        await cardsCollection.updateOne({ _id: cardId }, { $set: { currentBalance: newBalance } });
        // calculate new xp and level based on payment amount

        // get user's current xp and level
        const user = await usersCollection.findOne({ _id: req.user.userId });
        let exp = user.exp + Math.floor(paymentAmount / 10);
        console.log("exp", exp)
        let level = user.level;
        let gold = Math.floor(user.gold + paymentAmount / 2);
        console.log(gold)
        while(exp >= Math.ceil(level ** 2 / 5)) {
          console.log("in here now", exp, level, Math.ceil(level ** 2 / 5))
          exp -= Math.ceil(level ** 2 / 5);
          level++;
        }
        console.log("level", level, "exp", exp, "gold", gold)

        await usersCollection.updateOne({ _id: req.user.userId }, { $set: { exp: exp, level: level, gold: gold } });
        
        // return the updated user data and card data
        const updatedUser = await usersCollection.findOne({ _id: req.user.userId });
        const cards = await cardsCollection.find({ userId: req.user.userId }).toArray();
        for (const card of cards) {
          card.transactions = await transactionsCollection.find({ cardId: card._id }).toArray();
        }
        updatedUser.cards = cards;
        console.log(user)
        res.json(updatedUser);
      } catch (err) {
        console.error(err);
        res.status(500).send('Failed to make payment.');
      }
    });
  } catch (e) {
    console.error(e);
  }
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  main().catch(console.error);
});
