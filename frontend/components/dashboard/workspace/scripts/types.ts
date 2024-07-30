export interface Target {
  id: number;
  name: string;
  clientrotation: number;
  scaleX: number;
  scaleY: number;
  image: string;
  draggable?: boolean;
  throttleDrag?: number;
  edgeDraggable?: boolean;
  startDragRotate?: number;
  throttleDragRotate?: number;
  scalable?: boolean;
  keepRatio?: boolean;
  throttleScale?: number;
  renderDirections?: string[];
  rotatable?: boolean;
  throttleRotate?: number;
  rotationPosition?: "top" | "bottom" | "left" | "right";
}

export interface ImageObjectData {
  __key?: string;
  clientrotation?: string;
  clientx?: string;
  clienty?: string;
  draggable?: string;
  edgedraggable?: string;
  id?: string;
  keepratio?: string;
  renderdirections?: string[];
  rotatable?: string;
  rotationposition?: string;
  scalable?: string;
  scalex?: string;
  scaley?: string;
  startdragrotate?: string;
  throttledrag?: string;
  throttledragrotate?: string;
  throttlerotate?: string;
  throttlescale?: string;
  type_?: string;
  visible?: string;
}

export class ImageObject {
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

  constructor(data: ImageObjectData) {
    this.__key = data.__key ?? "";
    this.clientrotation = parseFloat(data.clientrotation ?? "0");
    this.clientx = parseFloat(data.clientx ?? "0");
    this.clienty = parseFloat(data.clienty ?? "0");
    this.draggable = data.draggable === "true";
    this.edgedraggable = data.edgedraggable === "true";
    this.id = parseInt(data.id ?? "0");
    this.keepratio = data.keepratio === "true";
    this.renderdirections = data.renderdirections || [];
    this.rotatable = data.rotatable === "true";
    this.rotationposition = parseFloat(data.rotationposition ?? "0");
    this.scalable = data.scalable === "true";
    this.scalex = parseFloat(data.scalex ?? "1");
    this.scaley = parseFloat(data.scaley ?? "1");
    this.startdragrotate = parseFloat(data.startdragrotate ?? "0");
    this.throttledrag = parseFloat(data.throttledrag ?? "0");
    this.throttledragrotate = parseFloat(data.throttledragrotate ?? "0");
    this.throttlerotate = parseFloat(data.throttlerotate ?? "0");
    this.throttlescale = parseFloat(data.throttlescale ?? "0");
    this.type_ = data.type_ ?? "";
    this.visible = data.visible === "true";
  }
}
