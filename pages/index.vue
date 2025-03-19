<template>
  <div class="min-h-screen bg-white font-['Inter']">
    <div class="flex min-h-screen">
      <div class="w-[45%] max-w-[550px] bg-gray-50 p-8 flex flex-col border-r border-gray-200">
        <div class="flex items-center gap-2 mb-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-8 h-8"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="4"
              fill="white"
              stroke="#4CAF8A"
              stroke-width="2"
            />
            <path
              d="M8 12L12 8L16 12L12 16L8 12Z"
              fill="#4CAF8A"
            />
          </svg>
          <span class="text-2xl font-semibold text-gray-800">
            Mortg<span class="font-normal text-gray-500">Edge</span>
          </span>
        </div>
        <VStepper
          v-model:current-step="currentStep"
          :steps="steps"
        />

        <div class="mt-auto pt-8 text-sm text-gray-500">
          Already have an account?
          <a
            href="#"
            class="text-[#4caf8a] font-medium no-underline hover:text-[#3d9a77]"
          >
            Log in
          </a>
        </div>
      </div>

      <div class="flex-1 flex flex-col">
        <div class="flex justify-between items-center p-4 border-b border-gray-200">
          <button class="back-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="chevron-left"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
          <div class="help-container">
            <span>New help?</span>
            <div class="avatar">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%20at%2018.44.17-pEuap6m29aGxGPIbbVdTvfKI0jR9EI.png"
                alt="User avatar"
                class="avatar-img"
              />
            </div>
          </div>
        </div>

        <div class="flex-1 p-8">
          <h1 class="form-title">Tell us about yourself</h1>
          <p class="form-subtitle">
            We need to validate your information, for that we need some personal data.
          </p>

          <form class="personal-form">
            <div class="form-group">
              <label for="fullName">Name (s)</label>
              <input
                id="fullName"
                v-model="formData.fullName"
                type="text"
                placeholder="Enter your full name"
              />
            </div>

            <div class="form-group">
              <label for="firstName">First name</label>
              <input
                id="firstName"
                v-model="formData.firstName"
                type="text"
                placeholder="Enter your first name"
              />
            </div>

            <div class="form-group">
              <label for="lastName">Last name</label>
              <input
                id="lastName"
                v-model="formData.lastName"
                type="text"
                placeholder="Enter your last name"
              />
            </div>

            <div class="form-group">
              <label for="dob">Date of birth</label>
              <input
                id="dob"
                v-model="formData.dob"
                type="text"
                placeholder="MM/DD/YYYY"
                class="date-input"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="calendar-icon"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                />
                <line
                  x1="16"
                  y1="2"
                  x2="16"
                  y2="6"
                />
                <line
                  x1="8"
                  y1="2"
                  x2="8"
                  y2="6"
                />
                <line
                  x1="3"
                  y1="10"
                  x2="21"
                  y2="10"
                />
              </svg>
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="E.g. sample@email.com"
              />
            </div>

            <div class="form-group">
              <label for="income">Monthly net income</label>
              <input
                id="income"
                v-model="formData.income"
                type="text"
                placeholder="E.g. $15,000"
              />
            </div>

            <button
              type="button"
              class="next-button"
              @click="goToNextStep"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const currentStep = ref(2)
const formData = ref({
  fullName: 'Andrés Alberto',
  firstName: 'Avalos',
  lastName: 'Aguilar',
  dob: '01/01/1985',
  email: '',
  income: '',
})

const steps = computed(() => [
  {
    title: 'Loan detail',
    icon: 'document',
  },
  {
    title: 'Tell us about yourself',
    icon: 'user',
  },
  {
    title: 'Current address',
    icon: 'location',
  },
  {
    title: 'Loan authorization',
    icon: 'info',
  },
  {
    title: 'Information review',
    icon: 'document',
  },
])

const goToNextStep = () => {
  if (currentStep.value < 5) {
    currentStep.value++
  }
}
</script>

<style scoped>
.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f5f5f5;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;
}

.help-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-container {
  flex: 1;
  padding: 2rem 4rem;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
}

.form-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
}

.form-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.personal-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #4caf8a;
}

.date-input {
  padding-right: 2.5rem;
}

.calendar-icon {
  position: absolute;
  right: 1rem;
  bottom: 0.75rem;
  color: #999;
}

.next-button {
  width: 100%;
  padding: 1rem;
  background-color: #4caf8a;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
}

.next-button:hover {
  background-color: #3d9a77;
}
</style>
