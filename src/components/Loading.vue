<template>
    <div class="loading">
        <div class="loadingio-spinner-blocks-rlpng7fruc8">
            <div class="ldio-qnewwfz9k2f">
                <div v-for="(cube, index) in cubes"
                     :key="index"
                     :style="{
                         'left': cube.left + 'px',
                         'top' : cube.top + 'px',
                         'animation-delay' : cube.delay + 's',
                     }"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Loading",
    data:()=>({
        cubes: [
            {'left' : 38,  'top' : 38,  'delay' : 0},
            {'left' : 80,  'top' : 38,  'delay' : 0.125},
            {'left' : 122, 'top' : 38,  'delay' : 0.250},
            {'left' : 38,  'top' : 80,  'delay' : 0.875},
            {'left' : 122, 'top' : 80,  'delay' : 0.375},
            {'left' : 38,  'top' : 122, 'delay' : 0.75},
            {'left' : 80,  'top' : 122, 'delay' : 0.625},
            {'left' : 122, 'top' : 122, 'delay' : 0.5}
        ]
    })
}
</script>

<style scoped>

@keyframes ldio-qnewwfz9k2f {
    0%      { background: var(--link-active) }
    12.5%   { background: var(--link-active) }
    12.625% { background: var(--link) }
    100%    { background: var(--link) }
}
.ldio-qnewwfz9k2f div {
    position: absolute;
    width: 40px;
    height: 40px;
    background: var(--link);
    box-sizing: content-box;
    animation: ldio-qnewwfz9k2f 1s linear infinite;
}
.loadingio-spinner-blocks-rlpng7fruc8 {
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
    background: none;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.5, 0.5);
}
.ldio-qnewwfz9k2f {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
}

/* generated by https://loading.io/ */
</style>
