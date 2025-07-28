/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      // Alias para que Webpack trate estos imports como módulos vacíos
      config.resolve.alias = {
        ...config.resolve.alias,
        "@nestjs/core": false,
        "@nestjs/websockets/socket-module": false,
        "@nestjs/microservices/microservices-module": false,
        "class-transformer/storage": false,
      };
      // También en fallback, por si acaso
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "@nestjs/core": false,
        "@nestjs/websockets/socket-module": false,
        "@nestjs/microservices/microservices-module": false,
        "class-transformer/storage": false,
      };
    }
    return config;
  },
};
