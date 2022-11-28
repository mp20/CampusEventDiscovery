package b10111.CampusDiscovery.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User {

    enum Gender {
        WOMAN, MAN, OTHER;
    }

    public final static Gender[] ALL_GENDERS = Gender.values();

    enum Role {
        STUDENT, TEACHER, ORGANIZER, ADMIN;
    }

    enum EducationLevel {
        PURSUING_BACHELORS, BACHELORS, PURSING_MASTERS, MASTERS, PURSUING_DOCTORATE, DOCTORATE;
    }

    public final static EducationLevel[] ALL_EDUCATION_LEVELS = EducationLevel.values();

    public final static Role[] ALL_ROLES = Role.values();

    public enum Interest {
        SPORTS,
        SWIMMING, SOCCER, SOFTBALL, FOOTBALL, FRISBEE, VOLLEYBALL, TENNIS, BOWLING,
        ART,
        ORIGAMI, PAINTING, DRAWING;
    }

    public final static Interest[] ALL_INTERESTS = Interest.values();


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String username;
    private String password;
    private String name;
    private Role role;
    private Gender gender;
    private String email;
    private boolean isOver21;
    private EducationLevel educationLevel;
    @ElementCollection
    private List<Interest> interests;
    @ElementCollection
    private List<Integer> invitedEvents;

    public User(String username,
                String email,
                String password,
                String name,
                int role,
                int gender,
                int educationLevel,
                boolean isOver21,
                int[] interests) throws UserGenerationException {
// System.out.println(username + " " + password + " " + name + " " + role + " " + gender + " " + interests[0]);

        if (role >= ALL_ROLES.length || role < 0) {
            throw new UserGenerationException("Invalid role");
        }
        this.role = ALL_ROLES[role];
        if (gender >= ALL_ROLES.length || gender < 0) {
            throw new UserGenerationException("Invalid gender");
        }
        this.gender = ALL_GENDERS[gender];
        if (educationLevel >= ALL_EDUCATION_LEVELS.length || educationLevel < 0) {
            throw new UserGenerationException("Invalid education level");
        }
        this.email = email;
        this.educationLevel = ALL_EDUCATION_LEVELS[educationLevel];

        this.username = username;
        this.password = password;
        this.name = name;

        this.isOver21 = isOver21;


        this.interests = new ArrayList<>(interests.length);
        for (int interest : interests) {
            if (interest >= ALL_INTERESTS.length || interest < 0) {
                throw new UserGenerationException("Invalid interest");
            }
            this.interests.add(ALL_INTERESTS[interest]);
        }

        invitedEvents = new ArrayList<>();

    }

    public User() {
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public List<Interest> getInterests() {
        return interests;
    }

    public void setInterests(List<Interest> interests) {
        this.interests = interests;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean getIsOver21() {
        return this.isOver21;
    }

    public void setIsOver21(boolean isOver21) {
        this.isOver21 = isOver21;
    }

    public EducationLevel getEducationLevel() {
        return educationLevel;
    }

    public void setEducationLevel(EducationLevel educationLevel) {
        this.educationLevel = educationLevel;
    }

    public void inviteTo(int eventID) {
        this.invitedEvents.add(eventID);
    }

    public List<Integer> getInvitedEvents() {
        return this.invitedEvents;
    }

    public String getUserInfoJSON() {
        return "{ "
                + "\"Name\": \"" + getName() + "\", "
                + "\"Role\": \"" + (getRole().toString().substring(0, 1) + getRole().toString().substring(1).toLowerCase()) + "\", "
                + "\"UserID\": \"" + getId() + "\", "
                + "\"success\": true"
                + " }";
    }

}
