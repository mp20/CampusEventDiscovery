package b10111.CampusDiscovery.controller;

import b10111.CampusDiscovery.model.Event;
import b10111.CampusDiscovery.model.User;
import b10111.CampusDiscovery.model.UserGenerationException;
import b10111.CampusDiscovery.repository.UserRepository;
import b10111.CampusDiscovery.service.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class AppController {
    @Autowired
    private AppService appService;
    @Autowired
    private UserRepository userRepository;


    @PostMapping("/add-user") // http://localhost:8080/api/add-user
    public String add(@RequestBody User user) {
        appService.saveUser(user); // code to handle saving User is in AppService
        return user.getUserInfoJSON();
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> json) {
        String username = json.get("username");
        String pass = json.get("password");
        User found = appService.getUser(username, pass);
        if (found == null) {
            return "{ \"success\": false }";
        }
        return found.getUserInfoJSON();
    }

    @GetMapping("/get-all-users/")
    public String getAttendees() {
        List<User> users = appService.getAllUsers();
        StringBuilder jsonString = new StringBuilder("{\"users\":[");
        for (int i = 0; i < users.size(); i++) {
            jsonString.append("[\"" + users.get(i).getId() + "\",\"" + users.get(i).getName() + "\"]");
            if (i < users.size() - 1) {
                jsonString.append(",");
            }
        }
        jsonString.append("]}");
        return jsonString.toString();
    }

    @PostMapping("/add-event")
    public String addEvent(@RequestBody Event event) {
        event.setOwnerName(appService.findByUserID(event.getOwner()).getName());
        appService.saveEvent(event);
        return "{ \"invite\": " + event.getIsInviteOnly() + " }";//"{ \"success\" : true }";
    }

    @PostMapping("/edit-event/{id}")
    public String editEvent(@PathVariable int id, @RequestBody Event data) {
        Event event = appService.findEvent(id);
        event.setName(data.getName());
        event.setDescription(data.getDescription());
        event.setDate(data.getDate());
        event.setLocation(data.getLocation());
        event.setCapacity(data.getCapacity());
        event.setCategories(data.getCategories());
        appService.saveEvent(event);
        return "{ \"success\": true }";
    }

    @PostMapping("/delete-event/{id}")
    public String deleteEvent(@PathVariable int id) {
        appService.removeEvent(id);
        return "{ \"success\": true }";
    }

    @GetMapping("/get-attendees/{tag}/{id}")
    public String getAttendees(@PathVariable String tag, @PathVariable int id) {
        Event event = appService.findEvent(id);
        if (event == null) {
            return "{ \"success\": false }";
        }
        List<Integer> attendees;
        if (tag.equals("maybe")) {
            attendees = event.getMaybeAttendees();
        } else {
            attendees = event.getAttendees();
        }
        StringBuilder jsonString = new StringBuilder("{\"attendees\":[");
        for (int i = 0; i < attendees.size(); i++) {
            jsonString.append("[\"" + attendees.get(i) + "\",\"" + appService.findByUserID(attendees.get(i)).getName() + "\"]");
            if (i < attendees.size() - 1) {
                jsonString.append(",");
            }
        }
        jsonString.append("]}");
        return jsonString.toString();
    }

    @PostMapping("/add-attendees/{tag}/{id}/{userId}")
    public String addAttendee(@PathVariable String tag, @PathVariable int id, @PathVariable int userId) {
        Event event = appService.findEvent(id);
        List<Integer> attendees, other;
        if (tag.equals("maybe")) {
            attendees = event.getMaybeAttendees();
        } else {
            attendees = event.getAttendees();
        }
        for (int x : attendees) {
            if (x == userId) {
// already in list
                return "{ \"success\": false }";
            }
        }
        if (tag.equals("maybe")) {
            event.addMaybeAttendee(userId);
        } else {
            event.addAttendee(userId);
        }
        appService.saveEvent(event);
        return "{ \"success\": true }";
    }

    @PostMapping("/remove-attendees/{tag}/{eventid}")
    public String removeAttendees(@RequestBody int[] ids, @PathVariable String tag, @PathVariable int eventid) {
        Event event = appService.findEvent(eventid);
        if (tag.equals("both")) {
            event.removeMaybeAttendees(ids);
            event.removeAttendees(ids);
        } else if (tag.equals("maybe")) {
            event.removeMaybeAttendees(ids);
        } else {
            event.removeAttendees(ids);
        }
        appService.saveEvent(event);
        return "{ \"success\": true }";
    }

    @PostMapping("/get-events-filtered")
    public String getEventsFiltered(@RequestBody Integer categoryFilter) throws UserGenerationException {
        List<Event> matchedEvents = appService.getEvents(categoryFilter);
        for (Event e : matchedEvents) {
            e.setOwnerName(appService.findByUserID(e.getOwner()).getName());
        }
        StringBuilder jsonString = new StringBuilder("{\"events\":[");
        jsonString.append(getJSONArray(matchedEvents));
        jsonString.append("]}");
        return jsonString.toString();
    }

    @GetMapping("/get-events")
    public String getEvents() {
        List<Event> events = appService.getAllEvents();
        for (Event e : events) {
            e.setOwnerName(appService.findByUserID(e.getOwner()).getName());
        }
        StringBuilder jsonString = new StringBuilder("{\"events\":");
        jsonString.append(getJSONArray(events));
        jsonString.append("}");
        return jsonString.toString();
    }

    @PostMapping("/get-user-attending")
    public String getUserAttending(@RequestBody Integer userID) {
        List<Event> events = appService.getAllAttending(userID);
        for (Event e : events) {
            e.setOwnerName(appService.findByUserID(e.getOwner()).getName());
        }
        StringBuilder jsonString = new StringBuilder("{\"events\":");
        jsonString.append(getJSONArray(events));
        jsonString.append("}");
        return jsonString.toString();
    }

    @PostMapping("/get-user-maybe-attending")
    public String getUserMaybeAttending(@RequestBody Integer userID) {
        List<Event> events = appService.getAllMaybeAttending(userID);
        for (Event e : events) {
            e.setOwnerName(appService.findByUserID(e.getOwner()).getName());
        }
        StringBuilder jsonString = new StringBuilder("{\"events\":");
        jsonString.append(getJSONArray(events));
        jsonString.append("}");
        return jsonString.toString();
    }

    @PostMapping("/invite/{eventID}")
    public String inviteUser(@RequestBody int[] userID, @PathVariable int eventID) {
        for (int x : userID) {
            User user = appService.findByUserID(x);
            user.inviteTo(eventID);
            appService.saveUser(user);
        }
        return "{ \"success\": true }";
    }

    @PostMapping("/is-invited/{userID}/{eventID}")
    public boolean isUserInvited(@PathVariable int userID, @PathVariable int eventID) {
        User user = appService.findByUserID(userID);
        if (user == null) {
            return false;
        }
        return user.getInvitedEvents().contains(eventID);
    }

    /**
     * Gets user interests.
     *
     * @return A JSON object of all the interests.
     */
    @GetMapping("/get-interests")
    public User.Interest[] getInterests() {
        return User.ALL_INTERESTS;
    }

    private String getJSONArray(List<Event> list) {
        StringBuilder json = new StringBuilder("[");
        for (int i = 0; i < list.size(); i++) {
            Event item = list.get(i);
            json.append(item.toJSONString());
            if (i < list.size() - 1) {
                json.append(",");
            }
        }
        json.append("]");
        return json.toString();
    }

}
