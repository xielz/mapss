<template>
  <div class="index">

    <div class="lf">
      <view class="termitem">
        <div class="item" :class="{ on: currentIndex === index }" v-for="(item, index) in stateList" :key="index" @click="stateClick(index)">{{ item}}
        </div>
      </view>

      <div class="task">
        <div class="taskitem">
          <span class="txt" :class="{ current: taskIssueCurrentIndex === index }" v-for="(item, index) in taskIssueStateList" :key="index" @click="taskIssueStateClick(index)">
            {{ item}}</span>
        </div>
        <div id="taskIssueChart" class="taskchart"></div>
      </div>

      <div class="task">
        <div class="taskitem">
          <span class="txt current">转发任务</span>
          <span class="txt "></span>
        </div>
        <div id="transmitChart" class="taskchart"></div>
      </div>

      <div class="task">
        <!-- <div class="taskitem">
          <span class="txt on">完成情况</span>
          <span class="txt ">效率Top10</span>
          <span class="txt ">优秀Top10</span>
        </div> -->

        <div class="taskitem">
          <span class="txt" :class="{ current: taskProgressCurrentIndex === index }" v-for="(item, index) in taskProgressStateList" :key="index" @click="taskProgressStateClick(index)">
            {{ item}}</span>
        </div>
        <div class="taskprogress taskprogresschart">
           <div id="taskProgressChart" class="progress "></div>
          <!-- <div class="progress" v-for="(item, index) in progressList" :key="index">
            <div class="txt">{{item.name}}</div>
            <el-progress :text-inside="true" :stroke-width="14" :percentage="item.completeNum" color="#666EE8" :duration="10" :format="setItemText(item)" />
            <div class="txtnum">{{Math.round((item.completeNum/item.planNum)*100)+'%'}}</div>
          </div> -->
        </div>
      </div>

    </div>
    <div class="center">

      <div class="title">
        <div class="tiplf"> </div>
        <h1>安云职业大学任务执行数据中心</h1>
        <div class="tiprg"> </div>
      </div>

      <div class="ball"><img src="../../static/images/ball.png" class="imgs" /> </div>
      <div class="taskchart tradarChart">
        <div id="tradarChart" class="chart taskchart"></div>
      </div>

    </div>
    <div class="rg">
      <!-- @click="toggleFullScreen" -->
      <div class="taskuser">
        <div class="item" @click="toggleFullScreen">
          <el-tooltip effect="dark" :content="isFullScreen ? '退出全屏':'全屏'" placement="bottom">
            <i :class="isFullScreen ? 'screen':'aim'" class="isfullico"></i>
          </el-tooltip>
        </div>

        <div class="item" @click="exit">
          <i class="isfullico exitico"></i>
          <span>退出</span>
        </div>
      </div>

      <div class="task">
        <div class="taskitem">
          <span class="txt" :class="{ current: totalityCurrentIndex === index }" v-for="(item, index) in totalityStateList" :key="index" @click="totalityStateClick(index)">
            {{ item}}</span>
        </div>

        <div class="taskchart totality">
          <div id="totalityChart" class="totalitychart"></div>
        </div>
      </div>

      <div class="task">
        <!-- <div class="taskitem">
          <span class="txt on">任务分类</span>
          <span class="txt ">指标分类</span>
        </div> -->

        <div class="taskitem">
          <span class="txt" :class="{ current: classifyCurrentIndex === index }" v-for="(item, index) in classifyStateList" :key="index" @click="classifyStateClick(index)">
            {{ item}}</span>
        </div>
        <div id="classifyChart" class="taskchart"></div>
      </div>

      <div class="task">
        <!-- <div class="taskitem">
          <span class="txt on">佐证材料</span>
          <span class="txt ">指标分类</span>
        </div> -->
        <div class="taskitem">
          <span class="txt" :class="{ current: evidenceCurrentIndex === index }" v-for="(item, index) in evidenceStateList" :key="index" @click="evidenceStateClick(index)">
            {{ item}}</span>
        </div>
        <div id="evidenceChart" class="taskchart"></div>
      </div>

    </div>

    <!-- <div id="myChart" :style="{ width: '300px', height: '300px' }"></div> -->

  </div>

</template>
<script>
    export default {
        data() {
            return {
                isFullScreen: false, //全屏开关
                currentIndex: 0,
                stateList: ["本月", "本学期", "本学年"],

                taskIssueStateList: ["任务发布", "任务列表"],
                taskIssueCurrentIndex: 0,

                taskProgressStateList: ["完成情况", "效率Top10", "优秀Top10"],
                taskProgressCurrentIndex: 0,

                totalityStateList: ["总体情况", "超时任务"],
                totalityCurrentIndex: 0,
                classifyStateList: ["任务分类", "指标分类"],
                classifyCurrentIndex: 0,
                evidenceStateList: ["佐证材料", "指标分类"],
                evidenceCurrentIndex: 0,

                option: {},
                progressList: [{
                        name: "土建学院1",
                        planNum: 100,
                        completeNum: 20
                    },
                    {
                        name: "土建学院2",
                        planNum: 100,
                        completeNum: 40
                    },
                    {
                        name: "土建学院3",
                        planNum: 100,
                        completeNum: 30
                    },
                    {
                        name: "土建学院4",
                        planNum: 100,
                        completeNum: 10
                    },
                    {
                        name: "土建学院5",
                        planNum: 100,
                        completeNum: 30
                    }
                ]
            };
        },
        mounted() {
            this.examineFullScreen(); //检查是否支持全屏
            this.taskIssueChart();
            this.transmitChart();
            this.taskProgressChart();
            this.tradarChart();
            this.totalityChart();
            this.classifyChart();
            this.evidenceChart();
        },
        methods: {
            stateClick(index) {
                this.currentIndex = index;
                console.log("idnexddd", index);

                if (index == 0) {
                    // _this.chargeList = [];
                    // _this.skipCount = 1;
                    // _this.currentIndex = index;
                    // _this.getCharge();
                } else {
                    // _this.forwarList = [];
                    // _this.skipCount = 1;
                    // _this.currentIndex = index;
                    // _this.getTaskForwar();
                }
            },

            taskIssueStateClick(index) {
                console.log("1111", index);
                this.taskIssueCurrentIndex = index;
            },
            taskProgressStateClick(index) {
                console.log("1111", index);
                this.taskProgressCurrentIndex = index;
            },
            totalityStateClick(index) {
                console.log("1111", index);
                this.totalityCurrentIndex = index;
            },
            classifyStateClick(index) {
                console.log("1111", index);
                this.classifyCurrentIndex = index;
            },
            evidenceStateClick(index) {
                console.log("1111", index);
                this.evidenceCurrentIndex = index;
            },

            taskIssueChart() {
                const chart = this.$echarts.init(document.getElementById("taskIssueChart"));
                // 监听屏幕变化自动缩放图表
                window.addEventListener("resize", function() {
                    chart.resize();
                });
                chart.setOption({
                    color: [{
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: "#2FD0D2" }, // 设置颜色渐变
                            { offset: 1, color: "#2FACD9" }
                        ]
                    }],
                    tooltip: {
                        backgroundColor: "rgba(0, 0, 0, 0.7)", //设置背景颜色
                        textStyle: {
                            color: "white" //设置文字颜色
                        },
                        borderWidth: "0",
                        trigger: "item",
                        axisPointer: {
                            // Use axis to trigger tooltip
                            type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
                        }
                    },

                    grid: {
                        top: 15,
                        left: 10,
                        right: 12,
                        bottom: 12,
                        containLabel: true
                        //          width:'100%', // grid 组件的宽度。默认自适应。
                        // height:'90%',
                    },
                    xAxis: {
                        type: "category",
                        splitLine: { show: false },
                        //网格显示
                        axisTick: {
                            //X轴刻度线
                            show: false
                        },

                        // x轴底部一条线颜色
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 0.7,
                                color: "#FFFFFF"
                            }
                        },

                        axisLabel: {
                            //y轴数字
                            show: true,
                            textStyle: {
                                show: true,

                                color: "#FFFFFF"
                            }
                        },

                        data: ["1月", "2月", "3月", "4月", "5月", "6月"]
                    },
                    yAxis: {
                        type: "value",

                        axisLabel: {
                            //y轴数字
                            show: true,
                            textStyle: {
                                show: true,

                                color: "#FFFFFF"
                            }
                        },

                        //y轴一条线颜色
                        axisLine: {
                            lineStyle: {
                                color: "#FFFFFF",
                                width: 0.8
                                // "type": "dashed"
                            },
                            show: true
                        },
                        // // x轴多条横线颜色
                        splitLine: {
                            show: false
                        }
                    },
                    series: [{
                            name: "数据",
                            type: "bar",
                            stack: "Total",
                            barWidth: 22, //柱状图宽度
                            itemStyle: {
                                borderColor: "transparent",
                                color: "transparent"
                            },
                            emphasis: {
                                itemStyle: {
                                    borderColor: "transparent",
                                    color: "transparent"
                                }
                            },
                            // data: [2900, 1200, 300, 200, 900, 300]
                            data: [0, 1700, 1400, 1200, 300, 0]
                        },
                        {
                            name: "数据",
                            type: "bar",
                            stack: "Total",
                            label: {
                                show: true,
                                position: "inside"
                            },
                            barWidth: 28, //柱状图宽度
                            itemStyle: {
                                //柱状图上方显示数值
                                normal: {
                                    label: {
                                        show: false, //开启显示
                                        position: "inside",
                                        textStyle: {
                                            //数值样式
                                            color: "#FFFFFF",
                                            fontSize: 14
                                        }
                                    }
                                }
                            },
                            data: [2900, 1200, 300, 200, 900, 300]
                        }
                    ]
                });
            },
            transmitChart() {
                const chart = this.$echarts.init(document.getElementById("transmitChart"));
                // 监听屏幕变化自动缩放图表
                window.addEventListener("resize", function() {
                    chart.resize();
                });
                chart.setOption({
                    color: ["#6699FF", "#33CC99"],

                    tooltip: {
                        backgroundColor: "rgba(0, 0, 0, 0.7)", //设置背景颜色
                        textStyle: {
                            color: "white" //设置文字颜色
                        },
                        borderWidth: "0",
                        trigger: "item",
                        axisPointer: {
                            // Use axis to trigger tooltip
                            type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
                        }
                    },

                    legend: {
                        itemHeight: 10,
                        itemWidth: 18,
                        //orient: 'vertical',
                        right: 25,
                        top: 5,
                        // 			bottom: 30,
                        // left: 'left',
                        textStyle: {
                            //图例文字的样式
                            color: "#4C6EB8",
                            fontSize: 14
                        }
                    },
                    grid: {
                        top: 30,
                        left: 10,
                        right: 20,
                        bottom: 12,
                        containLabel: true
                    },
                    xAxis: {
                        type: "value",
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ["#2E4162"],
                                width: 0.8,
                                type: "solid"
                            }
                        }, //网格显示
                        axisTick: {
                            //X轴刻度线
                            show: false
                        },

                        // x轴底部一条线颜色
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#2E4162"
                            }
                        },
                        axisLabel: {
                            //y轴数字
                            show: true,
                            textStyle: {
                                show: true,

                                color: "#CCCCCC"
                            }
                        }
                    },
                    yAxis: {
                        type: "category",

                        show: true,
                        boundaryGap: true,
                        axisLabel: {
                            //y轴数字
                            show: true,
                            textStyle: {
                                show: true,

                                color: "#CCCCCC"
                            }
                        },

                        axisTick: {
                            //y轴刻度线
                            show: false
                        },
                        //y轴一条线颜色
                        axisLine: {
                            lineStyle: {
                                color: "#335971",
                                width: 0.8
                                // "type": "dashed"
                            },
                            show: true
                        },
                        // // x轴多条横线颜色
                        splitLine: {
                            show: true,
                            lineStyle: {
                                width: 0.2,
                                color: "#335971",
                                type: "dashed"
                            }
                        },

                        data: ["工程", "软件", "旅游", "工商", "土建"]
                    },
                    series: [{
                            name: "转发",
                            type: "bar",
                            stack: "total",
                            barWidth: 22, //柱状图宽度
                            label: {
                                show: true
                            },
                            itemStyle: {
                                //柱状图上方显示数值
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside",
                                        textStyle: {
                                            //数值样式
                                            color: "#CCCCCC",
                                            fontSize: 14
                                        }
                                    }
                                }
                            },
                            emphasis: {
                                focus: "series"
                            },
                            data: [320, 302, 301, 334, 390, 330, 320]
                        },
                        {
                            name: "接收",
                            type: "bar",
                            stack: "total",
                            label: {
                                show: true
                            },
                            itemStyle: {
                                //柱状图上方显示数值
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "inside",
                                        textStyle: {
                                            //数值样式
                                            color: "#CCCCCC",
                                            fontSize: 14
                                        }
                                    }
                                }
                            },
                            emphasis: {
                                focus: "series"
                            },
                            data: [120, 132, 101, 134, 90, 230, 210]
                        }
                    ]
                });
            },
            taskProgressChart() {
                const chart = this.$echarts.init(document.getElementById("taskProgressChart"));
                var data = [100, 200, 250, 400, 500];
                var barWidth = 17;
                var calcmaxNum = 0;
                for (var i = 0; i < data.length; i++) {
                    if (data[i] > calcmaxNum) {
                        calcmaxNum = data[i];
                    }
                }
                // 监听屏幕变化自动缩放图表
                window.addEventListener("resize", function() {
                    chart.resize();
                });

                chart.setOption({
                    grid: {
                        top: 30,
                        left: 10,
                        right: 60,
                        bottom: 10,
                        containLabel: true,
                    },
                    //     tooltip: {
                    //     backgroundColor: "rgba(0, 0, 0, 0.7)", //设置背景颜色
                    //     textStyle: {
                    //         color: "white" //设置文字颜色
                    //     },
                    //     borderWidth: "0",
                    //     trigger: "item",
                    //     axisPointer: {
                    //         // Use axis to trigger tooltip
                    //         type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
                    //     }
                    // },

                    xAxis: {
                        show: false,
                    },
                    yAxis: {
                        data: ["土建学院1", "土建学院2", "土建学院3", "土建学院4", "土建学院5"],
                        splitLine: {
                            show: false,
                        },
                        axisLabel: {
                            textStyle: { fontSize: '14', color: '#cccccc' },
                        },
                        axisLine: {
                            show: false,
                        },
                        axisTick: false,
                    },
                    series: [{
                            type: 'bar',
                            barWidth: barWidth,
                            zlevel: 2,
                            data: data.map(function(item) {
                                return {
                                    value: item,
                                    maxNum: calcmaxNum,
                                };
                            }),
                            label: {
                                show: true,
                                position: 'inside',
                                // distance: 80,
                                align: 'center',
                                formatter: function(params) {
                                    return params.data.realValue;

                                    // var percent = Number((params.data.value / params.data.calcmaxNum) * 100).toFixed(2) + '%';
                                    // return percent;
                                },
                                color: '#fff',
                                fontSize: 12,
                            },
                            itemStyle: {
                                borderRadius: 18,
                                color: '#666EE8',
                            },
                        },
                        {
                            type: 'bar',
                            barWidth: barWidth,
                            barGap: '-100%',
                            data: data.map(function(item) {
                                return {
                                    realValue: item,
                                    value: calcmaxNum,
                                };
                            }),
                            label: {
                                show: true,
                                position: 'right',
                                distance: 50,
                                align: 'right',
                                formatter: function(params) {
                                    console.log("55params", params)
                                    var percent = Math.round((params.data.realValue / params.data.value) * 100) + '%';
                                    return percent;
                                    // return params.data.realValue;
                                    // return params.data.realValue + ' 件';
                                },
                                color: '#0272fc',
                                fontSize: 14,
                            },
                            itemStyle: {
                                borderRadius: 18,
                                color: '#1E3257',
                            },
                        },
                    ],
                })
            },
            setItemText(item) {
                return () => {
                    // return "计划： " + row.planNum + "，完成： " + row.completeNum;

                    // return "进度条为40%";
                    return item.completeNum;
                };
            },
            //中间雷达图
            tradarChart() {
                const chart = this.$echarts.init(document.getElementById("tradarChart"));
                // 监听屏幕变化自动缩放图表
                window.addEventListener("resize", function() {
                    chart.resize();
                });
                chart.setOption({
                    // 图表的位置
                    grid: {
                        position: "center"
                    },

                    tooltip: {
                        //雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip
                        confine: true,
                        enterable: true, //鼠标是否可以移动到tooltip区域内
                        backgroundColor: "rgba(0, 0, 0, 0.6)", //设置背景颜色
                        textStyle: {
                            color: "white" //设置文字颜色
                        },
                        borderWidth: "0",
                        trigger: "item",
                        axisPointer: {
                            // Use axis to trigger tooltip
                            type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
                        }
                    },
                    radar: {
                        shape: "circle",
                        splitNumber: 3, // 雷达图圈数设置
                        name: {
                            textStyle: {
                                fontWeight: 800,
                                fontSize: 16,
                                padding: [5, 25], // 控制文字padding

                                color: "#4C6EB8" //雷达圈外文字
                            }
                        },
                        // 设置雷达图中间射线的颜色
                        axisLine: {
                            lineStyle: {
                                color: "#4953AD"
                            }
                        },
                        indicator: [{
                                name: "健康状态",
                                max: 30,
                                //若将此属性放在radar下，则每条indicator都会显示圈上的数值，放在这儿，只在通信这条indicator上显示
                                axisLabel: {
                                    show: false,
                                    fontSize: 12,
                                    color: "#838D9E",
                                    showMaxLabel: true, //不显示最大值，即外圈不显示数字30
                                    showMinLabel: false //显示最小数字，即中心点显示0
                                }
                            },
                            { name: "学生就业", max: 50 },
                            { name: "武装部", max: 40 },
                            { name: "宿舍管理", max: 40 },
                            { name: "工作服", max: 30 },
                            { name: "卫生管理", max: 20 },
                            { name: "学风管理", max: 20 },
                            { name: "思想政治", max: 20 },
                            { name: "安全管控", max: 40 }
                        ],
                        //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
                        splitArea: {
                            show: false,
                            areaStyle: {
                                color: "rgba(255,0,0,0)" // 图表背景的颜色
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                width: 1,
                                color: "#4953AD" // 设置网格的颜色
                            }
                        }
                    },
                    series: [{
                        name: "雷达图", // tooltip中的标题
                        type: "radar", //表示是雷达图
                        symbol: "circle", // 拐点的样式，还可以取值'rect','angle'等
                        symbolSize: 0, // 拐点的大小

                        areaStyle: {
                            normal: {
                                width: 1,
                                opacity: 0.25 //雷达里面透明度
                            }
                        },
                        data: [{
                            value: [17, 24, 27, 29, 26, 16, 13, 17, 25, 12],
                            name: "数据",

                            // 设置区域边框和区域的颜色
                            itemStyle: {
                                normal: {
                                    color: "#666EE8",
                                    lineStyle: {
                                        color: "rgba(255,225,0,.3)"
                                    }
                                }
                            }
                        }]
                    }]
                });
            },
            //右边图表
            totalityChart() {
                const chart = this.$echarts.init(document.getElementById("totalityChart"));
                // 监听屏幕变化自动缩放图表
                window.addEventListener("resize", function() {
                    chart.resize();
                });
                chart.setOption({
                    color: ["#FF00C9", "#69F0FF", "#50B9F6"],

                    tooltip: {
                        backgroundColor: "rgba(0, 0, 0, 0.7)", //设置背景颜色
                        textStyle: {
                            color: "white" //设置文字颜色
                        },
                        borderWidth: "0",
                        trigger: "item",
                        axisPointer: {
                            // Use axis to trigger tooltip
                            type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
                        },
                        //  formatter:'{c}%'　　　　//这是关键，在需要的地方加上就行
                    },

                    legend: {
                        itemHeight: 10,
                        itemWidth: 10,
                        //orient: 'vertical',
                        // right: "30%",
                        position: 'inside',
                        bottom: 0,
                        radius: 100,
                        radiusAxisIndex: 100,
                        radiusAxis: 100,
                        borderRadius: 100,
                        // 			bottom: 30,
                        // left: 'left',


                        icon: "circle",
                        textStyle: {
                            //图例文字的样式
                            color: "#FFFFFF",
                            fontSize: 14
                        }
                    },
                    grid: {
                        top: 15,
                        left: 10,
                        right: 20,
                        bottom: 30,
                        containLabel: true
                    },
                    xAxis: {
                        type: "value",
                        show: false
                    },
                    yAxis: {
                        type: "category",
                        show: false,
                        data: ["情况"]
                    },
                    series: [{
                            name: "超时",
                            type: "bar",
                            stack: "total",
                            label: {
                                show: true
                            },

                            itemStyle: {
                                //柱状图上方显示数值
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "bottom",
                                        formatter: "{c}%", //百分比显示
                                        textStyle: {
                                            //数值样式
                                            color: "#FFFFFF",
                                            fontSize: 14
                                        }
                                    }
                                }
                            },
                            emphasis: {
                                focus: "series"
                            },
                            data: [40]
                        },
                        {
                            name: "进行中",
                            type: "bar",
                            stack: "total",
                            label: {
                                show: true
                            },
                            itemStyle: {
                                //柱状图上方显示数值
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "bottom",
                                        formatter: "{c}%", //百分比显示
                                        textStyle: {
                                            //数值样式
                                            color: "#FFFFFF",
                                            fontSize: 14
                                        }
                                    }
                                }
                            },
                            emphasis: {
                                focus: "series"
                            },
                            data: [20]
                        },
                        {
                            name: "完成",
                            type: "bar",
                            stack: "total",
                            label: {
                                show: true
                            },
                            itemStyle: {
                                //柱状图上方显示数值
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: "bottom",
                                        formatter: "{c}%", //百分比显示
                                        textStyle: {
                                            //数值样式
                                            color: "#FFFFFF",
                                            fontSize: 14
                                        }
                                    }
                                }
                            },
                            emphasis: {
                                focus: "series"
                            },
                            data: [80]
                        }
                    ]
                });
            },
            classifyChart() {
                const chart = this.$echarts.init(document.getElementById("classifyChart"));
                // 监听屏幕变化自动缩放图表
                window.addEventListener("resize", function() {
                    chart.resize();
                });
                chart.setOption({
                    tooltip: {
                        backgroundColor: "rgba(0, 0, 0, 0.7)", //设置背景颜色
                        textStyle: {
                            color: "white" //设置文字颜色
                        },
                        borderWidth: "0",
                        trigger: "item",
                        axisPointer: {
                            // Use axis to trigger tooltip
                            type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
                        }
                    },

                    legend: {
                        itemHeight: 8,
                        itemWidth: 16,
                        orient: "horizontal",

                        bottom: 10,
                        // left: 'left',
                        textStyle: {
                            //图例文字的样式
                            color: "#CCCCCC",
                            fontSize: 14
                        }
                    },
                    series: [{
                        name: "数据",
                        type: "pie",
                        radius: "55%",
                        top: 0,
                        // left: 10,
                        // right: 20,
                        bottom: 14,

                        // top: 25,
                        // 	center: ['36%', '46%'],
                        color: ["#2767E6", "#35DCE8", "#27B7F6", "#31E496", "#ECC02F"],
                        label: {
                            normal: {
                                show: true,
                                color: "#CCCCCC",
                                fontSize: 14,
                                formatter: "{b} : {d}%"
                            }
                        },
                        data: [{ value: 1048, name: "安全" }, { value: 735, name: "思政" }, { value: 580, name: "宿舍" }, { value: 484, name: "队伍" }, { value: 300, name: "卫生" }],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }]
                });
            },
            // 佐证材料
            evidenceChart() {
                const chart = this.$echarts.init(document.getElementById("evidenceChart"));
                // 监听屏幕变化自动缩放图表
                window.addEventListener("resize", function() {
                    chart.resize();
                });
                chart.setOption({
                    tooltip: {
                        backgroundColor: "rgba(0, 0, 0, 0.7)", //设置背景颜色
                        textStyle: {
                            color: "white" //设置文字颜色
                        },
                        borderWidth: "0",
                        trigger: "item",
                        axisPointer: {
                            // Use axis to trigger tooltip
                            type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
                        }
                    },

                    legend: {
                        itemHeight: 8,
                        itemWidth: 16,
                        orient: "horizontal",

                        bottom: 10,
                        // left: 'left',
                        textStyle: {
                            //图例文字的样式
                            color: "#CCCCCC",
                            fontSize: 14
                        }
                    },
                    series: [{
                        name: "数据",
                        type: "pie",
                        radius: "55%",
                        top: 0,
                        // left: 10,
                        // right: 20,
                        bottom: 14,

                        // top: 25,
                        // 	center: ['36%', '46%'],
                        color: ["#2767E6", "#35DCE8", "#27B7F6", "#31E496", "#ECC02F"],
                        label: {
                            normal: {
                                show: true,
                                color: "#CCCCCC",
                                fontSize: 14,
                                formatter: "{b} : {d}%"
                            }
                        },
                        data: [{ value: 1048, name: "安全" }, { value: 735, name: "思政" }, { value: 580, name: "宿舍" }, { value: 484, name: "队伍" }, { value: 300, name: "卫生" }],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }]
                });
            },

            // 检查浏览器是否支持全屏
            examineFullScreen() {
                this.canFullScreen = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
                if (document.webkitFullscreenEnabled) {
                    this.browserKernel = "webkit";
                } else if (document.mozFullScreenEnabled) {
                    this.browserKernel = "gecko";
                } else if (document.msFullscreenEnabled) {
                    this.browserKernel = "trident";
                } else if (document.fullscreenEnabled) {
                    this.browserKernel = "others";
                }
                if (this.canFullScreen) {
                    this.addFullScreenListener();
                }
            },
            //全屏设置
            toggleFullScreen() {
                console.log("bbbbbb");
                if (this.canFullScreen) {
                    if (this.isFullScreen) {
                        // 关闭全屏
                        this.exitFullScreen();
                        this.isFullScreen = false;
                    } else {
                        // 打开全屏
                        this.requestFullScreen(document.body);
                        this.isFullScreen = true;
                    }
                } else {
                    this.$message({
                        type: "warning",
                        message: "当前浏览器暂不支持全屏模式，请切换浏览器后重新尝试！"
                    });
                }
            },
            requestFullScreen(element) {
                // 判断各种浏览器，找到正确的方法
                const requestMethod =
                    element.requestFullScreen || // W3C
                    element.webkitRequestFullScreen || // Chrome, safari
                    element.mozRequestFullScreen || // FireFox
                    element.msRequestFullscreen; // IE11
                if (requestMethod) {
                    requestMethod.call(element);
                }
            },
            exitFullScreen() {
                var exitMethod =
                    document.exitFullscreen || // W3C
                    document.mozCancelFullScreen || // FireFox
                    document.webkitExitFullscreen || // Chrome等
                    document.msExitFullscreen; // IE11
                if (exitMethod) {
                    exitMethod.call(document);
                }
            },
            addFullScreenListener() {
                const self = this;
                document.onkeydown = function(e) {
                    if (e && e.keyCode === 122) {
                        // 捕捉F11键盘动作
                        e.preventDefault(); // 阻止F11默认动作
                        self.toggleFullScreen();
                    }
                };
                // 监听不同浏览器的全屏事件，并件执行相应的代码
                switch (self.browserKernel) {
                    case "webkit":
                        document.onwebkitfullscreenchange = function() {
                            if (document.webkitIsFullScreen) {
                                self.isFullScreen = true;
                            } else {
                                self.isFullScreen = false;
                            }
                        };
                        break;
                    case "gecko":
                        document.onmozfullscreenchange = function() {
                            if (document.mozFullScreen) {
                                self.isFullScreen = true;
                            } else {
                                self.isFullScreen = false;
                            }
                        };
                        break;
                    case "trident":
                        document.onmsfullscreenchange = function() {
                            if (document.msFullscreenElement) {
                                self.isFullScreen = true;
                            } else {
                                self.isFullScreen = false;
                            }
                        };
                        break;
                    case "others":
                        document.onfullscreenchange = function() {
                            if (document.fullscreen) {
                                self.isFullScreen = true;
                            } else {
                                self.isFullScreen = false;
                            }
                        };
                        break;
                    default:
                        break;
                }
            },
            exit() {
                this.$confirm("确定退出登录吗?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                        localStorage.removeItem("access_token");
                        this.$router.push("/Login");
                    })
                    .catch(() => {
                        // this.$message({
                        //   type: 'info',
                        //   message: '已取消删除'
                        // });
                    });

            }
        },
        destroyed() {
            // 销毁页面时移除监听
            document.onkeydown = null;
            switch (this.browserKernel) {
                case "webkit":
                    document.onwebkitfullscreenchange = null;
                    break;
                case "gecko":
                    document.onmozfullscreenchange = null;
                    break;
                case "trident":
                    document.onmsfullscreenchange = null;
                    break;
                case "others":
                    document.onfullscreenchange = null;
                    break;
                default:
                    break;
            }
        }
    };
</script>

<style lang="less" scoped>
    .index {
        display: flex;
        padding: 30px;
        background: #031a44;
        .lf,
        .rg {
            width: 25%;
        }
        .lf {
            .termitem {
                position: relative;
                .item {
                    text-align: center;
                    color: #ff7219;
                    font-size: 14px;
                    width: 80px;
                    height: 40px;
                    line-height: 40px;
                    border-radius: 4px;
                    display: inline-block;
                    position: relative;
                    cursor: pointer;
                }
                .on {
                    background-color: #ff7219;
                    color: #ffffff;
                }
            }
        }
        .center {
            width: 50%;
            padding: 0 30px;
            position: relative;
            .title {
                font-weight: 400;
                display: flex;
                color: #ff7219;
                text-align: center; // background:url("../../static/images/titlelf.png") 0px 0px no-repeat, url("../../static/images/titlerg.png") 100% 100%  no-repeat;
                .tiplf,
                .tiprg {
                    width: 98px;
                    display: inline-block;
                    height: 104px;
                }
                .tiplf {
                    background: url("../../static/images/titlelf.png") left center no-repeat;
                }
                h1 {
                    font-size: 32px;
                    border-top: 1px solid #ff7219;
                    border-bottom: 1px solid #ff7219;
                    flex: 1;
                    height: 104px;
                    padding-top: 24px;
                    margin: 0 20px;
                }
                .tiprg {
                    background: url("../../static/images/titlerg.png") right center no-repeat;
                }
            }
            @-webkit-keyframes rotationframes {
                from {
                    transform: scale(0.74) rotate(0deg);
                }
                to {
                    transform: scale(0.74) rotate(360deg);
                }
            }
            .ball {
                // overflow: hidden;
                // position: absolute;
                // top: 130px;left:80px;
                //    height: 100%;
                overflow: hidden;
                position: absolute;
                top: 48px;
                left: -12px;
                height: 93%;
                width: 100%;
                .imgs {
                    transform: scale(0.74) rotate(360deg);
                    -webkit-transform: scale(0.74) rotate(360deg);
                    animation: rotationframes 100s linear infinite;
                    -webkit-animation: rotationframes 100s linear infinite;
                    width: 100%;
                    z-index: 0;
                }
            }
            .tradarChart {
                position: absolute;
                top: 22%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
                .chart {
                    height: 840px;
                }
            }
        }
        .rg {
            .taskuser {
                display: flex;
                height: 40px;
                justify-content: flex-end;
                .item {
                    font-size: 14px;
                    color: #ff7219;
                    margin-right: 16px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    &:last-child {
                        margin-right: 0;
                    }
                }
                .isfullico {
                    display: inline-block;
                    width: 28px;
                    height: 28px;
                }
                .aim {
                    background: url("../../static/images/aim.png") center no-repeat;
                    background-size: 28px 28px;
                }
                .screen {
                    background: url("../../static/images/screen.png") center no-repeat;
                    background-size: 28px 28px;
                }
                .exitico {
                    background: url("../../static/images/exit.png") center no-repeat;
                    background-size: 28px 28px;
                    margin-right: 4px;
                }
            } //  <div class="taskuser" @click="toggleFullScreen">
            //     <el-tooltip class="item" effect="dark" :content="isFullScreen ? '退出全屏':'全屏'" placement="bottom" >
            //       <i :class="isFullScreen ? 'aim':' screen'" class="isfullico"></i>
            //     </el-tooltip>
            //   </div>
        }
    }

    .taskchart {
        width: 100%;
        height: 260px;
    }

    .totality {
        display: flex;
        align-items: center;
        .totalitychart {
            width: 100%;
            height: 90px;
        }
    }

    .task {
        border: 1px solid #ff7219;
        border-top: 0px;
        border-radius: 4px;
        margin-top: 20px; // background:url("../../static/images/toptip.png") -1px -1px no-repeat, url("../../static/images/bottomtip.png") 101% 100.9% no-repeat;
        // background: url("../../static/images/bottomtip.png") 101% 100.9% no-repeat;
        border-bottom-right-radius: 17px;
        position: relative;
        z-index: 1;
        &::after {
            content: " ";
            height: 30px;
            display: inline-block;
            width: 42px;
            background: url(../../static/images/bottomtip.png) 100% 100% no-repeat;
            position: absolute;
            right: -3px;
            bottom: -3px;
        }
        .taskitem {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            .txt {
                flex: 1;
                font-size: 14px;
                color: #4c6eb8;
                cursor: pointer;
                line-height: 40px;
                padding: 0 10px 0 37px;
                display: inline-block;
                border-top: 1px solid #ff7219;
                border-bottom: 0;
                text-align: left;
                height: 32px;
                line-height: 32px;
                margin-top: -5px;
                position: relative;
                &::after {
                    content: " ";
                    height: 0px;
                    border-bottom: 1px solid #ff7219;
                    display: inline-block;
                    width: calc(100% - 19px);
                    position: absolute;
                    right: 0px;
                    bottom: 0px;
                }
                &:nth-child(1) {
                    padding: 0 10px 0 0px;
                    font-size: 16px;
                    width: 136px;
                    background: url("../../static/images/toptip.png") -1px -1px no-repeat;
                    border-bottom: 0px;
                    line-height: 45px;
                    height: 45px;
                    text-align: center;
                    border-top-left-radius: 14px;
                    margin-left: -1px;
                    margin-top: -5px;
                    position: relative;
                    flex: initial;
                    &::after {
                        content: " ";
                        height: 1px;
                        border: 1px solid #ff7219;
                        display: inline-block;
                        width: 42px;
                        transform: rotate(125deg);
                        -o-transform: rotate(125deg);
                        -moz-transform: rotate(125deg);
                        -webkit-transform: rotate(59deg);
                        position: absolute;
                        right: -31px;
                        top: 17px;
                    }
                }
                &:nth-child(3) {
                    &::after {
                        width: calc(100%);
                    }
                }
            }
            .on {
                padding: 0 10px 0 0px;
                font-size: 16px;
                width: 136px;
                background: url("../../static/images/toptip.png") -1px -1px no-repeat;
                border-bottom: 0px;
                line-height: 45px;
                height: 45px;
                text-align: center;
                border-top-left-radius: 14px;
                margin-left: -1px;
                margin-top: -5px;
                position: relative;
                flex: initial;
                &::after {
                    content: " ";
                    height: 1px;
                    border: 1px solid #ff7219;
                    display: inline-block;
                    width: 42px;
                    transform: rotate(125deg);
                    -o-transform: rotate(125deg);
                    -moz-transform: rotate(125deg);
                    -webkit-transform: rotate(59deg);
                    position: absolute;
                    right: -31px;
                    top: 17px;
                }
            }
            .current {
                border-bottom: 0;
                font-weight: bold;
                color: #ff7219;
            }
        }
        .taskprogress {
            padding: 20px 0px 0px 15px;
            overflow-y: scroll;
            &::-webkit-scrollbar-thumb {
                min-height: 20px;
                background-color: #21355a;
            }
        }
        .taskprogresschart {
            padding: 0; // height: 260px;
            .progress {
                height: 260px;
            }
        }
        /deep/ .progress {
            display: flex;
            align-items: center; // margin-bottom: 20px;
            .txt {
                font-size: 14px;
                color: #cccccc;
                justify-content: space-between;
                width: 18%;
            }
            .txtnum {
                color: #0272fc;
                width: 14%;
                text-align: center;
                font-size: 14px;
            }
            .el-progress--line {
                width: 68%;
            }
            .el-progress-bar__outer {
                background-color: #1e3257;
            }
            .el-progress-bar__innerText {
                margin: 0 30px 0 12px;
            }
        }
    }
</style>