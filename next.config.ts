import type { NextConfig } from 'next'

const config: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.logo.dev',
                port: '',
                pathname: '/ticker/**',
                search: '?token=pk_W1ts02iVSVOyP5OF3ioMfA',

            },
        ],
    },
}

export default config