import React from "react";
import { shallow } from "enzyme";
import Blockdata from "./blockdata";

describe("Blockdata", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Blockdata />);
    expect(wrapper).toMatchSnapshot();
  });
});
