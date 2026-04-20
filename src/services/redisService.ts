import Redis  from "ioredis";
import dotenv from "dotenv"

dotenv.config();

const redis = new Redis(process.env.REDIS_URL as string)

redis.on("connect" , ()=>console.log("✅ Redis connected"));
redis.on("error" , (err)=>console.error("❌ Redis error:", err));


export async function getCache<T>(key:string):Promise<T | null> {
      const data = await redis.get(key);
  if (!data) return null;
  return JSON.parse(data) as T;
}

export async function setCache(key:string , value:unknown ,ttlSeconds:number): Promise<void> {
    await redis.set(key,JSON.stringify(value) , "EX" , ttlSeconds);
}

export async function deleteCache(key:string): Promise<void>{
    await redis.del(key)
}

export default redis