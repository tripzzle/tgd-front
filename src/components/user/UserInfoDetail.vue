<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  titleOr: {
    type: String
  },
  title: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
});

const upVal = ref();

const emit = defineEmits(["updateInput"]);

const handleChangeValue = () => {
  emit("updateInput", props.titleOr, upVal.value);
}
</script>

<template>
  <div >
    <div v-if="title !== '생년월일' && title !== '성별'" >
      <a-form-item :label="props.title" >
        <a-input v-if="props.value !== null" :value="props.value"  />
        <a-input v-else v-model="upVal" @input="handleChangeValue"/>
      </a-form-item>
    </div>
    <div v-else-if="title === '생년월일'">
      <a-form-item :label="props.title" >
        <a-date-picker v-if="props.value !== null" :value="props.value"  />
        <a-date-picker v-else v-model="upVal" @input="handleChangeValue"/>
      </a-form-item>
    </div>
    <div v-else-if="title === '성별'">
      <a-form-item :label="props.title">
        <a-radio-group v-model:value="upVal" @input="handleChangeValue">
          <a-radio value="1">남</a-radio>
          <a-radio value="2">여</a-radio>
        </a-radio-group>
      </a-form-item>
    </div>
  </div>
</template>

<style scoped>

</style>
