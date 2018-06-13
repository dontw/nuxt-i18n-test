<template>
    <div class="img-back">
        <img src="imgUrl" alt="image">
    </div>
</template>
<script>
export default {
    props:{
        imgUrl:{
            type: String,
            default: 'http://www.dailydogmemes.com/thicker-doge.jpg'
        }
    }
}
</script>

<style lang="scss" scoped>
.img-back {
    width: 100%;
    height: 100%;
}
</style>

