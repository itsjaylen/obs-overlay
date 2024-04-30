<script>
export default {
  props: {
    channelName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const channel = ref(props.channelName);

    const loadScript = () => {
      const script = document.createElement("script");
      script.src = "https://embed.twitch.tv/embed/v1.js";
      document.body.appendChild(script);

      return new Promise((resolve) => (script.onload = resolve));
    };

    const createTwitchEmbed = async () => {
      await loadScript();
      const embed = new window.Twitch.Embed("twitch-embed", {
        width: 1920 / 2,
        height: 1080 / 2,
        allowfullscreen: true,
        autoplay: true,
        layout: "video",
        channel: channel.value,
        muted: false,
        // Add parent key if needed
      });
    };

    createTwitchEmbed();

    return {
      channel,
    };
  },
};
</script>

<style>
#twitch-embed {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: 50%;
}
</style>
