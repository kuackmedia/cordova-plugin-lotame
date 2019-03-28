//
//  LotamePlugin.m
//  Música VIVA
//
//  Created by Nico on 11/12/18.
//

#import "LotamePlugin.h"
#import <Foundation/Foundation.h>

@import LotameDMP;
@implementation LotamePlugin;

- (void) init: (CDVInvokedUrlCommand*)command
{
//    CDVPluginResult* pluginResult = nil;
    NSString* clientId = [command.arguments objectAtIndex:0];
    [DMP initialize:clientId];

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) collect: (CDVInvokedUrlCommand*)command
{
    NSString* dataKey = [command.arguments objectAtIndex:0];
    NSString* dataVal = [command.arguments objectAtIndex:1];
    
    [DMP addBehaviorData:dataKey forType:dataVal];

    [DMP sendBehaviorDataWithHandler: ^(NSError * _Nullable error){
        CDVPluginResult* pluginResult = nil;
        if (error != nil){
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Error sendBehaviorData"];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
    
    [DMP sendBehaviorData];
}

@end
