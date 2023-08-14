/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        storageUrl: process.env.STORAGE_URL,
        secretK: process.env.STRIPE_SECRET_KEY
    },
    images: {
        domains: ['firebasestorage.googleapis.com']
    }
}

module.exports = nextConfig
