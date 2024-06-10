<template>
    <div class="root">
        <div class="container">
            <button @click="onClick">Random Resize</button>
            <button @click="addTarget">Add Target</button>
            <!-- Hardcoded targets -->
            <div v-for="(target, index) in initialTargets" :key="`hardcoded-${index}`" :class="`target target${index}`">{{ target.name }}</div>
            <!-- Dynamically added targets -->
            <div v-for="(target, index) in targets" :key="`dynamic-${index}`" :class="`target dynamic-target${index}`">{{ `Dynamic Target ${index + 1}` }}</div>
            <!-- Moveable components for hardcoded targets -->
            <Moveable
                v-for="(target, index) in initialTargets"
                :key="'moveable-hardcoded-' + index"
                :target="`.target${index}`"
                :individualGroupable="true"
                :draggable="true"
                :rotatable="true"
                :resizable="true"
                :useResizeObserver="true"
                @drag="onDrag"
                @resize="onResize"
                @rotate="onRotate"/>
            <!-- Moveable components for dynamically added targets -->
            <Moveable
                v-for="(target, index) in targets"
                :key="'moveable-dynamic-' + index"
                :target="`.dynamic-target${index}`"
                :individualGroupable="true"
                :draggable="true"
                :rotatable="true"
                :resizable="true"
                :useResizeObserver="true"
                @drag="onDrag"
                @resize="onResize"
                @rotate="onRotate"/>
        </div>
    </div>
</template>

<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const initialTargets = ref([
            { name: 'Hardcoded Target 1' },
            { name: 'Hardcoded Target 2' },
            { name: 'Hardcoded Target 3' },
        ]);

        const targets = ref([]); // For dynamically added targets

        const onClick = () => {
            const allTargets = [...document.querySelectorAll(".target")];
            const randomTarget = allTargets[Math.floor(Math.random() * allTargets.length)];
            const width = 50 + Math.floor(50 * Math.random());
            const height = 50 + Math.floor(50 * Math.random());
            randomTarget.style.cssText += `width: ${width}px;height: ${height}px`;
        };

        const onDrag = e => {
            e.target.style.transform = e.transform;
        };

        const onResize = e => {
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
            e.target.style.transform = e.drag.transform;
        };

        const onRotate = e => {
            e.target.style.transform = e.drag.transform;
        };

        const addTarget = () => {
            targets.value.push({});
        };

        return { onClick, onDrag, onResize, onRotate, addTarget, initialTargets, targets };
    }
};
</script>

<style scoped>
.root {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #000;
}

.target {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    cursor: move;
}

button {
    margin: 10px;
}
</style>
