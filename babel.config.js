module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // Inline CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET (and any other process.env.*
  // references) from the build environment so secrets are never committed to source.
  plugins: ['transform-inline-environment-variables'],
};
