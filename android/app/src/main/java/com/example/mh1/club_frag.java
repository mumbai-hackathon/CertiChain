package com.example.mh1;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.text.Layout;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

public class club_frag extends Fragment {
    View view;
    String un;
    public club_frag() {

    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        view = inflater.inflate(R.layout.club_frag,container,false);

        Bundle bundle=this.getArguments();
        un=bundle.getString("username");
        Log.i("volleABC",un);

        //club_selection
        TextView csi_c =(TextView) view.findViewById(R.id.csi_tab);
        TextView acm_c =(TextView) view.findViewById(R.id.acm_tab);
        TextView domain_c =(TextView) view.findViewById(R.id.domain_tab);

        //setonclicklistner
        csi_c.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent certi = new Intent(getActivity(),certificate_recycler.class);
                certi.putExtra("username",un);
                certi.putExtra("from","CSI");
                getActivity().startActivity(certi);
            }
        });
        acm_c.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent certi = new Intent(getActivity(),certificate_recycler.class);
                certi.putExtra("username",un);
                certi.putExtra("from","ACM");
                getActivity().startActivity(certi);
            }
        });
        domain_c.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent certi = new Intent(getActivity(),certificate_recycler.class);
                certi.putExtra("username",un);
                certi.putExtra("from","DOMAIN");
                getActivity().startActivity(certi);
            }
        });


        return view;
    }
}
