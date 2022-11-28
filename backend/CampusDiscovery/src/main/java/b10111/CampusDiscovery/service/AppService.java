package b10111.CampusDiscovery.service;

import b10111.CampusDiscovery.model.Event;
import b10111.CampusDiscovery.model.User;
import b10111.CampusDiscovery.model.UserGenerationException;
import b10111.CampusDiscovery.repository.EventRepository;
import b10111.CampusDiscovery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLSyntaxErrorException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class AppService implements UserService, EventService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EventRepository eventRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user); // JpaRepository (what both UserRepository and EventReporitory extend,
// has a save method built in that will put the data into the database
// other built-in methods can be found in the documentation for JpaRepository
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(String username, String password) {
        List<User> found;
        if (username.contains("@")) {
            found = userRepository.findByEmailAndPassword(username, password);
        } else {
            found = userRepository.findByUsernameAndPassword(username, password);
        }
        if (found.size() == 0) {
            return null;
        }
        return found.get(0);
    }

    @Override
    public User findByUserID(int id) {
        return userRepository.findByid(id);
    }

    @Override
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    /**
     * Passing in an Example based on
     * https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#query-by-example
     * to find an event
     *
     * @param id of the event
     * @return the found Event
     */
    public Event findEvent(int id) {
        List<Event> found;
        found = eventRepository.findByEventID(id);
        if (found.size() == 0) {
            return null;
        }
        return found.get(0);
    }

    public boolean removeEvent(int event) {
        eventRepository.deleteById(event);
        return true;
    }

    public List<Event> getEvents(Integer categoryFilter) throws UserGenerationException {
        List<User.Interest> interests = new ArrayList<>();
            if (categoryFilter >= User.ALL_INTERESTS.length || categoryFilter < 0) {
                throw new UserGenerationException("Invalid interest");
            }
            interests.add(User.ALL_INTERESTS[categoryFilter]);
        return eventRepository.findByCategoriesIn(interests);
    }

    public List<Event> getAllAttending(Integer userID) {
        User user = userRepository.findByid(userID);
        List<Event> allEvents = eventRepository.findAll();
        List<Event> attendingEvents = new ArrayList<>();
        for (Event event : allEvents) {
            if (event.getAttendees().contains(user.getId())) {
                attendingEvents.add(event);
            }
        }
        return attendingEvents;
    }

    public List<Event> getAllMaybeAttending(Integer userID) {
        User user = userRepository.findByid(userID);
        List<Event> allEvents = eventRepository.findAll();
        List<Event> maybeAttendingEvents = new ArrayList<>();
        for (Event event : allEvents) {
            if (event.getMaybeAttendees().contains(user.getId())) {
                maybeAttendingEvents.add(event);
            }
        }
        return maybeAttendingEvents;
    }

    public List<Event> getAllEvents() {
        try {
            return eventRepository.findAll();
        } catch(Exception e) {
            return new ArrayList<>();
        }
    }

}
