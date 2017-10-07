package com.fourthstatelab.confession.List_Adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.fourthstatelab.confession.R;
import com.fourthstatelab.confession.Utils.Post;

import java.util.List;

/**
 * Created by sparsha on 29/8/17.
 */

public class ReceivedPostAdapter extends BaseAdapter {

    List<Post> postlist;
    Context context;
    LayoutInflater layoutInflater;

    public ReceivedPostAdapter(Context con, List<Post> p){
        context=con;
        postlist=p;
        layoutInflater=(LayoutInflater)context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    }

    @Override
    public int getCount() {
        return postlist.size();
    }

    @Override
    public Object getItem(int i) {
        return null;
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        View root=layoutInflater.inflate(R.layout.received_layout,null);
        TextView message=(TextView)root.findViewById(R.id.msg);
        TextView datetime=(TextView)root.findViewById(R.id.dtime);

        message.setText(postlist.get(i).message);
        datetime.setText(postlist.get(i).date+" "+postlist.get(i).time);
        return root;
    }
}
