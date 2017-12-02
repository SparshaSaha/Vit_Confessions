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
  }

  public void set_destination(String z)
  {
    searchbar.setText(z);
    List<String> x=new ArrayList<String>();
    SearchPostAdapter s=new SearchPostAdapter(getApplicationContext(),x);
    searchview.setAdapter(s);

  }
}
