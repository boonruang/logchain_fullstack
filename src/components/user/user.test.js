import React from "react";
import { shallow } from "enzyme";
import User from "./user";

describe("User", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<User />);
    expect(wrapper).toMatchSnapshot();
  });
});
