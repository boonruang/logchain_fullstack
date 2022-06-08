import React from "react";
import { shallow } from "enzyme";
import UserEdit from "./userEdit";

describe("UserEdit", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<UserEdit />);
    expect(wrapper).toMatchSnapshot();
  });
});
