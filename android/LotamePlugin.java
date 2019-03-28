package com.kuack.plugins.lotame;

import android.content.Context;
import java.io.IOException;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;

import com.lotame.android.CrowdControl;
import com.lotame.android.CrowdControl.Protocol;

public class LotamePlugin extends CordovaPlugin {
    private CrowdControl ccHttp;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("init".equals(action)) {
            if (ccHttp == null) {
                Context context = this.cordova.getActivity().getApplicationContext();
                String clientId = args.getString(0);
                ccHttp = new CrowdControl(context, Integer.parseInt(clientId));
            }
            callbackContext.success("OK");
            return true;
        } else if ("collect".equals(action)) {
            ccHttp.add(args.getString(0), args.getString(1));
            try {
                ccHttp.bcp();
                callbackContext.success("OK");
            } catch (IOException e) {
                callbackContext.error(e.getMessage());
            }
            return true;
        }
        return false;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    @Override
    public void onReset() {
        super.onReset();
    }
}
