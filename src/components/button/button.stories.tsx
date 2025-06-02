import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { FolderPlus } from "lucide-vue-next";

import Button from "./button.vue";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "default",
    variant: "default",
  },
};

export const DefaultWithIcon: Story = {
  render: (args) => ({
    components: { FolderPlus, Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args"><FolderPlus />Button</Button>',
  }),
  args: {
    size: "default",
    variant: "default",
  },
};

export const Destructive: Story = {
  args: {
    size: "default",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    size: "default",
    variant: "outline",
  },
};

export const Secondary: Story = {
  args: {
    size: "default",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    size: "default",
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    size: "default",
    variant: "link",
  },
};

export const Icon: Story = {
  render: (args) => ({
    components: { FolderPlus, Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args"><FolderPlus /></Button>',
  }),
  args: {
    variant: "default",
    size: "icon"
  },
};


export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
