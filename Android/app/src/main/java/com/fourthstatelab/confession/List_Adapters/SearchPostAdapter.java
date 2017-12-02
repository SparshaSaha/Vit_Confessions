package com.fourthstatelab.confession.List_Adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.fourthstatelab.confession.R;

import java.util.List;

/**
 * Created by sparsha on 2/12/17.
 */

public class SearchPostAdapter extends BaseAdapter{
  List<String> list;
  Context con;
  LayoutInflater layoutInflater;

  public SearchPostAdapter(Context context,List<String> l)
  {
    list=l;
    con=context;
    layoutInflater=(LayoutInflater)context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

  }

  @Override
  public int getCount() {
    return list.size();
  }

  @Override
  public Object getItem(int i) {
    return list.get(i);
  }

  @Override
  public long getItemId(int i) {
    return i;
  }

  @Override
  public View getView(int i, View view, ViewGroup viewGroup) {
    View view1=null;
    view1=layoutInflater.inflate(R.layout.search_layout,null);

    TextView name=(TextView)view1.findViewById(R.id.datarec);


    name.setText(list.get(i));

    return view1;

  }
}
