import React from "react";
import { shallow } from "enzyme";
import Systembar from "./systembar";

describe("Systembar", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Systembar />);
    expect(wrapper).toMatchSnapshot();
  });
});
