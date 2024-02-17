import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import passport from "./config/passportConfig.js";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/Auth.js";
import userRoutes from "./routes/users.js";
import { verifyUser } from "./middleware/auth.js";
import  {createPost} from './controllers/posts.js';
import postsRoute from './routes/posts.js';


// Configrations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json({limit: '10mb'}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
app.use(cors({
   origin: 'http://localhost:3000',  // Update with your frontend URL
   credentials: true,
 }));
// file storage 
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "public/assets");
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   }
});
const upload = multer({ storage });

// passport.js setup
app.use(session({              // set up session
   secret: "thisisasessionkey",
   resave: false,
   saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());




const uri = "mongodb+srv://chinmay31:yS9a5odiFq3zI0aK@cluster0.n1orfgf.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true })
   .then(() => {
      console.log("Database is Connected ")
   });


   //    routes with files 
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts",verifyUser,upload.single("picture"),createPost);
   
//    Routes 
app.use("/auth", authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postsRoute);







app.listen(3001, function () {
   console.log("server is running on port 3001");
});   