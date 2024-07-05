<template>
  <div class="stars-container">
    <!-- Small stars -->
    <div
      class="stars"
      :style="{
        boxShadow: shadowsSmall,
        animationDuration: smallStarsDuration + 's',
      }"
    ></div>
    <!-- Medium stars -->
    <div
      class="stars"
      :style="{
        boxShadow: shadowsMedium,
        animationDuration: mediumStarsDuration + 's',
      }"
    ></div>
    <!-- Big stars -->
    <div
      class="stars"
      :style="{
        boxShadow: shadowsBig,
        animationDuration: bigStarsDuration + 's',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      smallStarsCount: 700,
      mediumStarsCount: 200,
      bigStarsCount: 100,
      smallStarsDuration: 50,
      mediumStarsDuration: 100,
      bigStarsDuration: 150,
      smallStarsColor: "white",
      mediumStarsColor: "yellow",
      bigStarsColor: "red",
      shadowsSmall: "",
      shadowsMedium: "",
      shadowsBig: "",
    };
  },
  created() {
    this.generateStarShadows();
  },
  methods: {
    generateStarShadows() {
      this.shadowsSmall = this.multipleBoxShadow(
        this.smallStarsCount,
        this.smallStarsColor
      );
      this.shadowsMedium = this.multipleBoxShadow(
        this.mediumStarsCount,
        this.mediumStarsColor
      );
      this.shadowsBig = this.multipleBoxShadow(
        this.bigStarsCount,
        this.bigStarsColor
      );
    },
    multipleBoxShadow(n, color) {
      let boxShadow = "";
      for (let i = 0; i < n; i++) {
        boxShadow += `${this.randomPosition()} ${color}`;
        if (i !== n - 1) boxShadow += ", ";
      }
      return boxShadow;
    },
    randomPosition() {
      return `${this.randomRange(2000)}px ${this.randomRange(2000)}px`;
    },
    randomRange(max) {
      return Math.floor(Math.random() * max);
    },
    updateStarCount(type, count) {
      if (type === "small") {
        this.smallStarsCount = count;
      } else if (type === "medium") {
        this.mediumStarsCount = count;
      } else if (type === "big") {
        this.bigStarsCount = count;
      }
      this.generateStarShadows();
    },
    updateStarDuration(type, duration) {
      if (type === "small") {
        this.smallStarsDuration = duration;
      } else if (type === "medium") {
        this.mediumStarsDuration = duration;
      } else if (type === "big") {
        this.bigStarsDuration = duration;
      }
    },
    updateStarColor(type, color) {
      if (type === "small") {
        this.smallStarsColor = color;
      } else if (type === "medium") {
        this.mediumStarsColor = color;
      } else if (type === "big") {
        this.bigStarsColor = color;
      }
      this.generateStarShadows();
    },
  },
};
</script>

<style scoped>
.stars-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px; 
  height: 1px;
  background: transparent;
  animation: animStar linear infinite;
}

.stars:nth-child(2) {
  width: 2px; 
  height: 2px;
}

.stars:nth-child(3) {
  width: 3px; 
  height: 3px;
}

@keyframes animStar {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-2000px);
  }
}
</style>
