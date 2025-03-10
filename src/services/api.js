import axios from "axios";

const ACCESS_KEY = "v2vQTrXbyDzcqvEXTKuO8vc6HDjsQov7FkTdJF-pWrE";

export const fetchImages = async (query, page) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query,
        page,
        per_page: 12,
        client_id: ACCESS_KEY,
      },
    });
    return {
      images: response.data.results,
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    throw new Error("Failed to fetch images");
  }
};
