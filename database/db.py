import os
from pymongo import MongoClient

# Configure MongoDB connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client['product_sentiment_db']
products_collection = db['products']
reviews_collection = db['reviews']

def save_product(product_data):
    """Saves or updates product details."""
    products_collection.update_one(
        {"product_id": product_data["product_id"]},
        {"$set": product_data},
        upsert=True
    )

def save_reviews(reviews_data):
    """Saves a list of reviews."""
    if not reviews_data:
        return
    # Optional: avoid duplicates by checking review IDs if available
    reviews_collection.insert_many(reviews_data)

def get_product(product_id):
    """Retrieves product details by ID."""
    return products_collection.find_one({"product_id": product_id}, {"_id": 0})

def get_product_reviews(product_id):
    """Retrieves all reviews for a given product."""
    return list(reviews_collection.find({"product_id": product_id}, {"_id": 0}))

def get_all_products():
    """Retrieves all products for the dashboard."""
    return list(products_collection.find({}, {"_id": 0}))
