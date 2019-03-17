package com.example.mh1;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Register_page extends AppCompatActivity {

    String server_url="http://192.168.43.19:8080/student/register";
    //String server_url="http://192.168.43.19:8080/student/register";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register_page);

        final Button register= findViewById(R.id.regist_button);

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                EditText fname = findViewById(R.id.fname);
                String fn_s=fname.getText().toString();

                EditText lname = findViewById(R.id.lname);
                String ln_s=lname.getText().toString();

                EditText  usrid_r= findViewById(R.id.userid);
                String uid_s=usrid_r.getText().toString();

                EditText  pass_r= findViewById(R.id.pass1);
                String pw_s=pass_r.getText().toString();

                EditText  cpass_r= findViewById(R.id.pass2);
                String cpw_s=cpass_r.getText().toString();

                EditText  email_r= findViewById(R.id.email);
                String email_s=email_r.getText().toString();

                EditText  phone_r= findViewById(R.id.phone);
                String phn_s=phone_r.getText().toString();

                RadioGroup yr=  findViewById(R.id.year_E);
                RadioGroup branch=  findViewById(R.id.branch_E);
                RadioButton yr_b=findViewById(yr.getCheckedRadioButtonId());
                RadioButton br_b=findViewById(branch.getCheckedRadioButtonId());

                TextView inc_pass =findViewById(R.id.inccorect_password);
                inc_pass.setVisibility(View.INVISIBLE);

                if(fn_s.length()==0 || ln_s.length()==0)
                    Toast.makeText(Register_page.this,"Enter Name",Toast.LENGTH_SHORT).show();
                else if(uid_s.length()<5)
                    Toast.makeText(Register_page.this,"Invalid Userid",Toast.LENGTH_SHORT).show();
                else if(!pw_s.equals(cpw_s))
                {Toast.makeText(Register_page.this,"Password doesnot match",Toast.LENGTH_SHORT).show();
                    inc_pass.setVisibility(View.VISIBLE);}

                else if(!isEmailValid(email_s))
                    Toast.makeText(Register_page.this,"Invalid Email",Toast.LENGTH_SHORT).show();

                else if(phn_s.length()>10)
                    Toast.makeText(Register_page.this,"Invalid phone Number",Toast.LENGTH_SHORT).show();

                else if(yr_b==null) Toast.makeText(Register_page.this,"Enter Year",Toast.LENGTH_SHORT).show();

                else if(br_b==null) Toast.makeText(Register_page.this,"Enter Branch",Toast.LENGTH_SHORT).show();


                else {
                    String yr_s =  yr_b.getText().toString();
                    String br_s =  br_b.getText().toString();
                    register_data(uid_s,fn_s,ln_s,pw_s,email_s,phn_s,br_s,yr_s);
                }

            }
        });

    }
    public void register_data(String username, String fname, String lname, String password, String email, String contactNo, String branch, String year)
    {
        final JSONObject jsonObject=new JSONObject();
        try{
            jsonObject.put("username",username);
            jsonObject.put("fname",fname);
            jsonObject.put("lname",lname);
            jsonObject.put("password",password);
            jsonObject.put("email",email);
            jsonObject.put("contactNo",contactNo);
            jsonObject.put("branch",branch);
            jsonObject.put("year",year);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        final String requestBody = jsonObject.toString();




        Log.i("volleyABC", requestBody);


        StringRequest stringRequest = new StringRequest(Request.Method.POST, server_url, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Toast.makeText(Register_page.this,"Succesfully Registered",Toast.LENGTH_SHORT).show();
                Intent login_page= new Intent(Register_page.this,MainActivity.class);startActivity(login_page);finish();
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                try{
                    Toast.makeText(Register_page.this,"Unsuccesfull try",Toast.LENGTH_SHORT).show();
                    error.printStackTrace();}
                catch (Exception e)
                {
                    Toast.makeText(Register_page.this,"Check Network",Toast.LENGTH_SHORT).show();

                }

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
        RequestQueue requestQueue= Volley.newRequestQueue(Register_page.this);
        requestQueue.add(stringRequest);


    }


    public static boolean isEmailValid(String email) {
        boolean isValid = false;

        String expression = "^[\\w\\.-]+@([\\w\\-]+\\.)+[A-Z]{2,4}$";
        CharSequence inputStr = email;

        Pattern pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(inputStr);
        if (matcher.matches()) {
            isValid = true;
        }
        return isValid;
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent login_page= new Intent(Register_page.this,MainActivity.class);startActivity(login_page);finish();

    }
}
