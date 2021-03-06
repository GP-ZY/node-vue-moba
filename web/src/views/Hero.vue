<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-3 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="ml-3">攻略站</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>

    <div class="top" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-sm">皮肤：5 &gt;</router-link>
        </div>
      </div>
    </div>
    <!-- end of top -->
    <div>
      <div class="px-3 bg-white">
        <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
          <div class="nav-item" :class="{'active': active === 0}">
            <div class="nav-link" @click="$refs.list.$swiper.slideTo(0)">英雄初识</div>
          </div>

          <div class="nav-item" :class="{'active': active === 1}">
            <div class="nav-link" @click="$refs.list.$swiper.slideTo(1)">进阶攻略</div>
          </div>
        </div>
      </div>

      <swiper ref="list" @slide-change="() => active = $refs.list.$swiper.activeIndex">
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex">
                <router-link class="btn btn-lg flex-1" tag="button" to="/">
                  <i class="iconfont icon-menu1"></i>
                  英雄介绍视频
                </router-link>
                <router-link class="btn btn-lg flex-1 ml-2" tag="button" to="/">
                  <i class="iconfont icon-menu1"></i>
                  一图识英雄
                </router-link>
              </div>

              <!-- skills -->
              <div class="skills bg-white mt-4">
                <div class="d-flex jc-around">
                  <img
                    class="icon"
                    @click="currentSkillIndex = i"
                    :class="{ active: currentSkillIndex === i }"
                    :src="item.icon"
                    v-for="(item,i) in model.skills"
                    :key="item.name"
                  />
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-3">
                    <h3 class="m-0">{{currentSkill.name}}</h3>
                    <span
                      class="text-grey ml-4"
                    >(冷却值：{{currentSkill.delay}} 消耗：{{currentSkill.cost}})</span>
                  </div>
                  <p>{{currentSkill.description}}</p>
                  <div class="border-bottom"></div>
                  <p class="text-grey-1">小提示：{{currentSkill.tips}}</p>
                </div>
              </div>
            </div>

            <m-card plain icon="menu1" title="出装推荐" class="hero-items">
              <div class="fs-xl">顺风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" class="icon" />
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>

              <div class="border-bottom mt-3"></div>

              <div class="fs-xl mt-3">逆风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items2" :key="item.name">
                  <img :src="item.icon" class="icon" />
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
            </m-card>

            <m-card plain icon="menu1" title="使用技巧">
              <p class="m-0">{{model.usageTips}}</p>
            </m-card>

            <m-card plain icon="menu1" title="对抗技巧">
              <p class="m-0">{{model.battleTips}}</p>
            </m-card>

            <m-card plain icon="menu1" title="团战思路">
              <p class="m-0">{{model.teamTips}}</p>
            </m-card>

            <m-card plain icon="menu1" title="英雄关系">
              <div class="fs-xl">最佳搭档</div>
              <div v-for="item in model.partners" :key="item.name">
                <div class="d-flex pt-3">
                  <img :src="item.hero.avatar" height="50" />
                  <p class="flex-1 m-0 ml-3">{{item.description}}</p>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
            </m-card>
          </div>
        </swiper-slide>
        <swiper-slide>该内容未开发</swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null,
      currentSkillIndex: 0,
      active: 0
    };
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables";
.page-hero {
  .topbar {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }

  .skills {
    img.icon {
      width: 70px;
      height: 70px;
      border: 3px solid map-get($colors, "white");
      &.active {
        border-color: map-get($colors, "primary");
      }
      border-radius: 50%;
    }
  }

  .hero-items {
    img.icon {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>