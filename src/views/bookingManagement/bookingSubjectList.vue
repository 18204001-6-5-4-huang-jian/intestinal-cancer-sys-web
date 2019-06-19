<template>
    <div class="subject-list-container" v-if="bookingSubjectList_page">
        
    </div>
</template>
<script>
export default {
    data(){
        this.$router.go(-1);
        return{
             bookingSubjectList_page:false,
             btnAuth:{

             }
        }
    },
    mounted() {
        let obj = this.checkPageAuth(this, "bookingSubjectList_page", this.btnAuth);
    },
}
</script>
<style lang="scss" scoped>
    
</style>
