package b10111.CampusDiscovery.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Event {

// Categories

    enum Category {
        SPORTS, ART;
    }

    public final static Event.Category[] ALL_CATEGORIES = Event.Category.values();

// Attributes

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int eventID; //let me know how we want to implement UUID
    private String name;
    private String description;
    @ElementCollection
    private List<User.Interest> categories;
    @ElementCollection
    private List<String> date;
    private int capacity;
    @ElementCollection
    private List<Integer> attendees; // we can then use attendees.id from user
    @ElementCollection
    private List<Integer> maybeAttendees;

    private boolean isInviteOnly;
    private int owner;
    private String ownerName;

    public List<Float> getLocation() {
        return location;
    }

    public void setLocation(List<Float> location) {
        this.location = location;
    }

    @ElementCollection
    private List<Float> location;
    private String gender;
    private int age;

// Getters and Setters

    public String getName() {
        return name;
    }

    public void setName(String s) {
        name = s;
    }

    public int getEventID() {
        return eventID;
    }

    public void setEventID(int eventID) {
        this.eventID = eventID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public List<User.Interest> getCategories() {
        return categories;
    }

    public void setCategories(List<User.Interest> categories) {
        this.categories = categories;
    }

    public List<String> getDate() {
        return date;
    }

    public void setDate(List<String> date) {
        this.date = date;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public List<Integer> getAttendees() {
        return attendees;
    }

    public void setAttendees(List<Integer> attendees) {
        this.attendees = attendees;
    }

    public List<Integer> getMaybeAttendees() {
        return maybeAttendees;
    }

    public void setMaybeAttendees(List<Integer> attendees) {
        this.maybeAttendees = attendees;
    }

    public void addAttendee(int id) {
        this.maybeAttendees.remove((Integer) id);
        this.attendees.add(id);
    }

    public void addMaybeAttendee(int id) {
        this.attendees.remove((Integer) id);
        this.maybeAttendees.add(id);
    }

    public void removeAttendees(int[] ids) {
        for (int x : ids) {
            this.attendees.remove((Integer) x);
        }
    }

    public void removeMaybeAttendees(int[] ids) {
        for (int x : ids) {
            this.maybeAttendees.remove((Integer) x);
        }
    }

    public void setIsInviteOnly(boolean i) {
        isInviteOnly = i;
    }

    public boolean getIsInviteOnly() {
        return isInviteOnly;
    }

    public int getOwner() {
        return owner;
    }

    public void setOwner(int owner) {
        this.owner = owner;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getOwnerName() {
        return this.ownerName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

// Constructors

    public Event() {
    }

    public Event(String name,
                 String description,
                 int[] categories,
                 List<String> date,
                 int capacity,
                 String isInviteOnly,
                 int owner,
                 List<Float> location) throws EventGenerationException {
        this.name = name;

        this.description = description;

        this.categories = new ArrayList<>(categories.length);
        for (int category : categories) {
            if (category >= User.ALL_INTERESTS.length || category < 0) {
                throw new EventGenerationException("Invalid category.");
            }
            this.categories.add(User.ALL_INTERESTS[category]);
        }

        this.date = date;
        this.capacity = capacity;


        this.isInviteOnly = isInviteOnly.equals("true");

        this.owner = owner;
        this.location = location;
    }

    public String toJSONString() {
        ArrayList<Integer> cat = new ArrayList<>(categories.size());
        for (int i = 0; i < categories.size(); i++) {
            cat.add(categories.get(i).ordinal());
        }
        return "{ "
                + "\"eventID\": " + getEventID() + ", "
                + "\"name\": \"" + getName() + "\", "
                + "\"description\": \"" + getDescription() + "\", "
                + "\"categories\": " + toJSONArrayString(getCategories()) + ", "
                + "\"date\": " + toJSONArrayString(getDate()) + ", "
                + "\"capacity\": " + getCapacity() + ", "
                + "\"attendees\": " + toJSONArrayString(getAttendees()) + ", "
                + "\"isInviteOnly\": " + getIsInviteOnly() + ", "
                + "\"maybe\": " + toJSONArrayString(getMaybeAttendees()) + ", "
                + "\"owner\": " + getOwner() + ", "
                + "\"ownerName\": \"" + getOwnerName() + "\", "
                + "\"location\":" + toJSONArrayString(getLocation()) + " "
                + " }";
    }

    private <T> String toJSONArrayString(List<T> array) {
        String str = "[";
        for (int i = 0; i < array.size(); i++) {
            T item = array.get(i);
            str += "\"" + item.toString() + "\"";
            if (i < array.size() - 1) {
                str += ",";
            }
        }
        return str + "]";
    }

}
