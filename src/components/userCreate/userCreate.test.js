import React from "react";
import { shallow } from "enzyme";
import UserCreate from "./userCreate";

describe("UserCreate", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<UserCreate />);
    expect(wrapper).toMatchSnapshot();
  });
});
