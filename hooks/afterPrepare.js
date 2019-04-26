#!/usr/bin/env node

'use strict';

var fs    = require('fs');
var plist = require('plist');  // www.npmjs.com/package/plist
var xml2js = require('xml2js');

module.exports = function (context) {
    // plist
    var plistPath = context.opts.projectRoot + '/platforms/ios/Música\ VIVA/Música\ VIVA-Info.plist';
    var xml = fs.readFileSync(plistPath, 'utf8');
    var obj = plist.parse(xml);

    if (!obj.NSAppTransportSecurity) {
        obj.NSAppTransportSecurity = {};
        obj.NSAppTransportSecurity.NSExceptionDomains = {};
        
    } else if (!obj.NSAppTransportSecurity.NSExceptionDomains) {
        obj.NSAppTransportSecurity.NSExceptionDomains = {};
    }

    obj.NSAppTransportSecurity.NSExceptionDomains['crwdcntrl.net'] = {
        NSIncludesSubdomains: true,
        NSExceptionAllowsInsecureHTTPLoads: true,
        NSExceptionRequiresForwardSecrecy: false,
    };

    xml = plist.build(obj);
    fs.writeFileSync(plistPath, xml, { encoding: 'utf8' });
    
    // manifest
    var manifestPath = context.opts.projectRoot + '/platforms/android/app/src/main/AndroidManifest.xml';
    var androidManifest = fs.readFileSync(manifestPath).toString();
    if (androidManifest) {
        xml2js.parseString(androidManifest, function(err, manifest) {
            if (err) return console.error(err);
            
            var manifestRoot = manifest['manifest'];
            var applicationMetaData = manifestRoot['application'][0]['meta-data'] || [];
            var metaDataFound = false;
            if (applicationMetaData.length > 0) {
                applicationMetaData.some(function(metaData) {
                    if (metaData['$'] &&
                        metaData['$']['android:name'] &&
                        metaData['$']['android:name'] === 'com.google.android.gms.ads.APPLICATION_ID') {
                            metaDataFound = true;
                            return true;
                    }
                })
            }
            
            if (!metaDataFound) {
                applicationMetaData.push({
                    '$': {
                        'android:name': 'com.google.android.gms.ads.APPLICATION_ID',
                        'android:value': 'ca-app-pub-4561590054506243~5729563277'
                    }
                });
                var builder = new xml2js.Builder();
                fs.writeFileSync(manifestPath, builder.buildObject(manifest));
                console.log('writing applicationMetaData')
            } else {
                console.log('applicationMetaData found')
            }
        })
    }
};
