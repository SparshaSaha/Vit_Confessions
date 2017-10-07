package com.fourthstatelab.confession.Utils;

import android.app.Activity;
import android.content.Context;
import android.os.AsyncTask;

import com.fourthstatelab.confession.config;
import com.squareup.okhttp.HttpUrl;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;


/**
 * Created by sid on 6/13/17.
 */

public class HttpRequest {
    private String url;
    private Map<String,String> params= new HashMap<>();
    private Context context;
    private boolean shouldExecuteResponse = true;
    private OkHttpClient client;

    private static ArrayList<HttpRequest> allRequests = new ArrayList<>();
    public static void stopAll(){
        for (HttpRequest request : allRequests){
            request.stop();
        }
        allRequests.clear();
    }

    public HttpRequest(Context context,String url){
        this.url= config.SERVER_LINK+url;
        this.context=context;
        allRequests.add(this);
    }

    public HttpRequest(Context context){
        this.context= context;
        allRequests.add(this);
    }

    public HttpRequest setUrl(String url){
        this.url = config.SERVER_LINK + url;
        return this;
    }

    public void stop(){
        shouldExecuteResponse=false;
        if(client!=null) client.cancel("Cancelled");
        allRequests.remove(this);
    }

    public HttpRequest addParam(String key,String value){
        params.put(key,value);
        return this;
    }


    public interface OnResponseListener{
        void OnResponse(String response);
    }

    public HttpRequest sendRequest(OnResponseListener onResponseListener){
        (new ApiExecuter(onResponseListener)).execute(false);
        return this;
    }




    private Request buildRequest(){
        HttpUrl.Builder httpBuider = HttpUrl.parse(url).newBuilder();
        for(Map.Entry<String, String> param : params.entrySet()) {
            httpBuider.addQueryParameter(param.getKey(),param.getValue());
        }
        Request.Builder requestBuilder= new Request.Builder()
                    .url(httpBuider.build())
                    .get();
        return requestBuilder.build();
    }

    private class ApiExecuter extends AsyncTask<Boolean,Void,String> {

        OnResponseListener onResponseListener;
        public ApiExecuter(OnResponseListener onResponseListener){
            this.onResponseListener=onResponseListener;
        }
        @Override
        protected String doInBackground(Boolean... booleans) {
            if(shouldExecuteResponse) {
                client = new OkHttpClient();
                Request request = buildRequest();
                Response response = null;
                try {
                    client.setConnectTimeout(60, TimeUnit.SECONDS);
                    client.setReadTimeout(60, TimeUnit.SECONDS);
                    client.setWriteTimeout(60, TimeUnit.SECONDS);
                    response = client.newCall(request).execute();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                if (response != null && response.isSuccessful()) {
                    try {
                        return response.body().string();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                } else {
                    return null;
                }
            }
            return null;
        }

        @Override
        protected void onPostExecute(String s) {
            if(shouldExecuteResponse) {
                onResponseListener.OnResponse(s);
            }
            allRequests.remove(HttpRequest.this);
            super.onPostExecute(s);
        }
    }

}
