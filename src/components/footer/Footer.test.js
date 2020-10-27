import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer";

it("first test", () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper.find("footer.footer").length).toEqual(1);
});
it("second test", () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper.find("link.footer__logo").length).toEqual(0);
});
it("second test", () => {
  const wrapper = shallow(<Footer />);
  const link = wrapper.find("icon.footer__logo");
  console.log(link);
});
