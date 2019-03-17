package com.example.mh1;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
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
import java.util.Objects;

public class certificate_view extends AppCompatActivity {

    private Toolbar toolbar;
    private WebView webView;
    private SwipeRefreshLayout refreshWebView;
    String url = null;
    String club="";
    String username="";
    String cid="";
   // String server_url="http://192.168.43.110:8080/student/view/certificate";//url to get cid
    String server_url="http://192.168.43.19:8080/student/viewCertificates";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_certificate_view);

        cid= getIntent().getStringExtra("cid");
        Log.i("volleyABC","cid in certificateView"+cid);


        Log.i("volleyABC","cid 1 in certificateView"+cid);
        getUrl(cid);




        club=getIntent().getStringExtra("club");
        username=getIntent().getStringExtra("username");


    }

    @Override
    public void onBackPressed() {
        Intent certi = new Intent(certificate_view.this,certificate_recycler.class);
        certi.putExtra("username",username);
        certi.putExtra("from",club);
        startActivity(certi);finish();
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

        StringRequest stringRequest =new StringRequest(Request.Method.POST,server_url,new Response.Listener<String>(){
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
/*
                toolbar = (Toolbar) findViewById(R.id.toolbar);
                webView=findViewById(R.id.webView);
                setSupportActionBar(toolbar);
                getSupportActionBar().setTitle("Certificate");
                getSupportActionBar().setSubtitle(url);
                getSupportActionBar().setDisplayShowTitleEnabled(true);
                webView.setWebViewClient(new WebViewClient());
                webView.loadUrl(url);*/






            }
        },new Response.ErrorListener()  {

            @Override
            public void onErrorResponse(VolleyError error) {

                try{

                    Log.i("volleyABC" ,Integer.toString(error.networkResponse.statusCode));
                    Toast.makeText(certificate_view.this,"Invalid Username or Password",Toast.LENGTH_SHORT).show();
                    error.printStackTrace();}
                catch (Exception e)
                {
                    Toast.makeText(certificate_view.this,"Check Network",Toast.LENGTH_SHORT).show();}

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
