var fs    = require('fs');
var plist = require('plist');  // www.npmjs.com/package/plist

var FILEPATH = 'platforms/ios/Música\ VIVA/Música\ VIVA-Info.plist';

module.exports = function (context) {

    var xml = fs.readFileSync(FILEPATH, 'utf8');
    var obj = plist.parse(xml);

    if (!obj.NSAppTransportSecurity) {
        obj.NSAppTransportSecurity = {};
        obj.NSAppTransportSecurity.NSExceptionDomains = {};
        
    } else if (!obj.NSAppTransportSecurity.NSExceptionDomains) {
        obj.NSAppTransportSecurity.NSExceptionDomains = {};
    }

    obj.NSAppTransportSecurity.NSExceptionDomains['crwdcntrl.net'] = {
        NSIncludesSubdomains: true,
        NSExceptionRequiresForwardSecrecy: false,
    };

    console.log('>>> LOTAME AFTER PREPARE', obj.NSAppTransportSecurity.NSExceptionDomains)

    xml = plist.build(obj);
    fs.writeFileSync(FILEPATH, xml, { encoding: 'utf8' });

};