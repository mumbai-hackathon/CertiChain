package com.example.mh1;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.design.widget.TextInputEditText;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
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

public class MainActivity extends AppCompatActivity {

    String server_url="http://192.168.43.19:8080/student/login";
   // String server_url="http://192.168.43.19:8080/student/login";
    private SharedPreferences mpref;
    private static final String pref_name="";

    String uid=" ",pstring=" ";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button Login =(Button) findViewById(R.id.Login_button);
        TextView register = findViewById(R.id.register_login);

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent register_intent = new Intent(MainActivity.this, Register_page.class);
                startActivity(register_intent);finish();
            }
        });
        final EditText usrid =(EditText) findViewById(R.id.userid);
        final TextInputEditText pword =findViewById(R.id.password);

        mpref=getSharedPreferences(pref_name,MODE_PRIVATE);

        String stored_usrid=mpref.getString("username","");
        usrid.setText(stored_usrid);

        String stored_pass=mpref.getString("password","");
        pword.setText(stored_pass);




        Login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i("" ,"Reached Listner");



                uid =usrid.getText().toString();
                pstring =pword.getText().toString();





                if(uid.length()>=5 ) { // && pstring.length()>=7

                    Log.i("volleyABC" ,"Satisfied condition");

                   /*test
                    Intent tab = new Intent(MainActivity.this,tab_activity.class);
                    startActivity(tab);
                    finish();*/


                    insertSrv();

                    SharedPreferences.Editor editor=mpref.edit();
                    editor.putString("username",uid);
                    editor.putString("password",pstring);
                    editor.apply();
                }
                else {

                    Log.i("" ,"Not satisfied condition");
                    Toast.makeText(MainActivity.this,"Invalid Username or password",Toast.LENGTH_SHORT).show();
                }
            }
        });

            }

    private void insertSrv()
    {

        final JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("username", uid);
            jsonObject.put("password", pstring);
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

                Toast.makeText(MainActivity.this,"Succesfully Login" ,Toast.LENGTH_SHORT).show();
                Intent tab = new Intent(MainActivity.this,tab_activity.class);
                tab.putExtra("username",uid);
                startActivity(tab);
                finish();


            }
        },new Response.ErrorListener()  {

            @Override
            public void onErrorResponse(VolleyError error) {

                try{

                    Log.i("volleyABC" ,Integer.toString(error.networkResponse.statusCode));
                    Toast.makeText(MainActivity.this,"Invalid Username or Password",Toast.LENGTH_SHORT).show();
                    error.printStackTrace();}
                catch (Exception e)
                {
                    Toast.makeText(MainActivity.this,"Check Network",Toast.LENGTH_SHORT).show();}

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
