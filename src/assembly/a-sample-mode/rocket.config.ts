import { defineRocketConfig } from 'config-rocket'

export default defineRocketConfig({
  parameters: [{
    id: '$confirm-IS_FISH',
    resolver: {
      operation: 'prompt',
      label: 'Add "You are a fish" instruction?',
      type: 'confirm',
      initial: true,
    },
  }],

  variablesResolver: {
    '{{IS_FISH}}': {
      type: 'match',
      a: '$confirm-IS_FISH',
      b: true,
      result: 'instruct_you-are-a-fish.md',
    },
  },
})
