<template>
  <div class="nav">
    <ul class="nav-item">
      <!-- @mouseenter='show(i)' :class="{light:i===active}"
                    @mouseleave='active=null' -->
      <li v-for='(item,index) in options' class="one" :key="index" @click="oneClick(index)">{{item.label}}
        <!-- :class="{ on: excuseStateValue==item.name}"  :class="boxshow?'box-active':'box-no'"  :class="{'open':showtimeline}" -->
        <ul class="subitem"  :class="oneidx == index?'box-active':'box-no'">
          <!-- twoClick -->
          <li v-for='(item1,idx) in item.children' class="two" :key="idx" @click.stop="twoClick(idx)"  >
            {{item1.label}}
            <!-- :class="twoidx == idx? 'box-active2':'box-no2'" -->
            <!-- :class="{active:item.active}" -->
            <ul class="subitem1" >
              <li v-for='item2 in item1.children' v-if="item1.children && item1.children.length">
                {{item1.label}}
              </li>
            </ul>
            <div class="nav-arrow" v-if="item1.children && item1.children.length"></div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
	var _this = this;
export default {
  data() {
    return {
      oneidx: -1,
      twoidx:-1,
      boxshow: false,
      options: [
        {
          value: "guide",
          label: "Guide1",
          children: [
            {
              value: "disciplines",
              label: "Disciplines1-chaild2",
              children: [
                {
                  value: "consistency",
                  label: "Consistency-chaild3"
                },
                {
                  value: "feedback",
                  label: "Feedback-chaild3"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation-chaild2",
              children: [
                {
                  value: "side nav",
                  label: "Side Navigation-chaild3"
                },
                {
                  value: "top nav",
                  label: "Top Navigation-chaild3"
                }
              ]
            }
          ]
        },
        {
          value: "component",
          label: "Component2",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout",
                  children: [
                    {
                      value: "四级a",
                      label: "四级1"
                    },
                    {
                      value: "四级b",
                      label: "四级2"
                    }
                  ]
                },
                {
                  value: "color",
                  label: "Color"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio"
                },
                {
                  value: "checkbox",
                  label: "Checkbox"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table"
                },
                {
                  value: "tag",
                  label: "Tag"
                }
              ]
            }
          ]
        },
        {
          value: "resource",
          label: "Resource3",
          children: [
            {
              value: "axure",
              label: "Axure Components2"
            },
            {
              value: "sketch",
              label: "Sketch Templates2"
            }
          ]
        }
      ]
    };
  },
 mounted() {
    _this = this;
   },
  methods: {
    oneClick(index) {
      // this.boxshow = !this.boxshow;
 console.log("this.oneidx",this.oneidx,"aaa",index)

this.oneidx = index;


      // if (this.twoidx == index) {
      //  this.twoidx = index;
      // } 
      // else {
      //    this.twoidx = -1;
      // }


    },
    twoClick(index) {
          //this.twoidx=-1;
      // this.boxshow = !this.boxshow;
        //  console.log(" this.twoidx", this.twoidx,"erji",index)
        // this.twoidx = index;




      // if (this.twoidx == null) {
      //   this.twoidx =index;
      // } else {
      //   this.twoidx = null;
      // }


  // this.twoidx = this.twoidx == index ? -1 : index;




    },

    freeClick(){
      console.log("sanji")
    }
  }
};
</script>


<style scoped>
.nav {
  width: 1080px;
  height: 80px;
  display: flex;
  margin: 15px auto;
  justify-content: space-between;
  align-items: center;
}
.nav .nav-item {
  width: 750px;
  display: flex;
}
.nav > .nav-item > .one {
  width: 120px;
  height: 80px;
  line-height: 40px;
  padding-top: 50px;
  text-align: center;
  margin-left: 5px;
  border-bottom: 3px transparent solid;
  position: relative;
}
.nav .nav-item > li:hover {
  /* background-color: rgba(250, 235, 215, 0.559); */
}
.nav .nav-item .subitem {
  width: 120px;
  display: none;
  position: absolute;
  left: 0;
  z-index: 1000;
  color: red;
  background-color: rgba(250, 235, 215, 0.559);
}
.nav .nav-item .subitem > li {
  position: relative;
}
.subitem1 {
  width: 120px;
  position: absolute;
  top: 0;
  left: 120px;
  z-index: 1000;
  color: red;
  background-color: turquoise;
  display: none;
}
.nav .nav-item > li:hover .subitem {
  /* display: block; */
}

.box-active {
  display: block !important;
}
.box-no {
  display: none !important;
}

.box-active2 {
  display: block !important;
}
.box-no2 {
  display: none !important;
}

.nav-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px;
  border-color: transparent transparent transparent grey;
  position: absolute;
  right: 0;
  top: 15px;
}
.nav .nav-item .subitem > li:hover .subitem1 {
  display: block;
}
</style>
