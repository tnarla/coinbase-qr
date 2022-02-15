const withTM = require("next-transpile-modules")(["react-dvd-screensaver"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
