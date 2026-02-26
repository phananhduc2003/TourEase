from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from recommender import get_similar_tours, get_recommend_for_user
from database import get_tours_booked_by_user

app = FastAPI(title="TourEase ML Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/recommend/similar/{tour_id}")
def similar_tours(tour_id: int, top_n: int = 4):
    """
    Public - Không cần JWT
    Trả về danh sách tourID tương tự với tour_id
    """
    result = get_similar_tours(tour_id, top_n)
    if not result:
        raise HTTPException(status_code=404, detail="Không tìm thấy tour tương tự")
    return {"tourId": tour_id, "similarTourIds": result}


@app.get("/recommend/user/{user_id}")
def recommend_for_user(user_id: int, top_n: int = 4):
    """
    Gợi ý dựa trên lịch sử booking của user
    """
    booked_ids = get_tours_booked_by_user(user_id)
    if not booked_ids:
        return {"userId": user_id, "recommendedTourIds": [], "message": "Chưa có lịch sử đặt tour"}

    result = get_recommend_for_user(user_id, booked_ids, top_n)
    return {"userId": user_id, "recommendedTourIds": result}


@app.get("/health")
def health():
    return {"status": "OK", "service": "TourEase ML Service"}