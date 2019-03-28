//  LotamePlugin.h

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>

@interface LotamePlugin : CDVPlugin {
}

- (void) init: (CDVInvokedUrlCommand*)command;
- (void) collect: (CDVInvokedUrlCommand*)command;

@end
