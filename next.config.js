/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        storageUrl: process.env.STORAGE_URL
    },
    images: {
        domains: ['firebasestorage.googleapis.com']
    }
}

module.exports = nextConfig
