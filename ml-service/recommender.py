import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from database import get_all_tours

def build_feature_text(row) -> str:
    """
    Ghép các đặc điểm của tour thành 1 chuỗi để TF-IDF xử lý
    """
    parts = [
        str(row.get("destination", "")),
        str(row.get("duration", "")),
        str(row.get("transportation", "")),
        str(row.get("departureLocation", "")),
        str(row.get("title", "")),
    ]
    return " ".join(parts).lower()

def get_similar_tours(tour_id: int, top_n: int = 4) -> list[int]:
    """
    Content-Based: Tìm các tour tương tự với tour_id
    """
    df = get_all_tours()

    if df.empty or tour_id not in df["tourID"].values:
        return []

    # Tạo feature text
    df["features"] = df.apply(build_feature_text, axis=1)

    # TF-IDF vectorize
    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(df["features"])

    # Tính cosine similarity
    sim_matrix = cosine_similarity(tfidf_matrix)

    # Lấy index của tour cần tìm
    idx = df[df["tourID"] == tour_id].index[0]
    df_idx = df.index.get_loc(idx)

    # Lấy điểm similarity, sort giảm dần
    sim_scores = list(enumerate(sim_matrix[df_idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Bỏ chính nó (index 0), lấy top_n
    sim_scores = sim_scores[1:top_n + 1]

    result_ids = [df.iloc[i[0]]["tourID"] for i in sim_scores]
    return [int(x) for x in result_ids]


def get_recommend_for_user(user_id: int, booked_tour_ids: list[int], top_n: int = 4) -> list[int]:
    """
    Hybrid đơn giản: Tổng hợp tour tương tự dựa trên lịch sử booking của user
    """
    if not booked_tour_ids:
        return []

    all_similar = []
    for tid in booked_tour_ids:
        similar = get_similar_tours(tid, top_n=top_n)
        all_similar.extend(similar)

    # Loại bỏ tour đã đặt rồi và trùng lặp
    seen = set(booked_tour_ids)
    result = []
    for tid in all_similar:
        if tid not in seen:
            seen.add(tid)
            result.append(tid)
        if len(result) >= top_n:
            break

    return result