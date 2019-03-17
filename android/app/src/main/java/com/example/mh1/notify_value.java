package com.example.mh1;

public class notify_value {

    private String company;
    private String rname;
    private String eventname;
    private String club;

    public notify_value(String company, String rname, String eventname, String club) {
        this.company = company;
        this.rname = rname;
        this.eventname = eventname;
        this.club = club;
    }

    public String getCompany() {
        return company;
    }

    public String getRname() {
        return rname;
    }

    public String getEventname() {
        return eventname;
    }

    public String getClub() {
        return club;
    }
}
