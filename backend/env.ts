const getEnv = (key: string, defaultValue?: string) => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`missing env variable ${key}`);
  }
  return value;
};

const PORT = getEnv("PORT", "8081");
const APP_ORIGIN = getEnv("APP_ORIGIN");
export { PORT, APP_ORIGIN };
