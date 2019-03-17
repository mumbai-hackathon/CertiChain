package com.example.mh1;

import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

public class tab_activity extends AppCompatActivity {

    private TabLayout tabLayout;
    private ViewPager viewPager;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tab_activity);

        String username= getIntent().getStringExtra("username");

        tabLayout=(TabLayout)findViewById(R.id.tab_id);
        viewPager= (ViewPager) findViewById(R.id.viewpager);
        viewPagerAdapter adapter= new viewPagerAdapter(getSupportFragmentManager());

        Log.i("volleyABC","Reached in tabactivity recycler  "+username);

        Bundle bundle = new Bundle();
        bundle.putString("username",username);

        //adding frag
        club_frag club =new club_frag();
        club.setArguments(bundle);
        adapter.AddFrag(club,"CLUB");

        dash_frag dash =new dash_frag();
        dash.setArguments(bundle);
        adapter.AddFrag(dash,"DASHBOARD");

        notify_frag notify =new notify_frag();
        notify.setArguments(bundle);
        adapter.AddFrag( notify,"NOTIFICATION");

        viewPager.setAdapter(adapter);
        tabLayout.setupWithViewPager(viewPager);
    }
}
