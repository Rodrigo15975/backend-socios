type Config = {
  Stripe: {
    secret_key: string;
    webhook_secret: string;
  };
};
export const config = (): Config => ({
  Stripe: {
    secret_key: process.env.SECRET_KEY,
    webhook_secret: process.env.WEBHOOK_SECRET,
  },
});
