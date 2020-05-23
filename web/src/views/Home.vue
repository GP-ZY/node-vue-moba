<template>
  <div class="home">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/761f7572f0ecf8a193bfed42efa4c624.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/f5f862d4a9e84e9a59e8768efc1cdbdc.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/c39560c6914a8f5cc2dbe5b7917af022.jpeg" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="(item, i) in detailsName" :key="i">
          <i :class="item.iconType"></i>
          <div class="py-2">{{item.name}}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroesCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" />
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <m-card icon="menu1" title="精彩视频"></m-card>
    <m-card icon="menu1" title="图文攻略"></m-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        },
        autoplay: true,
        loop: true
      },
      detailsName: [
        {
          name: "爆料站",
          iconType: "sprite sprite-news"
        },
        {
          name: "故事站",
          iconType: "sprite sprite-story"
        },
        {
          name: "周边商城",
          iconType: "sprite sprite-shop"
        },
        {
          name: "体验服",
          iconType: "sprite sprite-experience"
        },
        {
          name: "新人专区",
          iconType: "sprite sprite-newGuys"
        },
        {
          name: "荣耀·传承",
          iconType: "sprite sprite-honorExtend"
        },
        {
          name: "模拟战资料库",
          iconType: "sprite sprite-simulate"
        },
        {
          name: "王者营地",
          iconType: "sprite sprite-playerZone"
        },
        {
          name: "公众号",
          iconType: "sprite sprite-weChat"
        },
        {
          name: "版本介绍",
          iconType: "sprite sprite-version"
        }
      ],
      newsCats: [],
      heroesCats: []
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroesCats() {
      const res = await this.$http.get("heroes/list");
      this.heroesCats = res.data;
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroesCats();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background-color: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>