package com.fourthstatelab.confession.Utils;

import android.content.Context;
import android.content.SharedPreferences;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;


/**
 * Created by sid on 2/13/17.
 */

public class Preference {
    public static String prefName="zchedulePrefs";
    public static String JOBHI_KEY = "jobhiKey";
    public static String USERNAME="username";
    public static String EMAIL="email";
    public static String PASSWORD="password";
    public static String PROFILE_JSON="profilejson";

    //SHARED PREFERENCES INSTANCE OF THE APP
    private static SharedPreferences getPrefsInstance(Context context){
        return context.getSharedPreferences(prefName,Context.MODE_PRIVATE);
    }

    //SHARED PREFERENCES EDITOR INSTANCE OF THE APP
    private static SharedPreferences.Editor getPrefEditor(Context context){
        return getPrefsInstance(context).edit();
    }

    //STRING PREFERENCES
    public static void put(Context context, String name, String value){
        SharedPreferences.Editor editor= getPrefEditor(context);
        editor.putString(name,value);
        editor.apply();
    }
    public static String get(Context context,String name,String defaultValue){
        return getPrefsInstance(context).getString(name,defaultValue);
    }

    //BOOLEAN PREFERENCES
    public static void put(Context context,String name, boolean value){
        SharedPreferences.Editor editor= getPrefEditor(context);
        editor.putBoolean(name,value);
        editor.apply();
    }
    public static boolean get(Context context,String name,boolean defaultValue){
        return getPrefsInstance(context).getBoolean(name,defaultValue);
    }

    //INTEGER PREFERENCES
    public static void put(Context context,String name,int value){
        SharedPreferences.Editor editor= getPrefEditor(context);
        editor.putInt(name,value);
        editor.apply();
    }
    public static int get(Context context,String name,int defaultValue){
        return getPrefsInstance(context).getInt(name,defaultValue);
    }

    //GENERICS
    public static <E> void put(Context context,String key,E value){
        getPrefEditor(context).putString(key,(new Gson()).toJson(value));
    }
    public static <E> E get(Context context,String key){
        String json = getPrefsInstance(context).getString(key,null);
        if(json==null)
            return null;
        return (new Gson()).fromJson(json, new TypeToken<E>(){}.getType());

    }
}
