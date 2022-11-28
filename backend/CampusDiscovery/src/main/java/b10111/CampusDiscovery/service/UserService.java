package b10111.CampusDiscovery.service;

import b10111.CampusDiscovery.model.User;

import java.util.List;

public interface UserService {
    public User saveUser(User user);

    public List<User> getAllUsers();

    public User getUser(String username, String password);

    public User findByUserID(int id);
}