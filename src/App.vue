<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterLink :to="{ name: 'login' }">login</RouterLink> |
  <router-view />
</template>

<style scoped></style>

<!-- <template>
  <div class="flip-card" @mouseover="isFlipped = true" @mouseleave="isFlipped = false">
    <div class="flip-card-inner" :class="{ 'is-flipped': isFlipped }">
      <div class="flip-card-front">
        <h1>Front</h1>
      </div>
      <div class="flip-card-back">
        <h1>Back</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFlipped: false,
    };
  },
};
</script>

<style scoped>
.flip-card {
  width: 200px;
  height: 200px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-card-back {
  background-color: #555;
  color: white;
  transform: rotateY(180deg);
}

.is-flipped {
  transform: rotateY(180deg);
}
</style> -->

<!-- <template>
  <div class="card" @click="isExploded = true" :class="{ 'is-exploded': isExploded }">
    <div v-for="i in 9" :key="i" class="piece">
      <h1>Click me</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExploded: false,
    };
  },
};
</script>

<style scoped>
.card {
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.piece {
  background-color: #bbb;
  color: black;
  transition: transform 1s, opacity 1s;
}

.is-exploded .piece:nth-child(1) {
  transform: translate(-50px, -50px);
  opacity: 0;
}

.is-exploded .piece:nth-child(2) {
  transform: translate(0, -50px);
  opacity: 0;
}

.is-exploded .piece:nth-child(3) {
  transform: translate(50px, -50px);
  opacity: 0;
}

.is-exploded .piece:nth-child(4) {
  transform: translate(-50px, 0);
  opacity: 0;
}

.is-exploded .piece:nth-child(6) {
  transform: translate(50px, 0);
  opacity: 0;
}

.is-exploded .piece:nth-child(7) {
  transform: translate(-50px, 50px);
  opacity: 0;
}

.is-exploded .piece:nth-child(8) {
  transform: translate(0, 50px);
  opacity: 0;
}

.is-exploded .piece:nth-child(9) {
  transform: translate(50px, 50px);
  opacity: 0;
}
</style> -->
<!-- <template>
  <div class="card" @click="isExploded = true" :class="{ 'is-exploded': isExploded }">
    <div v-for="i in 16" :key="i" class="piece">
      <h1>Click me</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExploded: false,
    };
  },
};
</script>

<style scoped>
.card {
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
}

.piece {
  background-color: #bbb;
  color: black;
  transition: transform 1s, opacity 1s;
}

.is-exploded .piece {
  transform: translateY(-100px);
  opacity: 0;
}
</style> -->
<!-- 
<template>
  <div class="card" @click="isExploded = true" :class="{ 'is-exploded': isExploded }">
    <div v-for="i in 100" :key="i" class="piece" :style="{ animationDelay: `${i * 0.05}s` }">
      <h1>Click me</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExploded: false,
    };
  },
};
</script>

<style scoped>
.card {
  width: 10px;
  height: 10px;
  display: grid;
  grid-template-columns: repeat(4, 0.5fr);
  grid-template-rows: repeat(4, 0.5fr);
}

.piece {
  background-color: #bbb;
  color: black;
}

.is-exploded .piece {
  animation: explode 1s forwards;
}

@keyframes explode {
  to {
    transform: translateY(-100px);
    opacity: 0;
  }
}
</style> -->
