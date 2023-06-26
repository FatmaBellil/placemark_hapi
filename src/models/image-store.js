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

  // Extract public ID from Cloudinary URL
  getPublicIdFromUrl:  (imageUrl) => {
    try {
      const { publicId } = cloudinary.v2.url(imageUrl, { secure: true });
      return publicId;
    } catch (error) {
      console.error("Error extracting public ID:", error);
      throw error;
    }
  },

  uploadImage: async function(imagefile) {
    writeFileSync("./public/temp.img", imagefile);
    const response = await cloudinary.v2.uploader.upload("./public/temp.img");
    return response.url;
  },

  deleteImage: async function(img) {
    // const publicId = this.getPublicIdFromUrl(img);
    await cloudinary.v2.uploader.destroy(img, (error, result) => {
      console.log(error);
    })
  }

  
};


