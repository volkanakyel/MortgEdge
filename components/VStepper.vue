<template>
  <div class="flex-1 relative">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="relative"
    >
      <div class="flex items-start mb-16 min-h-[100px] transition-all duration-500 ease-in-out">
        <div class="relative flex flex-col items-center">
          <div
            class="w-[44px] h-[44px] rounded-full flex items-center justify-center transform transition-all duration-300 ease-in-out"
            :class="[
              {
                'bg-[#4caf8a] text-white scale-105': isCompleted(index + 1),
                'border-2 border-[#4caf8a] bg-white text-[#4caf8a]': isActive(index + 1),
                'bg-[#f0f0f0] text-[#999] scale-95': isFuture(index + 1),
              },
              'hover:bg-[#3d9a77] hover:text-white hover:border-[#3d9a77] hover:scale-105',
            ]"
            @click="handleStepClick(index + 1)"
          >
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 scale-50 rotate-180"
              enter-to-class="opacity-100 scale-100 rotate-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
              mode="out-in"
            >
              <Icon
                v-if="isCompleted(index + 1)"
                :key="'check'"
                name="ph:check-bold"
                class="w-5 h-5"
              />
              <Icon
                v-else
                :key="step.icon"
                :name="getStepIcon(step.icon)"
                class="w-5 h-5"
              />
            </transition>
          </div>

          <div
            v-if="index < steps.length - 1"
            class="absolute left-1/2 w-[2px] -translate-x-1/2 overflow-hidden"
            :style="{
              top: 'calc(44px + 16px)',
              height: '72px',
            }"
          >
            <div
              class="absolute inset-0 transition-all duration-500 ease-in-out"
              :class="{
                'bg-[#4caf8a]': true,
                'scale-y-100 origin-top': isCompleted(index + 1),
                'scale-y-0 origin-top': !isCompleted(index + 1) && isReversing,
                'scale-y-0 origin-bottom': !isCompleted(index + 1) && !isReversing,
              }"
              :style="{
                'transition-delay': getConnectorDelay(index + 1) + 'ms',
              }"
            />
            <div
              class="absolute inset-0 bg-[#e0e0e0] transition-opacity duration-300"
              :class="{
                'opacity-0': isCompleted(index + 1),
              }"
            />
          </div>
        </div>

        <div
          class="ml-5 flex flex-col pt-2 cursor-pointer transform transition-all duration-300 ease-in-out flex-1"
          :class="{
            'translate-x-0 opacity-100': isActive(index + 1),
            '-translate-x-1 opacity-90': !isActive(index + 1),
          }"
          @click="handleStepClick(index + 1)"
        >
          <span
            class="text-sm text-[#999] mb-1 transition-all duration-300"
            :class="{
              'opacity-75': !isActive(index + 1),
            }"
          >
            Step {{ index + 1 }}
          </span>
          <span
            class="font-medium text-lg mb-1 transition-all duration-300 ease-in-out"
            :class="{
              'text-[#4caf8a] transform translate-x-1': isCompleted(index + 1),
              'text-[#333]': isActive(index + 1),
              'text-[#999]': isFuture(index + 1),
            }"
          >
            {{ step.title }}
          </span>

          <div class="h-[24px] overflow-hidden relative">
            <transition
              @before-enter="beforeEnter"
              @enter="enter"
              @before-leave="beforeLeave"
              @leave="leave"
            >
              <span
                v-if="getStepStatus(index + 1)"
                :data-index="index"
                class="text-sm text-[#4caf8a] transition-all duration-300 ease-out absolute inset-0"
              >
                {{ getStepStatus(index + 1) }}
              </span>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  steps: {
    type: Array,
    required: true,
    validator: steps => steps.every(step => step.title && step.icon),
  },
  currentStep: {
    type: Number,
    required: true,
    default: 1,
  },
})

const emit = defineEmits(['update:currentStep'])

const previousStep = ref(props.currentStep)
const isReversing = ref(false)
const stepDifference = ref(0)

watch(
  () => props.currentStep,
  (newStep, oldStep) => {
    isReversing.value = newStep < oldStep
    stepDifference.value = Math.abs(newStep - oldStep)
    previousStep.value = oldStep
  },
  { immediate: true },
)

const getStepIcon = icon => {
  const icons = {
    user: 'ph:user',
    location: 'ph:map-pin',
    info: 'ph:info',
    document: 'ph:file-text',
  }
  return icons[icon]
}

const isCompleted = stepNumber => stepNumber < props.currentStep
const isActive = stepNumber => stepNumber === props.currentStep
const isFuture = stepNumber => stepNumber > props.currentStep

const getConnectorDelay = stepNumber => {
  if (isReversing.value) {
    return (props.currentStep - stepNumber) * 100
  } else {
    return (stepNumber - previousStep.value) * 100
  }
}

const getStepStatus = stepNumber => {
  if (isCompleted(stepNumber)) return 'Complete'
  if (isActive(stepNumber)) return 'In progress'
  return null
}

const handleStepClick = stepNumber => {
  emit('update:currentStep', stepNumber)
}

const beforeEnter = el => {
  el.style.opacity = '0'
  el.style.transform = 'translateY(-10px)'
}

const enter = (el, done) => {
  const stepIndex = parseInt(el.getAttribute('data-index'))
  const baseDelay = 400
  const sequentialDelay = stepIndex * 50

  setTimeout(() => {
    el.style.opacity = '1'
    el.style.transform = 'translateY(0)'

    setTimeout(done, 300)
  }, baseDelay + sequentialDelay)
}

const beforeLeave = el => {
  el.style.opacity = '1'
  el.style.transform = 'translateY(0)'
}

const leave = (el, done) => {
  const stepIndex = parseInt(el.getAttribute('data-index'))
  const sequentialDelay = isReversing.value ? stepIndex * 50 : 0

  if (isReversing.value) {
    setTimeout(() => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(10px)'

      setTimeout(done, 300)
    }, 200 + sequentialDelay)
  } else {
    el.style.opacity = '0'
    el.style.transform = 'translateY(10px)'
    setTimeout(done, 300)
  }
}
</script>
