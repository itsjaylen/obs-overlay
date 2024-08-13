interface DebugManager {
    mode: boolean;
    enable: () => void;
    disable: () => void;
  }
  
  const createDebug: DebugManager = (() => {
    let debugMode = false;
  
    return {
      get mode() {
        return debugMode;
      },
      enable() {
        debugMode = true;
        console.log("Debug changed to: true");
      },
      disable() {
        debugMode = false;
        console.log("Debug changed to: false");
      },
    };
  })();
  
  export default createDebug;
  