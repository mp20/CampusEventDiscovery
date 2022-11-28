package b10111.CampusDiscovery.repository;

import b10111.CampusDiscovery.model.Event;
import b10111.CampusDiscovery.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer>, CrudRepository<Event, Integer> {
    List<Event> findByEventID(int id);

    List<Event> findByCategoriesIn(List<User.Interest> categories);

}
