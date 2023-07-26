/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        storageUrl: process.env.STORAGE_URL
    }
}

module.exports = nextConfig
