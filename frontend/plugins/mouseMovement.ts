// plugins/mouseMovement.ts
export default defineNuxtPlugin((nuxtApp) => {
    const shouldRunPlugin = (routePath: string): boolean => {
      const ignoredPaths = ['/ignored-page', '/another-ignored-page'];
      return !ignoredPaths.includes(routePath);
    };
  
    nuxtApp.hook('app:mounted', () => {
      const routePath = useRouter().currentRoute.value.path;
  
      if (shouldRunPlugin(routePath)) {
        const handleMouseMove = (event: MouseEvent) => {
          const cursorLight = document.getElementById('cursorLight');
          if (cursorLight) {
            cursorLight.style.left = `${event.pageX}px`;
            cursorLight.style.top = `${event.pageY}px`;
          }
        };
  
        document.addEventListener('mousemove', handleMouseMove);

      }
    });
  });
  