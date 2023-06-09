import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

// User

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
  role: Joi.string().example("basic"),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

// images of placemarks

export const ImageSpec = Joi.object().keys({
  url: Joi.string().example("https://res.cloudinary.com/dtkcoay15/image/upload/v1688036219/aalsgddml10jarbvq7ns.jpg").required(),
}).label("Image");

export const UploadImageSpec = Joi.object().keys({
  image: Joi.any().required()
}).label("ImageToUpload");


// placemark
export const PlacemarkSpec = Joi.object()
    .keys({
        name: Joi.string().example("regensburg").required(),
        description: Joi.string().example("regensburg is a german city").required(),
        latitude :Joi.number().allow("").example("49.0139").required(),
        longitude: Joi.number().allow("").example("12.1016").required(),
        img: Joi.string().example("http://res.cloudinary.com/dtkcoay15/image/upload/v1687773695/qbnldqldkws5p3dgtiyb.jpg"),
        categoryid: IdSpec,
    })
    .label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys( {
    _id: IdSpec,
    __v: Joi.number()
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");


// Category
export const CategorySpec = Joi.object()
  .keys({
    name: Joi.string().example("landscape").required(),
    userid: IdSpec,
    placemarks: PlacemarkArraySpec
}).label("Category");

export const CategorySpecPlus = CategorySpec.keys( {
  _id: IdSpec,
  __v: Joi.number()
})

export const CategoryArraySpec = Joi.array().items(CategorySpecPlus).label("CategoryArray");


// JwtAuth
export const JwtAuth = Joi.object()
.keys({
  success: Joi.boolean().example("true").required(),
  token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
})
.label("JwtAuth");




  