package com.example.mh1;

import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

import java.util.ArrayList;
import java.util.List;

public class viewPagerAdapter extends FragmentPagerAdapter {

    private final List<Fragment> fragList =new ArrayList<>();
    private final List<String> fragTitles =new ArrayList<>();

    public viewPagerAdapter(FragmentManager fm) {
        super(fm);
    }

    @Override
    public Fragment getItem(int i) {
        return fragList.get(i);
    }

    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        return fragTitles.get(position);
    }

    @Override
    public int getCount() {
        return fragTitles.size();
    }

    public void AddFrag(Fragment f,String t){
        fragList.add(f);
        fragTitles.add(t);
    }
}
