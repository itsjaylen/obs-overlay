export function parseTransform(transform: string) {
    const rotationMatch = RegExp(/rotate\(([^)]+)deg\)/).exec(transform);
    const translationMatch = RegExp(/translate\(([^)]+)\)/).exec(transform);
    const scaleMatch = RegExp(/scale\(([^)]+)\)/).exec(transform);
  
    let rotationDeg: string | null = null;
    let translateX: string | null = null;
    let translateY: string | null = null;
    let scaleX: string | null = null;
    let scaleY: string | null = null;
  
    if (rotationMatch) {
      rotationDeg = rotationMatch[1];
    }
  
    if (translationMatch) {
      const translateValues = translationMatch[1].split(',');
      if (translateValues.length === 2) {
        translateX = translateValues[0].trim();
        translateY = translateValues[1].trim();
      }
    }
  
    if (scaleMatch) {
      const scaleValues = scaleMatch[1].split(',');
      if (scaleValues.length === 2) {
        scaleX = scaleValues[0].trim();
        scaleY = scaleValues[1].trim();
      }
    }
  
    return {
      rotationDeg,
      translateX,
      translateY,
      scaleX,
      scaleY,
    };
  }
  