import React from 'react';

import {BsArrowUpCircleFill, BsArrowUpCircle} from "react-icons/bs";
import {
    ToggleButton,
  } from "@mui/material";

class Upvote extends React.Component {

    constructor() {
        super();
        this.state = {
            toggle: false
        };

        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(e) {
      this.setState({ toggle: !this.state.toggle })
    }

    render() {
       return (
          <ToggleButton onClick={this.onToggle} type="button"
            >
                {this.state.toggle ? "Upvoted" : "Upvote"}
          </ToggleButton>
       );
    }
}

export default Upvote;