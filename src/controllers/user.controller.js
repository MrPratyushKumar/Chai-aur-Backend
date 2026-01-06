// ----------------------------------------------------
// Import asyncHandler utility
// ----------------------------------------------------
// This wrapper handles errors in async controllers
// and forwards them to the global error handler
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/*
  Register User Controller
  ------------------------
  - Handles user registration requests
  - Wrapped inside asyncHandler to avoid try-catch
  - Endpoint: POST /api/v1/users/register
*/
const registerUser = asyncHandler(async (req, res) => {
  // Building logic for register user
  // step 1:  get user detail from frontend - req gives the user detail(req.body)-> if data comes from the form and json then only we get a user detail from (req)

  const { fullName, email, userName, password } = req.body; // destructure

  // step 2: Validation -> check user ne kahi empty to nahi send kar diya data ex-> email empty
  // .some() -> f'n thet accept upto 3 argument & predicts each element

  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) // field agr hai to aap use trim kar dijiiye agr trim karne ke bad bhi wo empty hai to automatically true return hoga
  {
    //  1 bhi field ne true return kiya to iska matlab wo blank tha
    throw new ApiError(400, "All fields are required");
  }

  // step 3: check if user already exist : can check using username , email
  // User hai  mere pas ->Ab mera Goal hai -> Database se puchhna hai -> mujhe find karke batawo -> aisa 1 User jo (email , userName) se milta ho
  //.findOne({querry pass})-> it's a method -> jo pehla User find hoga wahi return kar dega
  const existedUser = User.findOne({
    // $: doolar sign use karke operator use kar sakte ho ->(and , or , nor , ..etc)
    //$or:[] how to use it -> jitni value check karni hai wo check kar do object ke andar , inside the arraay
    $or: [{ userName }, { email }],
  });

  // Agr existedUser hai to mujhe aage procced hi nahi karna hai
  if (existedUser) {
    throw new ApiError(409, "User with email or userName already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path; // ye abhi server pe hai -> cloudinary pe nahi gya -> i.e LocalPath
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  //
  //Note:
  // Abhi tak hamne dekha hai -> req.body ke andar all data aata hai
  // but aapne middleware bhi add kar diya hai ->to ye bhi kuch access deta hai ->
  //midlleware -> req.body-> ke adar aur field add karta hai
  // multer hame -> req.file ka access de deta hai

  // step 4: check for images , check for avatar
  if (!avatarLocalPath) {
    //  Agr avatarLocalPath  nahi hai to throw Api error
    throw new ApiError(400, "Avatar file is required");
  }
  // step 5: upload them to cloudinary ->  multer ne upload kiya ya nahi cloudinary pe
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  // step 6: check avater has uploaded or not on the cloudinary
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  //Technically  yha tak hmm 1 aise situation pe pahuch gye hai ki -> user ne mujhe data diya ->maine image li ->image ko maine cloudinary pe upload kiya -> cloudinary se image wapas aa gyi hai mere pas me as a URl

  // step 7: ab mujhe 1 user object banana padega , after it -> creation call (create entry in db)

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "", // agr coverImage hai umse se url nikal lo nhi to empty rehne do
    email,
    password,
    userName: userName.toLowerCase(),
  });

  // check karo sahi me user bana hai ya nahi hai
  // aap user ko lo -> aur .findByid()lga do-> is a method used to find using id

  // Agr user successfully create hua hai to kewal wahi sara data create nhi hota ahi mongodb apne aap harek entry ke sath _id name ka field add kar deta hai
  // .select()-> is a method -> hmm wo wo field pass kar sakte hai jo jo aapko selcect krn hai-> inside this we pass string

  // step 8 : remove password and refresh token field from response -> bcz we're giveing response to the frontend
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  ); // Agr User mil gya to User create hua tha or nahi to nahi create hua tha
  // iska fayda hai ki hamne API call karke  id se puchh ke liya hai -> to password  aur refresh Token field hata sakte hai

  // step 9: check karo respose aaya hai ki nahi -> check for user creation -> if NULL response then user is not created -> else created
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user ");
  }

 

  // step 10 : return response

  return res.status(201).json(
    new ApiResponse(200 , createdUser , "User registered Successfully")
  );
});

// ----------------------------------------------------
// Export controller function
// ----------------------------------------------------
export { registerUser };
