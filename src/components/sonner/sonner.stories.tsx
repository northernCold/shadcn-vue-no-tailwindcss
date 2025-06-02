import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { Sonner } from ".";
import { toast } from "vue-sonner";

const meta: Meta<typeof Sonner> = {
  title: "Components/Sonner",
  component: Sonner,
  tags: ["autodocs"],
  render: (args) => ({
    setup() {
      return () => (
        <div>
          <Sonner {...args}></Sonner>
          <button
            onClick={() => {
              toast("My first toast");
            }}
          >
            Give me a toast
          </button>
        </div>
      );
    },
  }),
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-right",
        "top-center",
        "bottom-left",
        "bottom-right",
      ],
    },
    invert: {
      control: "boolean",
    },
    expand: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    position: "top-center",
  },
};
