<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useRouter } from 'vue-router';
import { XMarkIcon } from "@heroicons/vue/24/outline";
import {
  BuildingLibraryIcon,
  PercentBadgeIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/vue/24/outline";

const emit = defineEmits(["close"]);
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const selectedOption = ref(null);

const options = [
  {
    title: "Commodities",
    description:
      "Support to traders of essential commodities in the energy industry.",
    icon: BuildingLibraryIcon,
  },
  {
    title: "Procurement",
    description: "Supply of equipments with funding and execution capacity.",
    icon: PercentBadgeIcon,
  },
  {
    title: "Services",
    description: "Support operation, installation and maintenance contracts.",
    icon: WrenchScrewdriverIcon,
  },
];

const router = useRouter();

const closeModal = () => {
  emit("close");
  selectedOption.value = null;
};

const selectOption = (option) => {
  selectedOption.value = option;
};

const handleNext = () => {
  if (selectedOption.value === "Procurement") {
    closeModal();
    setTimeout(() => {
      router.push("/procurement/new"); // Navigate to the next route after a short delay
    }, 200); 
  }
};
</script>

<template>
  <div class="relative">
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all"
              >
                <button
                  @click="closeModal"
                  class="text-gray-400 absolute top-4 right-4 hover:text-gray-500"
                >
                  <XMarkIcon class="h-6 w-6" />
                </button>
                <div class="flex justify-center items-center mb-8">
                  <DialogTitle
                    as="h3"
                    class="text-lg font-light text-gray-900 text-center"
                  >
                    Our products were made just for you, select<br />
                    an option below to get started.
                  </DialogTitle>
                </div>

                <div class="grid special grid-cols-3 gap-4 mb-8">
                  <div
                    v-for="option in options"
                    :key="option.title"
                    :class="[
                      'p-4 rounded-lg border-2 cursor-pointer transition-all',
                      selectedOption === option.title
                        ? 'border-primary-600'
                        : 'border-gray-200 hover:border-gray-300',
                    ]"
                    @click="selectOption(option.title)"
                    class="flex flex-col items-center justify-center"
                  >
                  <div class="w-16 h-16 flex items-center justify-center rounded-full bg-[#FFF5EF] mb-3"> 
                  <component
                      :is="option.icon"
                      class="w-8 h-8 text-primary-600"
                    />
                  </div> 
                    <h4 class="font-medium text-gray-900 mb-2">
                      {{ option.title }}
                    </h4>
                    <p class="text-sm text-gray-500 text-center">
                      {{ option.description }}
                    </p>
                  </div>
                </div>

                <div class="flex justify-center">
                  <button
                    @click="handleNext"
                    class="px-4 py-2 bg-primary text-white rounded-lg  hover:bg-primary-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<style scoped>
.bg-primary-700 {
  background-color: #b91c1c;
}
.text-primary-600 {
  color: #dc2626;
}
.border-primary-600 {
  border-color: #000000;
  border-width: 2px;
}
</style>
