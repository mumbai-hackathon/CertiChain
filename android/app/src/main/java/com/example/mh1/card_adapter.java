package com.example.mh1;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.TextView;

import java.util.List;

public class card_adapter extends RecyclerView.Adapter<card_adapter.ViewHolder>  {



    private List<card_value> cardList;
    private Context context;
    private OnItemClicklistener mListener;

    public interface OnItemClicklistener{
        void onItemClick(int poition);
    }



    public card_adapter(List<card_value> cardList, Context context) {
        this.cardList = cardList;
        this.context = context;
    }

    public void SetOnItemClick(OnItemClicklistener listner)
    {
        mListener=listner;
    }



    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
       View v = LayoutInflater.from(viewGroup.getContext())
                .inflate(R.layout.content,viewGroup,false);
    return  new ViewHolder(v);}

    @Override
    public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {
        card_value card =cardList.get(i);
        viewHolder.ten.setText(card.getEname());
        viewHolder.td.setText(card.getDate());
        viewHolder.tf.setText(card.geteFaculty());
        viewHolder.tei.setText(card.getEventId());
        viewHolder.tt.setText(card.getTap());

    }

    @Override
    public int getItemCount() {
        return cardList.size();
    }


    public class ViewHolder extends RecyclerView.ViewHolder {

       public TextView ten,tei,td,tf,tt;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            ten=(TextView) itemView.findViewById(R.id.ename);
            tei=(TextView) itemView.findViewById(R.id.eid);
            td=(TextView) itemView.findViewById(R.id.date);
            tf=(TextView) itemView.findViewById(R.id.faculty);
            tt=itemView.findViewById(R.id.tap);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if(mListener!=null){
                        int position = getAdapterPosition();
                        if(position!=RecyclerView.NO_POSITION){
                            mListener.onItemClick(position);
                        }
                    }
                }
            });



        }
    }
}
