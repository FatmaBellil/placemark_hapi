import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/category-api.js";
import { placemarkApi } from "./api/placemark-api.js";


export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET", path: "/api/categories", config: categoryApi.find },
  { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },
  { method: "POST", path: "/api/categories", config: categoryApi.create },
  { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },
  { method: "DELETE", path: "/api/categories/{id}", config: categoryApi.deleteOne },

  { method: "GET", path: "/api/categories/{id}/placemarks", config: placemarkApi.find },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
  { method: "POST", path: "/api/categories/{id}/placemarks", config: placemarkApi.create },
  { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placemarkApi.deleteOne },

  { method: "POST", path: "/api/placemarks/{id}/uploadimage", config: placemarkApi.uploadImage },
  { method: "DELETE", path: "/api/placemarks/{id}/deleteimage/{img}", config: placemarkApi.deleteImage },

    
]