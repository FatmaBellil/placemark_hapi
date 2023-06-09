import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";
import { adminDashboardController } from "./controllers/admin-dashboard-controller.js";
import { userController } from "./controllers/user-controller.js";
import { categoryController } from "./controllers/category-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  
  { method: "GET", path: "/admindashboard", config: adminDashboardController.index },
  { method: "POST", path: "/admindashboard/adduser", config: adminDashboardController.addUser },
  { method: "GET", path: "/admindashboard/deleteuser/{id}", config: adminDashboardController.deleteUser },

  { method: "GET", path: "/user/{id}", config: userController.index },
  { method: "POST", path: "/updateuser/{id}", config: userController.updateUser },
  
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcategory", config: dashboardController.addCategory },
  { method: "GET", path: "/dashboard/deletecategory/{id}", config: dashboardController.deleteCategory },


  { method: "GET", path: "/placemark/{id}", config: placemarkController.index },
  { method: "POST", path: "/updateplacemark/{id}", config: placemarkController.updatePlacemark },
  
  // imgage
  { method: "POST", path: "/placemark/{id}/uploadimage", config: placemarkController.uploadImage },
  { method: "GET", path: "/placemark/{id}/deleteimage/{img}", config: placemarkController.deleteImage },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
  

  {method: "GET", path: "/category/{id}", config: categoryController.index},
  {method: "GET", path: "/category/{id}/deleteplacemark/{placemarkid}", config: categoryController.deletePlacemark},
  {method: "POST", path: "/category/{id}/addplacemark", config: categoryController.addPlacemark},

  

  



];
