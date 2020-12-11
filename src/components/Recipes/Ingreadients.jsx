import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Typography,Checkbox } from '@material-ui/core';


class Ingreadients extends Component {
  state = {
    checked: false
  }

  handleCheckBoxChange = () => {
    this.setState({
      checked: !this.state.checked,
    })
  }

  render() {
    return (
      <div>
        <Typography paragraph>  <Checkbox
          checked={this.state.checked}
          onChange={this.handleCheckBoxChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />{this.props.i.originalString}</Typography>
      </div>
    )
  }
};


export default connect()(Ingreadients);
