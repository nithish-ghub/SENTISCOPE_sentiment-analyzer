import time
import random
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def scrape_product_reviews(url):
    """
    Simulates scraping product details and reviews from an e-commerce URL.
    Returns a dictionary with product details and a list of review dictionaries.
    """
    # In a real scenario, you'd use Selenium to load the page and BeautifulSoup to parse:
    # options = Options()
    # options.add_argument("--headless")
    # driver = webdriver.Chrome(options=options)
    # driver.get(url)
    # soup = BeautifulSoup(driver.page_source, 'html.parser')
    # ... parsing logic ...
    
    time.sleep(2) # Simulate network delay
    
    # Mock Product Data
    product_id = "PROD" + str(random.randint(1000, 9999))
    product_data = {
        "product_id": product_id,
        "name": "Sample Mock Product from URL",
        "url": url,
        "description": "This is a mock product generated to demonstrate the pipeline.",
    }
    
    # Mock Review Data
    sample_texts = [
        "Absolutely love this product! It works exactly as described and the quality is amazing.",
        "Terrible experience. It broke after two days of use. Do not buy.",
        "It's okay, not great but not bad either. Gets the job done.",
        "Very satisfied with the purchase. Fast shipping and good customer support.",
        "Waste of money. The picture is deceiving.",
        "Highly recommend this! Exceeded my expectations.",
        "The item is decent, but a bit overpriced for what it is."
    ]
    
    reviews = []
    for i in range(10):
        reviews.append({
            "review_id": f"REV{i}",
            "product_id": product_id,
            "text": random.choice(sample_texts),
            "rating": random.randint(1, 5),
            "date": "2023-10-01"
        })
        
    return product_data, reviews
