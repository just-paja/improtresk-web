import cssHook from 'css-modules-require-hook';

cssHook({
  generateScopedName: '[local]__[path][name]__[hash:base64:5]',
});
