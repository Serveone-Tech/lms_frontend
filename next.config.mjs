import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // 🔥 ESLint errors ignore
        ignoreDuringBuilds: true,
    },
    typescript: {
        // 🔥 TypeScript errors ignore
        ignoreBuildErrors: true,
    },
}

export default withNextIntl(nextConfig)
