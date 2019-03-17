package com.example.mh1;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

public class notify_frag extends Fragment implements notify_adapter.OnItemClicklistener2 {
    View view;
    private RecyclerView recyclerView;
    private  RecyclerView.Adapter adapter;
    private List<notify_value> card_valueList1;
    private  String server_url ="http://192.168.43.19:8080/student/getNotificationDetails";
    private String un;
    private String cid="";
    private SwipeRefreshLayout refreshLayout;


    public notify_frag() {
    }


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.notification_frag,container,false);

        Bundle bundle=this.getArguments();
        un=bundle.getString("username");

        recyclerView =(RecyclerView) view.findViewById(R.id.recycler_view_notify);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(view.getContext()));


        get_data();


        return view;
    }


    public void get_data()
    {

        final JSONObject jsonObject = new JSONObject();
        try {

            jsonObject.put("username", un);

        }
        catch (JSONException e) {
            e.printStackTrace();
        }

        final String requestBody = jsonObject.toString();
        Log.i("volleyABC", requestBody);

        StringRequest stringRequest =new StringRequest(Request.Method.POST,server_url,new Response.Listener<String>(){
            @Override
            public void onResponse(String response) {

                Log.i("volleyABC" ,"got response    "+response);

                try {
                    JSONArray jsonArray = new JSONArray(response);
                    Log.i("volleyABC" ,"got response    "+jsonArray);

                    card_valueList1 =new ArrayList<>();
                    for(int i=0;i<jsonArray.length();i++)
                    {
                        JSONObject minute = jsonArray.getJSONObject(i);
                        Log.i("volleyABC" ,"got response    "+minute);

                        String cmpny=minute.getString("company");
                        String name=minute.getString("name");
                        String ename=minute.getString("eventname");
                        String club=minute.getString("club");
                        //String cid=minute.getString("certificateId");

                        notify_value card =new notify_value(cmpny,ename,name,club);
                        card_valueList1.add(card);

                    }
                    Log.i("volleyABC" ,"added into card  ");
                    adapter = new notify_adapter(card_valueList1,view.getContext());
                    Log.i("volleyABC" ,"added into cardadapter  ");
                    // adapter.ItemClickListener(certificate_view.this);
                    recyclerView.setAdapter(adapter);
                    Context context = getActivity();
                    //((notify_adapter)adapter).SetOnItemClick2( view.getRootView());
                    Log.i("volleyABC" ,"added into card and recycled ");
                    //((card_adapter) adapter).SetOnItemClick((card_adapter.OnItemClicklistener) view);





                } catch (JSONException e) {
                    e.printStackTrace();
                }


            }
        },new Response.ErrorListener()  {

            @Override
            public void onErrorResponse(VolleyError error) {

                TextView noCerti = view.findViewById(R.id.nonotifi);
                noCerti.setVisibility(View.VISIBLE);

                try{
                    //String statusCode = String.valueOf(error.networkResponse.statusCode);
                    Log.i("volleyABC" ,Integer.toString(error.networkResponse.statusCode));
                    error.printStackTrace();}
                catch (Exception e)
                {
                    Toast.makeText(view.getContext(),"Check Network",Toast.LENGTH_SHORT).show();}

            }
        }){

            @Override
            public byte[] getBody() throws AuthFailureError {
                try {
                    return requestBody.getBytes("utf-8");
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                    return null;
                }
            }

            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }
        };
        RequestQueue requestQueue= Volley.newRequestQueue(view.getContext());
        requestQueue.add(stringRequest);
    }


    @Override
    public void onItemClick2(int poition) {
        notify_value clickedItem=card_valueList1.get(poition);
        Intent notify = new Intent(view.getContext(),notify_response.class);
        notify.putExtra("company",clickedItem.getCompany());
        notify.putExtra("name",clickedItem.getRname());
        notify.putExtra("eventname",clickedItem.getEventname());
        notify.putExtra("club",clickedItem.getClub());
        Log.i("volleyABC","clicked");
        startActivity(notify);
    }
}
