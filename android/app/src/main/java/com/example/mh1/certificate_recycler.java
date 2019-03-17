package com.example.mh1;

import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;
import android.view.View;


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
import org.w3c.dom.Text;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

public class certificate_recycler extends AppCompatActivity implements card_adapter.OnItemClicklistener {

    private RecyclerView recyclerView;
    private  RecyclerView.Adapter adapter;
    private List<card_value> card_valueList;
    private  String server_url ="http://192.168.43.19:8080/student/getCertificates";
    private String club_s;
    private String username;
    String url = null;
    String club="";

    String cid="";
    // String server_url="http://192.168.43.110:8080/student/view/certificate";//url to get cid
    String server_url1="http://192.168.43.19:8080/student/viewCertificates";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_certificate_recycler);


        String un=getIntent().getStringExtra("username");
        Log.i("volleyABC","Reached in certifiacte recycler"+un);

        recyclerView =(RecyclerView) findViewById(R.id.recycler_view);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        club_s=getIntent().getStringExtra("from");
        username=getIntent().getStringExtra("username");
        Log.i("volleyABC","geting data  club:--"+club_s);
        get_data();
        Log.i("volleyABC","got data");


    }



    public void get_data()
    {

        final JSONObject jsonObject = new JSONObject();
        try {

            jsonObject.put("username", username);
            jsonObject.put("club", club_s);
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

                    card_valueList =new ArrayList<>();
                    for(int i=0;i<jsonArray.length();i++)
                    {
                        JSONObject minute = jsonArray.getJSONObject(i);
                        Log.i("volleyABC" ,"got response    "+minute);

                        String eid=minute.getString("eId");
                        String ename=minute.getString("name");
                        String date1=minute.getString("date");
                        String faculty=minute.getString("faculty");
                        String cid=minute.getString("certificateId");

                        card_value card =new card_value(ename,date1,eid,faculty,cid,"Tap to view Certificate");
                        card_valueList.add(card);

                    }
                    adapter = new card_adapter(card_valueList,certificate_recycler.this);
                   // adapter.ItemClickListener(certificate_view.this);
                    recyclerView.setAdapter(adapter);
                    ((card_adapter) adapter).SetOnItemClick(certificate_recycler.this);





                } catch (JSONException e) {
                    e.printStackTrace();
                }


            }
        },new Response.ErrorListener()  {

            @Override
            public void onErrorResponse(VolleyError error) {

                TextView noCerti = findViewById(R.id.nocerti);
                noCerti.setVisibility(View.VISIBLE);

                try{
                    //String statusCode = String.valueOf(error.networkResponse.statusCode);
                    Log.i("volleyABC" ,Integer.toString(error.networkResponse.statusCode));
                    error.printStackTrace();}
                catch (Exception e)
                {
                    Toast.makeText(certificate_recycler.this,"Check Network",Toast.LENGTH_SHORT).show();}

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
        RequestQueue requestQueue= Volley.newRequestQueue(this);
        requestQueue.add(stringRequest);
    }


    @Override
    public void onItemClick(int poition) {
        //Intent certificate= new Intent(this,certificate_view.class);
        card_value clickedItem=card_valueList.get(poition);
        /*certificate.putExtra("cid",clickedItem.getCid());
        certificate.putExtra("username",username);
        certificate.putExtra("club",club_s);
        startActivity(certificate);finish();*/
        cid=clickedItem.getCid();
        getUrl(cid);
    }

    public void getUrl(String cid){

        final JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("cid", cid);
        }
        catch (JSONException e) {
            e.printStackTrace();
        }

        final String requestBody = jsonObject.toString();
        Log.i("volleyABC"," request for certificate:-"+requestBody);

        StringRequest stringRequest =new StringRequest(Request.Method.POST,server_url1,new Response.Listener<String>(){
            @Override
            public void onResponse(String response) {

                Log.i("volleyABC" ,"1 got response  for certificate:- "+response);

                try {
                    JSONObject jsonObject1 = new JSONObject(response);
                    url=jsonObject1.getString("curl");
                }
                catch (JSONException e) {
                    e.printStackTrace();
                }
                Log.i("volleyABC" ,"2 got response in geturl for certificate converted to string:- "+url);

                // url="http://docs.google.com/viewer?url=http://"+url;
                // url="http://docs.google.com/gview?embedded=true&url=http://"+url;
                Log.i("volleyABC","3 url for certificate:-"+url);
                url="http://"+url;

                Intent intent = new Intent(Intent.ACTION_VIEW);
                intent.setDataAndType(Uri.parse(url ), "text/html");
                startActivity(intent);




            }
        },new Response.ErrorListener()  {

            @Override
            public void onErrorResponse(VolleyError error) {


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
        RequestQueue requestQueue= Volley.newRequestQueue(this);
        requestQueue.add(stringRequest);


    }


}
