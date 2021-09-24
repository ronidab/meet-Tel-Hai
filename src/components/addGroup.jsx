import React, { Component } from "react";

class AddGroup extends Component {
  state = {};
  render() {
    return (
      <form className="border border-dark bg-info p-3">
        <div className="form-inline">
          <div className="form-control-md p-2">
            <input type="text" class=" -control" placeholder="Group name" />
          </div>

          <div className="form-group p-2 ">
            <button className="btn  btn-sm">Create new group</button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddGroup;
