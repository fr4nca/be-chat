import * as Sentry from "@sentry/node";

if (process.env.NODE_ENV !== "development")
  Sentry.init({
    dsn: "https://889e7976708b4603a4e7c05fe53090ad@sentry.cloudez.io/23",
  });
