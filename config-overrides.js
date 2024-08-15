// ModuleScopePlugin的特殊限制导致文件只能存在src目录下
// 使用 react-app-rewired 移除 该插件
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

    return config;
};