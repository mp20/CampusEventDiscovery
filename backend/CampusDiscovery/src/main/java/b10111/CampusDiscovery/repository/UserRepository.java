package b10111.CampusDiscovery.repository;

import b10111.CampusDiscovery.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByUsernameAndPassword(String username, String password);

    List<User> findByEmailAndPassword(String email, String password);

    User findByid(int id);
}
