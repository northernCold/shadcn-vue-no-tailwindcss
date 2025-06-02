import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { Input } from ".";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  render: (args) => ({
    components: { Input },
    setup() {
      return { args };
    },
    template: '<Input v-bind="args" />',
  }),
  argTypes: {
    defaultValue: {
      control: "text",
      defaultValue: "Default Value",
    },
    modelValue: {
      control: "text",
      defaultValue: "Value",
    },
  }
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "Default Value",
    modelValue: "Value",
  },
};