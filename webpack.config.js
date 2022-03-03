const path = require("path");
const webpack = require("webpack");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const entry = {
   admin: {
      topbar: "./src/Topbar.jsx",
      navigation: "./src/admin/Navigation.jsx",
      dashboard: "./src/admin/Dashboard.jsx",
      akun: "./src/admin/pengguna/akun/Lists.jsx",
      tingkatan: "./src/admin/tingkatan/Lists.jsx",
      bab: "./src/admin/bab/Lists.jsx",
      judul: "./src/admin/judul/Lists.jsx",
      profile: "./src/admin/profile/Forms.jsx",
      soal: "./src/admin/soal/Lists.jsx",
   },
   translator: {
      topbar: "./src/Topbar.jsx",
      navigation: "./src/translator/Navigation.jsx",
      dashboard: "./src/translator/Dashboard.jsx",
      soal: "./src/translator/soal/Lists.jsx",
   },
   editor: {
      topbar: "./src/Topbar.jsx",
      navigation: "./src/editor/Navigation.jsx",
      dashboard: "./src/editor/Dashboard.jsx",
      soal: "./src/editor/soal/Lists.jsx",
   },
   frontpage: {
      header: "./src/frontpage/Header.jsx",
      navigation: "./src/frontpage/Navigation.jsx",
      home: "./src/frontpage/Home.jsx",
      tingkatan: "./src/frontpage/tingkatan/Lists.jsx",
      judul: "./src/frontpage/judul/Lists.jsx",
   },
   login: {
      login: "./src/Login.jsx",
   },
};

const build = {
   admin: "public/bundle/admin",
   translator: "public/bundle/translator",
   editor: "public/bundle/editor",
   frontpage: "public/bundle/frontpage",
   login: "public/bundle/login",
};

module.exports = (env) => {
   return {
      plugins: [
         new CleanWebpackPlugin(),
         new webpack.ProgressPlugin(),
         new webpack.HotModuleReplacementPlugin(),
         new WebpackManifestPlugin(entry[env.PAGE]),
         new HtmlWebpackPlugin(),
      ],
      entry: entry[env.PAGE],
      output: {
         path: path.resolve(__dirname, build[env.PAGE]),
         filename: env.NODE_ENV === "development" ? "[name].js" : "[name].[hash].js",
      },
      resolve: {
         extensions: [".js", ".jsx"],
      },
      devServer: {
         headers: {
            "Access-Control-Allow-Origin": "*",
         },
      },
      optimization: {
         splitChunks: {
            cacheGroups: {
               vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  name: "vendor",
                  chunks: "all",
               },
            },
         },
      },
      module: {
         rules: [
            {
               test: /\.(jsx|js)$/,
               include: path.resolve(__dirname, "src/"),
               exclude: /node_modules/,
               use: [
                  {
                     loader: "babel-loader",
                     options: {
                        presets: [
                           [
                              "@babel/preset-env",
                              {
                                 targets: "defaults",
                              },
                           ],
                           "@babel/preset-react",
                        ],
                     },
                  },
               ],
            },
         ],
      },
   };
};
