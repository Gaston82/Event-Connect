import React from "react";
import { shallow } from "enzyme";
import { Footer } from "./Footer";
var enzyme = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");

enzyme.configure({ adapter: new Adapter() });

it("first test", () => {
  const wrapper = shallow(<Footer />);
  const button = wrapper.find("button");
  expect(button).toBe(true);
});
