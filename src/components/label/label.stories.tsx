import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { Label } from ".";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  render: (args) => ({
    components: { Label },
    setup() {
      return () => <Label v-bind="args">Label</Label>;
    },
  }),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
