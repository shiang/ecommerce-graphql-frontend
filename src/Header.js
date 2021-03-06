import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

export default class Header extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu stackable>

        <Menu.Item
          name="features"
          active={activeItem === "features"}
          onClick={this.handleItemClick}
        >
          Products
        </Menu.Item>

        <Menu.Item
          name="testimonials"
          active={activeItem === "testimonials"}
          onClick={this.handleItemClick}
        >
          Orders
        </Menu.Item>

        <Menu.Item
          position="right"
          name="sign-in"
          active={activeItem === "sign-in"}
          onClick={this.handleItemClick}
        >
          Sign-in
        </Menu.Item>
      </Menu>
    );
  }
}
