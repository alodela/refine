import React from "react";
import type { RefineThemedLayoutV2Props } from "@refinedev/ui-types";

import {
  type ITestWrapperProps,
  render,
  TestWrapper as DefaultTestWrapper,
} from "@test";

export const layoutLayoutTests = (
  LayoutElement: React.ComponentType<RefineThemedLayoutV2Props>,
  TestWrapper: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }> = DefaultTestWrapper,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Layout Element", () => {
    it("Layout renders sider, header, footer, title, offLayoutArea if given props", async () => {
      const customTitleContent = "customTitleContent";
      const CustomTitle = () => <p>{customTitleContent}</p>;

      const customSiderContent = "customSiderContent";
      const CustomSider = () => <p>{customSiderContent}</p>;

      const customHeaderContent = "customHeaderContent";
      const CustomHeader = () => <p>{customHeaderContent}</p>;

      const customFooterContent = "customFooterContent";
      const CustomFooter = () => <p>{customFooterContent}</p>;

      const customOffLayoutAreaContent = "customOffLayoutAreaContent";
      const CustomOffLayoutArea = () => <p>{customOffLayoutAreaContent}</p>;

      const { getByText } = render(
        <LayoutElement
          Title={CustomTitle}
          Sider={CustomSider}
          Header={CustomHeader}
          Footer={CustomFooter}
          OffLayoutArea={CustomOffLayoutArea}
        />,
        { wrapper: TestWrapper({}) },
      );

      expect(getByText(customSiderContent));
      expect(getByText(customHeaderContent));
      expect(getByText(customFooterContent));
      expect(getByText(customOffLayoutAreaContent));
    });
  });
};
