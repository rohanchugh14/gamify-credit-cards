from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime
from faker import Faker
import random

uri = "mongodb+srv://rohanchugh14:S4V3w6z293DdVPCD@cluster0.mpp7tzo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
fake = Faker()
client = MongoClient(uri, server_api=ServerApi('1'))

# Define the database
db = client['gamifyCreditCards']  # You can name your database as you like

users_collection = db['users']
cards_collection = db['cards']
transactions_collection = db['transactions']

def weighted_credit_score():
    """Generate a credit score, more likely to be in the 600-750 range."""
    ranges = [(300, 599), (600, 750), (751, 850)]
    weights = [0.15, 0.7, 0.15]
    selected_range = random.choices(ranges, weights)[0]
    return random.randint(*selected_range)

# A list of company objects with a category and description
companies_with_categories = [
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
    # Note: Ensure each category is represented multiple times as required
]


# Fill in the rest of your company list to reach 50, ensuring a good mix of categories
# This is just a sample; you'd want to expand this list to include 50 entries as needed

# Generate and insert data
for _ in range(100):
    user = {
        "firstName": fake.first_name(),
        "lastName": fake.last_name(),
        "emailAddress": fake.email(),
        "phoneNumber": fake.phone_number(),
        "creditScore": weighted_credit_score(),
        "exp": random.randint(0, 10000),
        "gold": random.randint(0, 10000)
    }
    user_result = users_collection.insert_one(user)
    user_id = user_result.inserted_id

    for _ in range(random.randint(1, 3)):
        card = {
            "userId": user_id,
            "name": f"{fake.word().capitalize()} Card",
            "creditLimit": random.randint(1000, 10000),
            "annualFee": random.choice([0, 50, 95, 250]),
            "currentBalance": random.randint(0, 5000)
        }
        card_result = cards_collection.insert_one(card)
        card_id = card_result.inserted_id

        for _ in range(random.randint(5, 10)):
            company = random.choice(companies_with_categories)
            transaction = {
                "userId": user_id,
                "cardId": card_id,
                "category": company['category'],
                "date": fake.date_time_this_year(),
                "description": company['description'],
                "amount": round(random.uniform(5.0, 500.0), 2)
            }
            transactions_collection.insert_one(transaction)

print("Fake data generation complete.")

# Close the MongoDB connection
client.close()