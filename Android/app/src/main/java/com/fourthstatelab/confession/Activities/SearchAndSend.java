package com.fourthstatelab.confession.Activities;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import com.fourthstatelab.confession.List_Adapters.SearchPostAdapter;
import com.fourthstatelab.confession.R;
import com.fourthstatelab.confession.Utils.DataHolder;
import com.fourthstatelab.confession.Utils.HttpRequest;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;
import java.util.List;

public class SearchAndSend extends AppCompatActivity {
Button searchbutton;
   ListView searchview;
   EditText searchbar;
  Button sendbutton;
  EditText message;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_search_and_send);

    searchbar=(EditText)findViewById(R.id.searchbox);
    searchview=(ListView) findViewById(R.id.serachlistview);
    searchbutton=(Button)findViewById(R.id.searchbutton);

    sendbutton=(Button)findViewById(R.id.sendbutton);
    message=(EditText)findViewById(R.id.sendtext);
    Toast.makeText(this, ""+DataHolder.account.email, Toast.LENGTH_SHORT).show();

    searchbutton.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        String z=searchbar.getText().toString();

        HttpRequest searchuser=new HttpRequest(getApplicationContext(),"/searchuser")
            .addParam("parms",z).sendRequest(new HttpRequest.OnResponseListener() {
              @Override
              public void OnResponse(String response) {
                final List<String> temp=new Gson().fromJson(response,new TypeToken<List<String>>(){}.getType());
                SearchPostAdapter s=new SearchPostAdapter(getApplicationContext(),temp);

                searchview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                  @Override
                  public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                    set_destination(temp.get(i));
                  }
                });

                searchview.setAdapter(s);
              }
            });
      }
    });

    sendbutton.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        final String destination=searchbar.getText().toString();
        final HttpRequest getemail=new HttpRequest(getApplicationContext(),"/getmail").addParam("parms",destination)
            .sendRequest(new HttpRequest.OnResponseListener() {
              @Override
              public void OnResponse(String response) {
               send_text_confession(response);
                Toast.makeText(SearchAndSend.this, response, Toast.LENGTH_SHORT).show();

              }
            });


      }
    });
  }

  public void send_text_confession(String send)
  {
    HttpRequest senddata=new HttpRequest(getApplicationContext(),"/send")
        .addParam("tomail",send.toString().trim())
        .addParam("frommail", DataHolder.account.email)
        .addParam("message",message.getText().toString())
        .addParam("date","12/12/2017")
        .addParam("time","12:00 PM")
        .sendRequest(new HttpRequest.OnResponseListener() {
          @Override
          public void OnResponse(String response) {
            if(response.equals("1"))
            Toast.makeText(SearchAndSend.this, "Message has been sent", Toast.LENGTH_SHORT).show();
            finish();
          }

        });
  }

  public void set_destination(String z)
  {
    searchbar.setText(z);
    List<String> x=new ArrayList<String>();
    SearchPostAdapter s=new SearchPostAdapter(getApplicationContext(),x);
    searchview.setAdapter(s);

  }
}
