from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add parent directory to sys.path to import modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from database.db import save_product, save_reviews, get_product, get_product_reviews, get_all_products
from nlp.sentiment import process_reviews
from scraper.scraper import scrape_product_reviews

app = Flask(__name__)
CORS(app)

@app.route('/api/search', methods=['POST'])
def search_product():
    data = request.json
    url = data.get('url')
    
    if not url:
        return jsonify({"error": "URL is required"}), 400
        
    try:
        # 1. Scrape data
        product_data, reviews = scrape_product_reviews(url)
        
        # 2. Process Sentiment
        processed_reviews = process_reviews(reviews)
        
        # 3. Save to Database
        save_product(product_data)
        save_reviews(processed_reviews)
        
        return jsonify({
            "message": "Scraping and analysis complete",
            "product": product_data,
            "reviews_count": len(processed_reviews)
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products', methods=['GET'])
def list_products():
    products = get_all_products()
    return jsonify(products), 200

@app.route('/api/products/<product_id>/reviews', methods=['GET'])
def get_reviews(product_id):
    product = get_product(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
        
    reviews = get_product_reviews(product_id)
    return jsonify({
        "product": product,
        "reviews": reviews
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000, use_reloader=False)
