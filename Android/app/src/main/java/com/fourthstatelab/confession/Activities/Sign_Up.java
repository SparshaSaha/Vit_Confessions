package com.fourthstatelab.confession.Activities;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.fourthstatelab.confession.R;
import com.fourthstatelab.confession.Utils.HttpRequest;
import com.fourthstatelab.confession.Utils.Preference;

import static com.fourthstatelab.confession.Utils.Preference.EMAIL;
import static com.fourthstatelab.confession.Utils.Preference.PASSWORD;
import static com.fourthstatelab.confession.Utils.Preference.PROFILE_JSON;
import static com.fourthstatelab.confession.Utils.Preference.get;

public class Sign_Up extends AppCompatActivity {
EditText email,password;
    Button login;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign__up);

        email=(EditText)findViewById(R.id.username);
        password=(EditText)findViewById(R.id.password);
        login=(Button)findViewById(R.id.login);

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(email.getText().toString()!=null && password.getText().toString()!=null)
                {
                    HttpRequest signin=(new HttpRequest(getApplicationContext(),"/signin"))
                            .addParam("email", email.getText().toString())
                            .addParam("password", password.getText().toString())
                            .sendRequest(new HttpRequest.OnResponseListener() {
                                @Override
                                public void OnResponse(String response) {
                                    if(response.equals("0")==false){
                                        getSharedPreferences("pass",Context.MODE_PRIVATE).edit().putString("email",email.getText().toString()).apply();
                                        getSharedPreferences("pass", Context.MODE_PRIVATE).edit().putString("password",password.getText().toString()).apply();

                                        Log.d("profile_json",response.toString());

                                        getSharedPreferences("pass",Context.MODE_PRIVATE).edit().putString("profile_json",response.toString()).apply();

                                        startActivity(new Intent(Sign_Up.this,Dashboard.class));
                                        finish();
                                    }
                                    else{
                                        Toast.makeText(Sign_Up.this, "Invalid Credentials", Toast.LENGTH_SHORT).show();
                                    }
                                }
                            });
                }
            }
        });
    }
}
