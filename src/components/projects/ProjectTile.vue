<script setup>
import { ref } from "vue";

const props = defineProps({
  href: String,
  img: String,
  alt: String,
  name: String,
});

const projectLink = props.href;
const imgLink = new URL(props.img, import.meta.url).href;
const altString = props.alt;
const name = ref(props.name);
</script>

<template>
  <article
    class="project-tile flex flex-col bg-gray-200 rounded-lg p-2 justify-center w-24 md:w-40 xl:w-60 grow h-fit 2xl:p-3 shadow-md shadow-gray-400 transition-colors duration-1000 hover:duration-500 hover:bg-gray-100">
    <a class="project-link rounded-md flex h-min w-full" :href="projectLink" target="_blank">
      <img :src="imgLink" :alt="altString"
        class="aspect-auto w-full h-auto rounded-md xl:rounded-lg border-gray-200 border-solid border-2" />
    </a>

    <a class="project-link w-full h-fit text-center truncate font-display pt-1 leading-none font-semibold md:text-xl xl:text-2xl"
      :href="projectLink" target="_blank">
      {{ name }}
    </a>
  </article>
</template>
