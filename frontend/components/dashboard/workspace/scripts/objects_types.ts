// Define an interface for ImageObject data
export interface ImageObjectData {
  __key?: string;
  clientrotation?: number;
  clientx?: number;
  clienty?: number;
  draggable?: boolean;
  edgedraggable?: boolean;
  id?: string;
  keepratio?: boolean;
  renderdirections?: string[];
  rotatable?: boolean;
  rotationposition?: number;
  scalable?: boolean;
  scalex?: number;
  scaley?: number;
  startdragrotate?: number;
  throttledrag?: number;
  throttledragrotate?: number;
  throttlerotate?: number;
  throttlescale?: number;
  type_?: string;
  visible?: boolean;
}

// Define the ImageObject class
export class ImageObject {
  __key: string;
  clientrotation: number;
  clientx: number;
  clienty: number;
  draggable: boolean;
  edgedraggable: boolean;
  id: string;
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
    this.__key = data.__key || "";
    this.clientrotation = Number(data.clientrotation) || 0;
    this.clientx = Number(data.clientx) || 0;
    this.clienty = Number(data.clienty) || 0;
    this.draggable = Boolean(data.draggable);
    this.edgedraggable = Boolean(data.edgedraggable);
    this.id = data.id || "";
    this.keepratio = Boolean(data.keepratio);
    this.renderdirections = Array.isArray(data.renderdirections)
      ? data.renderdirections
      : [];
    this.rotatable = Boolean(data.rotatable);
    this.rotationposition = Number(data.rotationposition) || 0;
    this.scalable = Boolean(data.scalable);
    this.scalex = Number(data.scalex) || 1;
    this.scaley = Number(data.scaley) || 1;
    this.startdragrotate = Number(data.startdragrotate) || 0;
    this.throttledrag = Number(data.throttledrag) || 0;
    this.throttledragrotate = Number(data.throttledragrotate) || 0;
    this.throttlerotate = Number(data.throttlerotate) || 0;
    this.throttlescale = Number(data.throttlescale) || 0;
    this.type_ = data.type_ || "";
    this.visible = Boolean(data.visible);
  }
}
