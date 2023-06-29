import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
};
cloudinary.config(credentials);

export const imageStore = {

  getAllImages: async function() {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },


  uploadImage: async function(imagefile) {
    writeFileSync("./public/temp.img", imagefile);
    const response = await cloudinary.v2.uploader.upload("./public/temp.img");
    return response.url;
  },

  deleteImage: async function(img) {
    const publicId = this.getPublicIdFromUrl(img);
    await cloudinary.v2.uploader.destroy(publicId, (error, result) => {
      console.log(error);
    });
  },
  
  getPublicIdFromUrl: function(imgUrl) {
    const publicId = imgUrl.split("/v")[1].split("/")[1];
    return publicId;
  }
  

  
};


