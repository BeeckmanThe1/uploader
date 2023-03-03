const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: ['./src/server/index.ts', './src/styles/_index.scss'],
    devtool: !isProduction && 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    mode: isProduction ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'styles/', name: '[name].min.css' }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'static/', name: `[${isProduction ? 'contenthash' : 'name'}].[ext]`}
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    target: 'node',
    stats: 'errors-only'
};

module.exports = config;