module.exports = {
    webpack: function (config, { isServer }) {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        })
        if (isServer) {
            require('./util/generateSiteMap')
            require('./util/generateShareFavImages')
        }
        return config
    }
}