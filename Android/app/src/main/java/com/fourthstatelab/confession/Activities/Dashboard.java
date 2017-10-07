package com.fourthstatelab.confession.Activities;

import android.content.Context;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.os.Build;
import android.support.annotation.IdRes;
import android.support.design.widget.AppBarLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;
import android.widget.TextView;

import com.fourthstatelab.confession.Fragments.PostsFragment;
import com.fourthstatelab.confession.Fragments.ProfileFragment;
import com.fourthstatelab.confession.Fragments.SendFragment;
import com.fourthstatelab.confession.R;
import com.fourthstatelab.confession.Utils.HttpRequest;
import com.fourthstatelab.confession.Utils.Preference;
import com.roughike.bottombar.BottomBar;
import com.roughike.bottombar.OnTabSelectListener;

import static com.fourthstatelab.confession.Utils.Preference.JOBHI_KEY;
import static com.fourthstatelab.confession.Utils.Preference.get;

public class Dashboard extends AppCompatActivity implements
        PostsFragment.OnFragmentInteractionListener,
        SendFragment.OnFragmentInteractionListener,
        ProfileFragment.OnFragmentInteractionListener{

    PostsFragment fragmentPosts;
    SendFragment fragmentSend;
    ProfileFragment fragmentProfile;
    FragmentManager fragmentManager;

    TextView textViewTitle;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        declareFragments();
        initBars();
    }

    void initBars(){


        /*HttpRequest JobhiObject=(new HttpRequest(getApplicationContext(),"/jobhi/jobhi"))
                .addParam("Jobhi key","Jobhi Value")
                .sendRequest(new HttpRequest.OnResponseListener() {
                    @Override
                    public void OnResponse(String response) {

                    }
                });

        Preference.put(getApplicationContext(),JOBHI_KEY,JobhiObject);
        HttpRequest JobhiVALUEFROMPREFS = get(getApplicationContext(),JOBHI_KEY);

        */
        BottomBar bottomBar = (BottomBar) findViewById(R.id.bottomBar);
        textViewTitle = (TextView)findViewById(R.id.title_toolbar);
        final AppBarLayout appBarLayout = (AppBarLayout) findViewById(R.id.appbarlayout);
        bottomBar.setOnTabSelectListener(new OnTabSelectListener() {
            @Override
            public void onTabSelected(@IdRes int tabId) {
                Fragment fragmentToOpen = null;
                String title="";
                int color=0;
                switch(tabId){
                    case R.id.tab_message:
                        fragmentToOpen =fragmentPosts;
                        title = "Recieved";
                        color = R.color.colorPrimaryPink;
                        break;
                    case R.id.tab_send:
                        fragmentToOpen=fragmentSend;
                        title = "Sent";
                        color = R.color.colorPrimaryTeal;
                        break;
                    case R.id.tab_profile:
                        fragmentToOpen = fragmentProfile;
                        title = "Profile";
                        color = R.color.colorPrimaryBlue;
                        break;
                }
                if(fragmentToOpen!=null){
                    textViewTitle.setText(title);
                    setStatusBar(getWindow(),getApplicationContext(),color);
                    GradientDrawable softShape = (GradientDrawable) appBarLayout.getBackground();
                    softShape.setColor(getResources().getColor(color));
                    fragmentManager.beginTransaction().replace(R.id.dashboard_container, fragmentToOpen).commit();
                }
            }
        });
    }

    void declareFragments(){
        fragmentManager = getSupportFragmentManager();
        fragmentPosts = PostsFragment.newInstance();
        fragmentSend = SendFragment.newInstance();
        fragmentProfile = ProfileFragment.newInstance();
    }
    @Override
    public void onFragmentInteraction(Uri uri) {

    }

    public void setStatusBar(Window window, Context context, int color) {
        if(Build.VERSION.SDK_INT>=21){
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.setStatusBarColor(ContextCompat.getColor(context,color));
        }
    }  //CHANGE THE COLOR OF THE STATUS BAR
}
