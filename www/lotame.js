function LotamePlugin() {};

LotamePlugin.prototype.init = function(clientId, success, error) {
    cordova.exec(success, error, 'Lotame', 'init', [clientId.toString()]);
};

LotamePlugin.prototype.collect = function(dataKey, dataVal, success, error) {
    cordova.exec(success, error, 'Lotame', 'collect', [dataKey.toString(), dataVal.toString()]);
};

module.exports = new LotamePlugin();