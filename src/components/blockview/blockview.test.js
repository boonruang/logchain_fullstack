import React from "react";
import { shallow } from "enzyme";
import Blockview from "./blockview";

describe("Blockview", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Blockview />);
    expect(wrapper).toMatchSnapshot();
  });
});
