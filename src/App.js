import React, { Component } from "react";
import "./Stylesheets/index.css";
import SignupPage from "./Signup";
import BioPage from "./BioPage";
import LoginPage from "./Login";
import HomePage from "./Homepage";
import Dashboard from "./Dashboard";

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "home",
      data: {},
    };

    this.changePage = this.changePage.bind(this);
    this.appendData = this.appendData.bind(this);
    this.tryCreateUser = this.tryCreateUser.bind(this);

    this.logout = this.logout.bind(this);

    this.events = [];

    this.getEvents = this.getEvents.bind(this);
    this.getEvents();
  }

  logout() {
    this.events = [];
    this.setState({
      page: "home",
      data: {},
    });
    this.getEvents();
  }

  getEvents() {
    fetch("http://localhost:8080/api/get-events", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response.events;
      });
  }

  genderMap = {
    "She/Her": 0,
    "He/Him": 1,
    "They/Them": 2,
    Other: 2,
  };

  roleMap = {
    Student: 0,
    Teacher: 1,
    Organizer: 2,
  };

  educationMap = {
    "Pursuing Bachelor's": 0,
    "Bachelor's": 1,
    "Pursuing Master's": 2,
    "Master's": 3,
    "Pursuing Doctorate": 4,
    Doctorate: 5,
  };

  async tryCreateUser() {
    let user = {
      username: this.state.data["Username"],
      email: this.state.data["Email"],
      password: this.state.data["Password"],
      name: this.state.data["Name"],
      role: this.roleMap[this.state.data["Role"]],
      gender: this.genderMap[this.state.data["Pronouns"]],
      educationLevel: this.educationMap[this.state.data["Education Level"]],
      isOver21: this.state.data["I am over 21 years old."],
      interests: [],
    };
    const response = await fetch("http://localhost:8080/api/add-user", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.json();
  }

  /**
  * Merges inputted data with the object's `data` prop. Typically called from a form submission.
  * @param {Object} data The data to merge.
  */
  appendData(data) {
    let newState = this.state.data;
    for (let key in data) {
      newState[key] = data[key];
    }
    this.setState({
      data: newState,
    });
  }

  /**
  * Changes the page to a new page.
  * @param {String} toValue The page id to switch to.
  */
  changePage(toValue) {
    this.setState({
      page: toValue,
    });
  }

  render() {
    switch (this.state.page) {
      case "signup":
        return (
          <SignupPage
            changePage={this.changePage}
            appendData={this.appendData}
          />
        );
      case "login":
        return (
          <LoginPage
            changePage={this.changePage}
            appendData={this.appendData}
          />
        );
      case "bio":
        return (
          <BioPage
            changePage={this.changePage}
            appendData={this.appendData}
            createUser={this.tryCreateUser}
          />
        );
      case "dashboard":
        return (
          <Dashboard
            name={this.state.data["Name"]}
            userType={this.state.data["Role"]}
            userID={this.state.data["UserID"]}
            events={this.getEvents}
            logout={this.logout}
            currentUser={this.state.data.user}
          />
        );
      default:
        return (
          <HomePage changePage={this.changePage} />
        );
    }
  }
}

export default Application;
