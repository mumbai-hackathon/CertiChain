package com.example.mh1;

import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;

public class notify_adapter extends RecyclerView.Adapter<notify_adapter.ViewHolder> {

    private List<notify_value> cardList2;
    private Context context;
    private OnItemClicklistener2 mListener;
    private LinearLayout item_contact;

    public interface OnItemClicklistener2{
        void onItemClick2(int poition);
    }


    public void SetOnItemClick2(OnItemClicklistener2 listner)
    {
        mListener=  listner;
    }

    public notify_adapter(List<notify_value> cardList2, Context context) {
        this.cardList2 = cardList2;
        this.context = context;
    }


    @NonNull
    @Override
    public notify_adapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(viewGroup.getContext())
                .inflate(R.layout.content, viewGroup, false);

        final ViewHolder vh=new ViewHolder(v);




        vh.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(context,"clicked",Toast.LENGTH_SHORT).show();
                String cmpny=cardList2.get(vh.getAdapterPosition()).getCompany();

                Intent notify = new Intent(v.getContext(),notify_response.class);
                notify.putExtra("company",cmpny);
                notify.putExtra("name",cardList2.get(vh.getAdapterPosition()).getRname());
                notify.putExtra("eventname",cardList2.get(vh.getAdapterPosition()).getEventname());
                notify.putExtra("club",cardList2.get(vh.getAdapterPosition()).getClub());
                Log.i("volleyABC","clicked");
                context.startActivity(notify);
            }
        });



        return vh;
    }

    @Override
    public void onBindViewHolder(@NonNull notify_adapter.ViewHolder viewHolder, int i) {
        notify_value card = cardList2.get(i);
        viewHolder.tc.setText(card.getCompany());
        viewHolder.trn.setText(card.getRname());
        viewHolder.ten.setText(card.getEventname());
        viewHolder.tcl.setText(card.getClub());

    }


    @Override
    public int getItemCount() {
        return cardList2.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        public TextView ten, tc, trn, tcl;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            item_contact=itemView.findViewById(R.id.ll);
            tc = (TextView) itemView.findViewById(R.id.ename);
            trn = (TextView) itemView.findViewById(R.id.eid);
            ten = (TextView) itemView.findViewById(R.id.date);
            tcl = (TextView) itemView.findViewById(R.id.faculty);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if(mListener!=null){
                        int position = getAdapterPosition();
                        if(position!=RecyclerView.NO_POSITION){
                            mListener.onItemClick2(position);
                        }
                    }
                }
            });



        }
    }
}
