package com.example.mh1;

public class card_value {

    private String ename;
    private String date;
    private String eventId;
    private String eFaculty;
    private String cid;
    private String tap;



    public card_value(String ename, String date, String eventId, String eFaculty, String cid, String tap) {
        this.ename = ename;
        this.date = date;
        this.eventId = eventId;
        this.eFaculty = eFaculty;
        this.cid = cid;
        this.tap = tap;
    }

    public String getEname() {
        return ename;
    }

    public String getDate() {
        return date;
    }

    public String getEventId() {
        return eventId;
    }

    public String geteFaculty() {
        return eFaculty;
    }

    public String getCid() {
        return cid;
    }
    public String getTap() {
        return tap;
    }
}
