import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";
import "./Header.scss";

describe("Counter testing", () => {
  it("should have one title", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find("h1").text()).toContain("event connect");
  });
  it("first test", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find("header.container.row").length).toEqual(1);
  });
});
