import { Router,Request , Response } from "express";
import { menuData , MenuItem } from "../data/menuData";
import { getCache , setCache } from "../services/redisService";

const router = Router();

const MENU_CACHE_KEY = "menu:all";
const MENU_TTL = 300;

router.get("/" ,async (req:Request , res:Response)=>{
    const cached = await getCache<MenuItem[]>(MENU_CACHE_KEY);

    if(cached) {
        console.log("🟢 Cache HIT  — From Redis")
        return res.json({source: "cache" , data:cached})
    }

      console.log("🔴 Cache MISS — From Data");
      const data = menuData;


      await setCache(MENU_CACHE_KEY ,data, MENU_TTL)

      return res.json({source:"data" , data})
})

export default router;