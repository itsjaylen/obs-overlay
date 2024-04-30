import Moveable from "vue3-moveable";

interface WidgetObject {
  objectName: string;
  positionX: number;
  positionY: number;
  positionZ: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  isVisible: boolean;
}

export default defineComponent({
  components: {
    Moveable,
  },
  data() {
    return {
      WidgetObjects: <WidgetObject[]>[
        {
          objectName: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
          positionX: 0,
          positionY: 0,
          positionZ: 0,
          rotation: 0,
          scaleX: 0,
          scaleY: 0,
          isVisible: true,
        },
      ],
    };
  },
  methods: {
    parseTransform(index: number, transformString: string) {
      const values = transformString.match(/-?[\d.]+/g);
      if (!values) return null;
      return {
        translateX: parseFloat(values[0]),
        translateY: parseFloat(values[1]),
        rotateAngle: parseFloat(values[2]),
        scaleX: parseFloat(values[3]),
        scaleY: parseFloat(values[4]),
      };
    },
    logTransform(parsedTransform: {
      translateX: number;
      translateY: number;
      rotateAngle: number;
      scaleX: number;
      scaleY: number;
    }) {
      console.log("Translate X:", parsedTransform.translateX, "px");
      console.log("Translate Y:", parsedTransform.translateY, "px");
      console.log("Rotate Angle:", parsedTransform.rotateAngle, "deg");
      console.log("Scale X:", parsedTransform.scaleX);
      console.log("Scale Y:", parsedTransform.scaleY);
    },
    applyTransform(transform: string, index: number) {
      const target = this.$refs["target_" + index] as HTMLElement;
      console.log("transform", transform)
      if (target) {
        target.style.transform = transform;
      }
    },

    onDrag({ transform, index }: { transform: string; index: number }) {
      const parsedTransform = this.parseTransform(index, transform);
      if (parsedTransform) {
        this.logTransform(parsedTransform);
        this.applyTransform(transform, index); // Pass the index here
      }
    },
    onScale({ drag, index }: { drag: { transform: string }; index: number }) {
      const parsedTransform = this.parseTransform(index, drag.transform);
      if (parsedTransform) {
        this.logTransform(parsedTransform);
        this.applyTransform(drag.transform, index); // Pass the index here
      }
    },
    onRotate({ drag, index }: { drag: { transform: string }; index: number }) {
      const parsedTransform = this.parseTransform(index, drag.transform);
      if (parsedTransform) {
        this.logTransform(parsedTransform);
        this.applyTransform(drag.transform, index); // Pass the index here
      }
    },
  },
});
