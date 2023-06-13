import Redis from 'ioredis';

export const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_DOMAIN);

export const setRedisData = async (key, value) => {
  const data = await redis.set(key, value);
  return data;
};

export const getRedisData = async key => {
  const data = await redis.get(key);
  return data;
};
