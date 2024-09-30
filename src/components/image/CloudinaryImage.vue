<script setup lang="ts">
  import { Cloudinary } from '@cloudinary/url-gen'
  import { autoPad } from '@cloudinary/url-gen/actions/resize'
  import { auto } from '@cloudinary/url-gen/qualifiers/background'
  import { AdvancedImage } from '@cloudinary/vue'
  import { watchEffect } from 'vue'

  const props = defineProps<{
    image: string
  }>()

  let myImg: any

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_NAME
    }
  })

  watchEffect(() => {
    myImg = cld.image(props.image)

    myImg.resize(autoPad().background(auto()))
  })
</script>

<template>
  <AdvancedImage :cld-img="myImg" />
</template>

<style></style>
