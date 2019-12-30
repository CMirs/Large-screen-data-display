<template>
    <div class="data-carousel" ref="dataCarousel">
        <div class="ceshi">{{ceshi}}</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
          
        }
    },
    props:{
          ceshi:{
                type:'string',
                default:4545
            }
    },
    mounted(){

    },
    methods:{

    }
}
</script>
<style  scoped>
    .data-carousel{
        width: 100%;
        height: 100%
    }
</style>