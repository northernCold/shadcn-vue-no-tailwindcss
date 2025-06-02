<script setup lang="ts">
interface Props {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  as?: string;
}

// eslint-disable-next-line vue/define-macros-order
withDefaults(defineProps<Props>(), {
  as: "button",
  size: "sm",
  variant: "default",
});
</script>

<template>
  <component
    :is="as"
    class="basic-button"
    :disabled="disabled"
    :class="{
      'basic-button--default': variant === 'default',
      'basic-button--destructive': variant === 'destructive',
      'basic-button--outline': variant === 'outline',
      'basic-button--secondary': variant === 'secondary',
      'basic-button--ghost': variant === 'ghost',
      'basic-button--link': variant === 'link',
      'basic-button--size-default': size === 'default',
      'basic-button--size-sm': size === 'sm',
      'basic-button--size-lg': size === 'lg',
      'basic-button--size-icon': size === 'icon',
    }"
  >
    <slot />
  </component>
</template>
<style lang="scss">
.basic-button {
  // reset
  border: none;
  margin: 0;
  padding: 0;
  background-color: transparent;
  cursor: pointer;

  // inline-flex
  display: inline-flex;
  // items-center
  align-items: center;
  // justify-center
  justify-content: center;
  // gap-2
  gap: 8px;
  // whitespace-nowrap
  white-space: nowrap;
  // rounded-md
  border-radius: 8px;
  // text-sm
  font-size: 0.875rem;
  line-height: 1.25rem;
  // font-medium
  font-weight: 500;
  // transition-all
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  // shrink-0
  flex-shrink: 0;

  // outline-none
  outline: none;

  // aria-invalid:ring-destructive/20
  // dark:aria-invalid:ring-destructive/40
  // aria-invalid:border-destructive

  &:disabled {
    // disabled:pointer-events-none
    // disabled:opacity-50

    // pointer-events-none
    // pointer-events: none;
    // opacity-50
    opacity: 0.5;

    cursor: not-allowed;
  }

  & svg {
    // [&_svg]:pointer-events-none
    // [&_svg:not([class*='size-'])]:size-4
    // [&_svg]:shrink-0

    // pointer-events-none
    pointer-events: none;
    // size-4
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
  }

  // focus-visible:border-ring
  // focus-visible:ring-ring/50
  // focus-visible:ring-[3px]
  &:focus-visible {
    border: oklch(0.708 0 0);

    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      oklab(0.708 0 0 / 0.5) 0px 0px 0px 3px,
      rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }

  &--default {
    // bg-primary text-primary-foreground hover:bg-primary/90
    background-color: var(--primary);
    color: var(--primary-foreground);

    &:hover {
      background-color: var(--primary-90);
    }
  }

  &--destructive {
    // bg-destructive text-destructive-foreground hover:bg-destructive/90
    background-color: var(--destructive);
    color: #fff;

    &:hover {
      background-color: var(--destructive-90);
    }
  }

  &--outline {
    // border border-input bg-background hover:bg-accent hover:text-accent-foreground
    border: 1px solid var(--input);
    background-color: var(--background);
    color: var(--foreground);

    &:hover {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }
  }

  &--secondary {
    // bg-secondary text-secondary-foreground hover:bg-secondary/80
    background-color: var(--secondary);
    color: var(--secondary-foreground);

    &:hover {
      background-color: var(--secondary-80);
    }
  }

  &--ghost {
    // hover:bg-accent hover:text-accent-foreground
    &:hover {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }
  }

  &--link {
    // text-primary underline-offset-4 hover:underline
    color: var(--primary);
    text-underline-offset: 4px;

    &:hover {
      text-decoration: underline;
    }
  }

  &--size-default {
    // h-10 px-4 py-2
    height: 2.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  &--size-sm {
    // h-9 rounded-md px-3
    height: 2.25rem;
    border-radius: 0.375rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  &--size-lg {
    // h-11 rounded-md px-8
    height: 2.75rem;
    border-radius: 0.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  &--size-icon {
    // h-10 w-10
    height: 2.5rem;
    width: 2.5rem;
  }
}
</style>
