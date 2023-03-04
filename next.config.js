const isDev = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: [] },
  compiler: {
    removeConsole: !isDev
  },
  swcMinify: true,
  compress: true,
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en'
  }
}

module.exports = nextConfig
