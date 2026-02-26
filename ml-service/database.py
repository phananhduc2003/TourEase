from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import pandas as pd
import os

load_dotenv()

DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "123456")
DB_HOST = os.getenv("DB_HOST", "localhost")      
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "tour_ease") 

engine = create_engine(
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

def get_all_tours() -> pd.DataFrame:
    query = """
        SELECT 
            tourid AS tourID,
            title,
            description,
            destination,
            duration,
            price_adult AS priceAdult,
            price_child AS priceChild,
            departure_location AS departureLocation,
            transportation
        FROM tours
        WHERE availability = 1
    """
    with engine.connect() as conn:
        df = pd.read_sql(text(query), conn)
    return df

def get_tours_booked_by_user(user_id: int) -> list[int]:
    query = text("""
        SELECT DISTINCT tour_id 
        FROM bookings 
        WHERE user_id = :user_id
    """)
    with engine.connect() as conn:
        result = conn.execute(query, {"user_id": user_id})
        return [row[0] for row in result.fetchall()]

def get_tours_by_ids(tour_ids: list[int]) -> pd.DataFrame:
    if not tour_ids:
        return pd.DataFrame()
    placeholders = ",".join([str(i) for i in tour_ids])
    query = f"""
        SELECT 
            tourid AS tourID, 
            title, 
            destination, 
            duration, 
            price_adult AS priceAdult, 
            departure_location AS departureLocation, 
            transportation
        FROM tours
        WHERE tourid IN ({placeholders})
    """
    with engine.connect() as conn:
        return pd.read_sql(query, conn)