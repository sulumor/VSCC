<script setup lang="ts">
  import { Cloudinary } from '@cloudinary/url-gen'
  import { format, quality } from '@cloudinary/url-gen/actions/delivery'
  import { fill } from '@cloudinary/url-gen/actions/resize'
  import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format'
  import { auto } from '@cloudinary/url-gen/qualifiers/quality'
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

    myImg.resize(fill().height(128)).delivery(quality(auto())).delivery(format(autoFormat()))
  })
</script>

<template>
  <AdvancedImage :cld-img="myImg" />
</template>

<style></style>
