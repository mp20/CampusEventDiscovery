package b10111.CampusDiscovery.service;

import b10111.CampusDiscovery.model.Event;
import b10111.CampusDiscovery.model.UserGenerationException;

import java.util.List;

public interface EventService {
    public Event saveEvent(Event event);

    public Event findEvent(int id);

    public boolean removeEvent(int id);

    public List<Event> getEvents(Integer categories) throws UserGenerationException;
}
