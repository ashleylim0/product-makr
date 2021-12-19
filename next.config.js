module.exports = {
    webpack: function (config, { isServer }) {
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