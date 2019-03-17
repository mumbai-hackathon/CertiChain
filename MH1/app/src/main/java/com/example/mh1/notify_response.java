package com.example.mh1;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

public class notify_response extends AppCompatActivity {

    String server_url="http://192.168.43.19:8080/student/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notify_response);

        TextView text = findViewById(R.id.notifyText);
        String t="Company:"+getIntent().getStringExtra("company")+"\nEvent name:-"+getIntent().getStringExtra("name")+"\nRecruiter name:-"+getIntent().getStringExtra("eventname")+"\nClub name:-"+getIntent().getStringExtra("club");
        text.setText(t);

        Button ab=findViewById(R.id.accept_button);
        Button db=findViewById(R.id.decline_button);

        ab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                insertSrv("1");
            }
        });

        db.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                insertSrv("0");
            }
        });
    }

    private void insertSrv(String status)
    {

        final JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("company", getIntent().getStringExtra("company"));
            jsonObject.put("eventname", getIntent().getStringExtra("eventname"));
            jsonObject.put("name", getIntent().getStringExtra("name"));
            jsonObject.put("club", getIntent().getStringExtra("club"));
            jsonObject.put("status", status);


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


                finish();


            }
        },new Response.ErrorListener()  {

            @Override
            public void onErrorResponse(VolleyError error) {

                try{

                    Log.i("volleyABC" ,Integer.toString(error.networkResponse.statusCode));
                    Toast.makeText(notify_response.this,error.networkResponse.statusCode,Toast.LENGTH_SHORT).show();
                    error.printStackTrace();}
                catch (Exception e)
                {
                    Toast.makeText(notify_response.this,"Check Network",Toast.LENGTH_SHORT).show();}

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
