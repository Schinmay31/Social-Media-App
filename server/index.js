import  express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import  path  from "path";
import { fileURLToPath } from "url";
import {register} from "./controllers/auth.js";
import authRoutes from "./routes/Auth.js";

// Configrations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy :"cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb" , extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname, 'public/assets')));

// file storage 
const storage = multer.diskStorage({
     destination : function(req,file,cb){
        cb(null,"public/assets");
     },
     filename: function(req,file,cb){
        cb(null,file.originalname);
     }
});
const upload = multer({storage});

//    register route 
app.post("/auth/register",upload.single("picture"),register);

mongoose.connect("mongodb://127.0.0.1:27017/social-media-app", { useNewUrlParser: true })
.then(()=>{
    console.log("Database is Connected ")
   });


//    Routes 
app.use("/auth",authRoutes);








app.listen(3001,function(){
    console.log("server is running on port 3001");
});