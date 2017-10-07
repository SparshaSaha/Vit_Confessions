package com.fourthstatelab.firstapplication;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
TextView text;
  Button switch1;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    text=(TextView)findViewById(R.id.text);

    text.setText("First Android App");
    switch1=(Button)findViewById(R.id.switch1);

    switch1.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent i=new Intent(MainActivity.this,Main2Activity.class);
        startActivity(i);
      }
    });




  }
}
