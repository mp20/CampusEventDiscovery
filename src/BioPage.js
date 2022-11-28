import "./Stylesheets/index.css";
import { ReactComponent as CDLogo } from "./images/Logo.svg";
import PrimaryButton from "./Components/PrimaryButton";
import TextField from "./Components/TextField";
import Dropdown from "./Components/Dropdown";
import RadioButton from "./Components/RadioButton";
import FormDelegate from "./FormDelegate";

class BioPage extends FormDelegate {
  constructor(props) {
    super(props);
    this.primaryButtonClicked = this.primaryButtonClicked.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  primaryButtonClicked(button) {
    try {
      this.submitData();
      this.props.createUser().then((data) => {
        this.props.appendData(data);
        this.props.changePage("dashboard");
      });
    } catch (error) {
      // Could not submit since all fields were not valid.
    }
  }

  render() {
    return (
      <div className="background">
        <div className={"logo-container"}>
          <CDLogo className="logo" />
        </div>
        <div className="tile">
          <h1 className="primary-header">Sign Up</h1>
          <TextField
            label="Name"
            check="NotEmpty"
            isSecure={false}
            fields={this.fields}
          />
          <Dropdown
            label="Role"
            isSecure={false}
            options={["Student", "Teacher", "Organizer"]}
            fields={this.fields}
          />
          <Dropdown
            label="Education Level"
            isSecure={false}
            options={[
              "Pursuing Bachelor's",
              "Bachelor's",
              "Pursuing Master's",
              "Master's",
              "Pursuing Doctorate",
              "Doctorate",
            ]}
            fields={this.fields}
          />
          <Dropdown
            label="Pronouns"
            isSecure={false}
            options={["She/Her", "He/Him", "They/Them", "Other"]}
            fields={this.fields}
          />
          <RadioButton
            label="I am over 21 years old."
            isChecked={false}
            fields={this.fields}
          />

          <PrimaryButton
            label="Continue to Dashboard"
            onClick={this.primaryButtonClicked}
          />
          <div className="spacer" />
        </div>
      </div>
    );
  }
}

export default BioPage;
