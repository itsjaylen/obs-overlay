<template>
  <div id="twitch-embed">
    <TwitchPlayer channelName="agent00" />
  </div>

  <div id="nav-drawer">
    <v-app>
      <NavigationDrawer />
    </v-app>
  </div>

  <OverlayWorkspace />
</template>

<script>
import TwitchPlayer from "~/components/embeds/TwitchEmbed.vue";
import NavigationDrawer from "~/components/dashboard/NavigationDrawer.vue";
import OverlayWorkspace from "~/components/dashboard/OverlayWorkspace.vue";
export default {
  components: {
    TwitchPlayer,
    NavigationDrawer,
    OverlayWorkspace,
  },
};
</script>
