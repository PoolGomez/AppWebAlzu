/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol:"https",
                hostname:"utfs.io",
                pathname:"**"
            },
            // {
            //     protocol: 'https',
            //     hostname: '**', // Permitir cualquier host
            //     pathname: '/**', // Permitir cualquier ruta
            // },
            // {
            //     protocol: 'http',
            //     hostname: '**', // Permitir cualquier host
            //     pathname: '/**', // Permitir cualquier ruta
            // },
        ]
    }
};

export default nextConfig;
