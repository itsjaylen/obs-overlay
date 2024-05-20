import Moveable from "vue3-moveable";

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

    const targets = [
      {
        id: 1,
        imageUrl: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        clientX: 0,
        clientY: 0,
        scaleX: 0.9470774091627172,
        scaleY: 0.9072730261447918,
        clientRotation: 0,
        visible: true,
      },
      {
        id: 2,
        imageUrl:
          "https://cdn.vuetifyjs.com/docs/images/one/logos/vuetify-logo-dark.png",
        clientX: 0,
        clientY: 0,
        scaleX: 0.1,
        scaleY: 0.1,
        clientRotation: 0,
        visible: true,
      },
      {
        id: 3,
        imageUrl:
          "https://img.soap2day.rs/xxrz/400x400/100/68/b2/68b2f239a3a4c41ab378a534da68e4a0/68b2f239a3a4c41ab378a534da68e4a0.png",
        clientX: 0,
        clientY: 0,
        scaleX: 0.1,
        scaleY: 0.1,
        clientRotation: 0,
        visible: true,
      },
      {
        id: 4,
        imageUrl:
          "http://0.0.0.0:9191/assets/kissy.gif",
        clientX: 0,
        clientY: 0,
        scaleX: 0.1,
        scaleY: 0.1,
        clientRotation: 0,
        visible: true,
      },
    ];

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
          return ''; // or any default transformation you want to return
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
