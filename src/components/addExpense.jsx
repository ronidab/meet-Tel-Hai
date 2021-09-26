import React, { Component } from "react";

class AddExpence extends Component {
  state = {};
  render() {
    return (
      <form className="border border-dark bg-info p-3">
        <div className="form-inline">
          <div className="form-control-md p-2">
            <input type="text" class=" -control" placeholder="Title" />
          </div>
          <div className="form-control-md p-2">
            <input type="text" class="Sum" placeholder="$" />
          </div>
          <div className="form-control-md p-2">
            <select
              class="custom-select my-1 mr-sm-2"
              id="inlineFormCustomSelectPref"
            >
              <option selected>Category...</option>
              <option>Grocerirs</option>
              <option>Bills</option>
              <option>Others</option>
            </select>
          </div>
          <div className="form-control-md p-2">
            <input type="date" class="form-control" />
          </div>
          <div className="form-group p-2 ">
            <button className="btn  btn-secondary -sm">Add expense</button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddExpence;
