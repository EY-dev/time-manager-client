<template>
    <div class="anim-block"/>
</template>

<script>
export default {
    name: "AnimBlock"
}
</script>

<style scoped>
.anim-block{
    position: fixed;
    width: 100%;
    height: calc(100% - 50px);
    clip-path: circle(0% at 100% 0);
    //background:var(--btn-primary);
    background-color: var(--main-background);
    transition: all 1.0s ease;
    z-index: 3;
}
.anim-block-active{
    clip-path: circle(200% at 100% 0)!important;
}

</style>
