<template>
  <div class="typewriter">
    <h1 id="typewriter-text"></h1>
  </div>
</template>

<script>
export default {
  mounted() {
    this.texts = ["Change 1", "Change 2", "Change 3"]; // Add your texts here
    this.currentTextIndex = 0;
    this.typewriterEffect();
  },
  methods: {
    typewriterEffect() {
      const textElement = document.getElementById("typewriter-text");
      const text = this.texts[this.currentTextIndex];
      textElement.innerText = "";

      let charIndex = 0;
      const typeInterval = 100; // Adjust typing speed here (in milliseconds)

      const typeWriter = setInterval(() => {
        if (charIndex <= text.length) {
          const currentText = text.substr(0, charIndex);
          textElement.innerText = currentText;
          charIndex++;
        } else {
          clearInterval(typeWriter);
          setTimeout(() => {
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length; // Move to the next text
            this.typewriterEffect(); // Restart typewriter effect with the next text
          }, 2000); // 2 seconds delay before restarting
        }
      }, typeInterval);
    },
  },
};
</script>

<style scoped>
.typewriter h1 {
  overflow: hidden; /* Ensures the text is not revealed until typewriting */
  border-right: 0.15em solid orange; /* The typewriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that typewriter effect */
  letter-spacing: 0.15em; /* Adjust as needed */
  animation: blink-caret 0.75s step-end infinite;
}

/* The typewriter cursor blinking effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: rgb(81, 11, 196);
  }
}
</style>
