import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../contexts/auth";

class Login extends Component {
  static contextType = AuthContext;
  state = {
    account: { email: "", password: "" },
    errors: {},
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.email.trim() === "") {
      errors.email = "email is requierd.";
    }

    if (account.password.trim() === "") {
      errors.password = "Password is requierd.";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state.account;
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    try {
      await this.context.login(email, password);
    } catch (err) {
      this.setState({ errors: { page: "wrong email/password" } });
      return; //handle error
    }
    this.props.history.push("/Groups");
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div className="row pt-5">
        <div className="col-12 offset-md-4 col-md-4 mt-1 justify-content-center">
          <form
            className="py-1 border rounded p-2 bg-info"
            onSubmit={this.handleSubmit}
          >
            <div className="form-group">
              <input
                value={account.email}
                onChange={this.handleChange}
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email *"
              ></input>
              {errors.email && (
                <div className="alert alert-danger mt-2 p-0">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="form-group">
              <input
                value={account.password}
                onChange={this.handleChange}
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password *"
              ></input>
              {errors.password && (
                <div className="alert alert-danger mt-2 p-0">
                  {errors.password}
                </div>
              )}
            </div>
            <button
              type="submit"
              id="button-submit"
              className="btn btn-secondary"
            >
              Login
            </button>
            <p className="small mt-2 mb-1">
              don't have a user?
              <Link to="/signup" className="text-white ">
                {" "}
                register
              </Link>
            </p>
          </form>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#273036"
            fill-opacity="1"
            d="M0,0L12.6,37.3C25.3,75,51,149,76,192C101.1,235,126,245,152,224C176.8,203,202,149,227,112C252.6,75,278,53,303,37.3C328.4,21,354,11,379,58.7C404.2,107,429,213,455,224C480,235,505,149,531,112C555.8,75,581,85,606,101.3C631.6,117,657,139,682,160C707.4,181,733,203,758,213.3C783.2,224,808,224,834,192C858.9,160,884,96,909,90.7C934.7,85,960,139,985,154.7C1010.5,171,1036,149,1061,138.7C1086.3,128,1112,128,1137,122.7C1162.1,117,1187,107,1213,128C1237.9,149,1263,203,1288,213.3C1313.7,224,1339,192,1364,192C1389.5,192,1415,224,1427,240L1440,256L1440,320L1427.4,320C1414.7,320,1389,320,1364,320C1338.9,320,1314,320,1288,320C1263.2,320,1238,320,1213,320C1187.4,320,1162,320,1137,320C1111.6,320,1086,320,1061,320C1035.8,320,1011,320,985,320C960,320,935,320,909,320C884.2,320,859,320,834,320C808.4,320,783,320,758,320C732.6,320,707,320,682,320C656.8,320,632,320,606,320C581.1,320,556,320,531,320C505.3,320,480,320,455,320C429.5,320,404,320,379,320C353.7,320,328,320,303,320C277.9,320,253,320,227,320C202.1,320,177,320,152,320C126.3,320,101,320,76,320C50.5,320,25,320,13,320L0,320Z"
          ></path>
        </svg>
      </div>
    );
  }
}

export default Login;
