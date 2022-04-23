import React from "react";
import { shallow } from "enzyme";
import Stock from "./stock";

describe("Stock", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Stock />);
    expect(wrapper).toMatchSnapshot();
  });
});
