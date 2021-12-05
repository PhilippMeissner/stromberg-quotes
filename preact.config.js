import tailwind from 'preact-cli-tailwind';
import envVars from 'preact-cli-plugin-env-vars';

module.exports = (config, env, helpers) => {
  config = tailwind(config, env, helpers);
  envVars(config, env, helpers);
  return config;
};
