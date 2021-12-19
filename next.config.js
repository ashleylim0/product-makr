module.exports = {
    webpack: function (config, { isServer }) {
        if (
            process.env.LD_LIBRARY_PATH == null ||
            !process.env.LD_LIBRARY_PATH.includes(
                `${process.env.PWD}/node_modules/canvas/build/Release:`,
            )
        ) {
            process.env.LD_LIBRARY_PATH = `${process.env.PWD}/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
        }
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        })
        if (isServer) {
            import('./util/generateSiteMap.mjs')
            import('./util/generateShareFavImages.mjs')
        }
        return config
    }
}