import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Button } from "@/components/button";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const meta: Meta = {
  title: "Components/Form",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  //   render: () => ({
  //    components: {
  //     FormControl,
  //     FormDescription,
  //     FormField,
  //     FormItem,
  //     FormLabel,
  //     FormMessage,
  //     Button
  //    },
  //    setup() {
  //     const formSchema = toTypedSchema(z.object({
  //         username: z.string().min(2).max(50),
  //       }))
  //       const { isFieldDirty, handleSubmit } = useForm({
  //         validationSchema: formSchema,
  //       })
  //     return () => (
  //         <form class="w-2/3 space-y-6" onSubmit={onSubmit}>
  //         <FormField
  //           name="username"
  //           validate-on-blur={!isFieldDirty}
  //           v-slot={{ componentField }}
  //         >
  //           <FormItem>
  //             <FormLabel>Username</FormLabel>
  //             <FormControl>
  //               <input type="text" placeholder="shadcn" {...componentField} />
  //             </FormControl>
  //             <FormDescription>
  //               This is your public display name.
  //             </FormDescription>
  //             <FormMessage />
  //           </FormItem>
  //         </FormField>
  //         <Button>
  //           Submit
  //         </Button>
  //       </form>
  //     )
  //   })
};
