import express  from "express";
import  dotenv  from 'dotenv';
import menuRoutes from "./routes/menuRoutes"

dotenv.config();

const app = express();
const PORT = process.env.PORT ||  3000;

app.use(express.json());
app.use("/menu" ,menuRoutes);

app.listen(PORT , ()=>{
      console.log(`🚀 Server running on http://localhost:${PORT}`);
})
