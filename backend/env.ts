const getEnv = (key: string, defaultValue?: string) => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`missing env variable ${key}`);
  }
  return value;
};

const PORT = getEnv("PORT", "8081");
const APP_ORIGIN = getEnv("APP_ORIGIN");
const TEST_ORIGIN = getEnv("TEST_ORIGIN");
const URL = getEnv("URL");
const JWT_SECRET = getEnv("JWT_SECRET");

export { PORT, APP_ORIGIN, TEST_ORIGIN, URL, JWT_SECRET };
