import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import Cookie from "@hapi/cookie";
import path from "path";
import Joi from "joi";
import jwt from "hapi-auth-jwt2";
import Inert from "@hapi/inert";
import HapiSwagger from "hapi-swagger";
import dotenv from "dotenv";
import cors from "hapi-cors"; // Add the hapi-cors plugin
import express from "express"


import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";
import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { validate } from "./api/jwt-utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}
const swaggerOptions = {
  info: {
    title: "Placemark API",
    version: "0.1",
  },
  // authorize button in Swagger hub
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      in: "header"
    }
  },
  security: [{ jwt: [] }]
  
};


async function init() {
  
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    routes: {
      cors: {
         origin: ["https://placemark10.netlify.app"], 
        // origin: ["http://localhost:5174"], 
        credentials: true,
      },
    },
    
  });
  

  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
    {
      plugin: cors,
      options: {
        methods: ["GET", "POST", "PUT", "DELETE"], 
      },
    },
  ]);

  await server.register(jwt);

  server.validator(Joi);



  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.default("session");
 
  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] }
  });


  db.init("mongo");

  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();


