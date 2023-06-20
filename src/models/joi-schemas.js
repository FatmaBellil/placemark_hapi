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
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");


// placemark
export const PlacemarkSpec = Joi.object()
    .keys({
        name: Joi.string().example("regensburg").required(),
        description: Joi.string().example("regensburg is a german city").required(),
        latitude :Joi.number().allow("").example("49.0139").optional(),
        longitude: Joi.number().allow("").example("12.1016").optional(),
        categoryid: IdSpec
    })
    .label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys( {
    _id: IdSpec,
    __v: Joi.number()
}).label("PlacemarkPlus")

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlaylistArray");


// Category
export const CategorySpec = Joi.object()
  .keys({
    name: Joi.string().example("landscapes").required(),
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