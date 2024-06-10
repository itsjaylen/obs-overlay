import Moveable from "vue3-moveable";

class ImageObject {
  __key: string;
  clientrotation: number;
  clientx: number;
  clienty: number;
  draggable: boolean;
  edgedraggable: boolean;
  id: number;
  keepratio: boolean;
  renderdirections: string[];
  rotatable: boolean;
  rotationposition: number;
  scalable: boolean;
  scalex: number;
  scaley: number;
  startdragrotate: number;
  throttledrag: number;
  throttledragrotate: number;
  throttlerotate: number;
  throttlescale: number;
  type_: string;
  visible: boolean;

  constructor(data: any) {
    this.__key = data.__key || "";
    this.clientrotation = parseFloat(data.clientrotation) || 0;
    this.clientx = parseFloat(data.clientx) || 0;
    this.clienty = parseFloat(data.clienty) || 0;
    this.draggable = data.draggable === "true";
    this.edgedraggable = data.edgedraggable === "true";
    this.id = parseInt(data.id) || 0;
    this.keepratio = data.keepratio === "true";
    this.renderdirections = data.renderdirections || [];
    this.rotatable = data.rotatable === true || data.rotatable === "true";
    this.rotationposition = parseFloat(data.rotationposition) || 0;
    this.scalable = data.scalable === true || data.scalable === "true";
    this.scalex = parseFloat(data.scalex) || 1;
    this.scaley = parseFloat(data.scaley) || 1;
    this.startdragrotate = parseFloat(data.startdragrotate) || 0;
    this.throttledrag = parseFloat(data.throttledrag) || 0;
    this.throttledragrotate = parseFloat(data.throttledragrotate) || 0;
    this.throttlerotate = parseFloat(data.throttlerotate) || 0;
    this.throttlescale = parseFloat(data.throttlescale) || 0;
    this.type_ = data.type_ || "";
    this.visible = data.visible === true || data.visible === "true";
  }
}

export default {
  components: { Moveable },
  setup() {
    const draggable = true;
    const throttleDrag = 1;
    const edgeDraggable = false;
    const startDragRotate = 0;
    const throttleDragRotate = 0;
    const scalable = true;
    const keepRatio = false;
    const throttleScale = 0;
    const renderDirections = ["nw", "n", "ne", "w", "e", "sw", "s", "se"];
    const rotatable = true;
    const throttleRotate = 0;
    const rotationPosition = "top";

    let targets: any[] = [];

    const generateTargets = (data: any[]) => {
      targets = data.map((item, index) => ({
        id: index + 1,
        imageUrl: item.imageUrl,
        clientX: item.clientX || 0,
        clientY: item.clientY || 0,
        scaleX: item.scaleX || 0.1,
        scaleY: item.scaleY || 0.1,
        clientRotation: item.clientRotation || 0,
        visible: true,
      }));
    };

    // Initial data to generate targets
    const initialData = [
      {
        imageUrl: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        clientX: 0,
        clientY: 0,
        scaleX: 0.9470774091627172,
        scaleY: 0.9072730261447918,
        clientRotation: 0,
      },
      {
        imageUrl:
          "https://cdn.vuetifyjs.com/docs/images/one/logos/vuetify-logo-dark.png",
        clientX: 0,
        clientY: 0,
        scaleX: 0.1,
        scaleY: 0.1,
        clientRotation: 0,
      },
      {
        imageUrl:
          "https://fmoviesz.to/assets/sites/fmovies/logo.png",
        clientX: 0,
        clientY: 0,
        scaleX: 0.1,
        scaleY: 0.1,
        clientRotation: 0,
      },
      {
        imageUrl: "http://0.0.0.0:9191/assets/screenshot.png",
        clientX: 0,
        clientY: 0,
        scaleX: 0.1,
        scaleY: 0.1,
        clientRotation: 0,
      },
    ];

    

// Function to initialize targets from local storage
const initializeTargetsFromLocalStorage = () => {
  if (typeof localStorage !== 'undefined') {
    const storedResultString = localStorage.getItem(
      "fetchObjectsResultObject"
    );
    if (storedResultString) {
      const storedResultObjects = JSON.parse(storedResultString);
      const targetData = storedResultObjects.map((item: any) => {
        const imageObject = new ImageObject(item);
        return {
          id: imageObject.id,
          imageUrl: `http://0.0.0.0:9191/assets/${imageObject.__key}`,
          clientX: 0,
          clientY: 0,
          scaleX: 0.1,
          scaleY: 0.1,
          clientRotation: 0,
          visible: true,
        };
      });
      generateTargets(targetData);
    } else {
      console.log("No data found in localStorage");
    }
  } else {
    console.log("localStorage is not available.");
  }
};

// Call the function to initialize targets from local storage
initializeTargetsFromLocalStorage();
// generateTargets(initialData);

    const onDrag = (event: {
      target: { style: { transform: any } };
      transform: any;
    }) => {
      const parsedEvent = parseObject(event);
      const secondClass = parsedEvent.target.classList.item(3);
      console.log("Class:", secondClass);
      console.log("ClientX:", parsedEvent.clientX);
      console.log("ClientY", parsedEvent.clientY);
      event.target.style.transform = event.transform;

      const targetIndex =
        parseInt(secondClass.replace("target", "").trim()) - 1;
      targets[targetIndex].clientX = parsedEvent.clientX;
      targets[targetIndex].clientY = parsedEvent.clientY;
    };

    const onScale = (event: {
      target: { style: { transform: any } };
      drag: { transform: any };
    }) => {
      const parsedEvent = parseObject(event);
      const [scaleX, scaleY] = parsedEvent.scale;
      console.log("Scale X:", scaleX);
      console.log("Scale Y:", scaleY);

      event.target.style.transform = event.drag.transform;
    };

    const onRotate = (event: {
      target: { style: { transform: any } };
      drag: { transform: any };
    }) => {
      const parsedEvent = parseObject(event);
      const secondClass = parsedEvent.target.classList.item(3);
      console.log("Class:", secondClass);
      console.log("Rotation", parsedEvent.rotation);
      event.target.style.transform = event.drag.transform;

      const targetIndex =
        parseInt(secondClass.replace("target", "").trim()) - 1;
      targets[targetIndex].clientRotation = parsedEvent.rotation;
    };

    function parseObject(obj: {
      target: any;
      transform?: any;
      drag?: any;
      offsetWidth?: any;
      offsetHeight?: any;
      direction?: any;
      scale?: any;
      dist?: any;
      delta?: any;
      isPinch?: any;
      style?: any;
      translate?: any;
      beforeDist?: any;
      beforeDelta?: any;
      beforeTranslate?: any;
      left?: any;
      top?: any;
      right?: any;
      bottom?: any;
      clientX?: any;
      clientY?: any;
      eventType?: any;
      height?: any;
      isFirstDrag?: any;
      isRequest?: any;
      isRequestChild?: any;
      isTrusted?: any;
      moveable?: any;
      stop?: any;
      stopAble?: any;
      stopDrag?: any;
      width?: any;
      rotate?: any;
      rotation?: any;
    }) {
      const parsedObject = {
        offsetWidth: obj.offsetWidth,
        offsetHeight: obj.offsetHeight,
        direction: obj.direction,
        scale: obj.scale,
        dist: obj.dist,
        delta: obj.delta,
        isPinch: obj.isPinch,
        transform: obj.transform,
        drag: obj.drag,
        style: obj.style,
        translate: obj.translate,
        beforeDist: obj.beforeDist,
        beforeDelta: obj.beforeDelta,
        beforeTranslate: obj.beforeTranslate,
        left: obj.left,
        top: obj.top,
        right: obj.right,
        bottom: obj.bottom,
        clientX: obj.clientX,
        clientY: obj.clientY,
        eventType: obj.eventType,
        height: obj.height,
        isFirstDrag: obj.isFirstDrag,
        isRequest: obj.isRequest,
        isRequestChild: obj.isRequestChild,
        isTrusted: obj.isTrusted,
        moveable: obj.moveable,
        stop: obj.stop,
        stopAble: obj.stopAble,
        stopDrag: obj.stopDrag,
        target: obj.target,
        width: obj.width,
        rotate: obj.rotate,
        rotation: obj.rotation,
      };

      return parsedObject;
    }

    // Function to get the transform style for a target
    const getTargetTransform = (id: number) => {
      const target = targets.find((t) => t.id === id);
      if (!target) {
        // Handle the case where target is not found, for example:
        return ""; // or any default transformation you want to return
      }
      return `translate(${target.clientX}px, ${target.clientY}px) rotate(${target.clientRotation}deg) scale(${target.scaleX}, ${target.scaleY})`;
    };

    return {
      draggable,
      throttleDrag,
      edgeDraggable,
      startDragRotate,
      throttleDragRotate,
      scalable,
      keepRatio,
      throttleScale,
      renderDirections,
      rotatable,
      throttleRotate,
      rotationPosition,
      targets,
      onDrag,
      onScale,
      onRotate,
      getTargetTransform,
    };
  },
};
