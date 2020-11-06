
<template>
<section>
    <div id="qcode">
        <div class="contant" style="width: 720px;margin: 0 auto;" id="print_div" ref="print">
            <div class="cont_item1" style="margin-top: 30px;">
                <h1 style="margin: 0 auto;
		            display: flex;
		            justify-content: space-between;
		            width: 150px;
		            border-bottom: 3px solid black;
		            padding: 0 25px;">
                    <span>收</span>
                    <span>据</span>
                </h1>
            </div>
            <div class="cont_item2" style="display: flex;justify-content: flex-end; margin-top: 30px;">
                <div class="cont_item2_li1" style="margin-right: 0px;">
                    <span style="        display: inline-block;
		                margin: 0 5px;">入账时间：</span>
                    <span style="        display: inline-block;
		                margin: 0 5px;">{{printInfor.year }}</span>
                    <span style="        display: inline-block;
		                margin: 0 5px;">年</span>
                    <span style="        display: inline-block;
		                margin: 0 5px;">{{printInfor.month }}</span>
                    <span style="        display: inline-block;
		                margin: 0 5px;">月</span>
                    <span style="        display: inline-block;
		                margin: 0 5px;">{{printInfor.day }}</span>
                    <span style="        display: inline-block;
		                margin: 0 5px;">日</span>
                </div>
                <div class="cont_item2_li2" style="        margin-right: 30px;
		            width: 240px;
		            text-align: right;">
                    <span>{{printInfor.number }}</span>
                </div>
            </div>
            <div class="cont_item3" style="        border: 2px solid black;
		        padding: 14px 14px;
		        margin-top: 10px;">
                <div class="cont_item3_li" style="        height: 42px;
		            display: flex;
		            align-items: center;">
                    <div class="title" style="margin-right: 10px;
		                min-width: 112px;
		                display: flex;
		                justify-content: flex-end;height: 42px;
		        display: flex;
		        align-items: center;">交 款 单 位：</div>
                    <div class="cont_infor border_bottom" style="        border-bottom: 2px solid black;
		                box-sizing: border-box;height: 42px;
		        display: flex;
		        align-items: center;flex: 1;">
                        <span class="margin_right" style="margin-right: 20px;">{{printInfor.paymentUnit }}</span>
                        <span class="margin_right" style="margin-right: 20px;"></span>
                    </div>
                    <div class="cont_item3_li_div" style="        height: 42px;
		                display: flex;
		                align-items: center;display: flex;
		        width: 200px;">
                        <p style="margin-left:10px;">
                            收款方式
                        </p>
                        <p class="get_type" style="        flex: 1;
		                    text-align: center;">
                            转账
                        </p>
                    </div>
                </div>
                <div class="cont_item3_li" style="        height: 42px;
		            display: flex;
		            align-items: center;">
                    <div class="title" style="margin-right: 10px;
		                min-width: 112px;
		                display: flex;
		                justify-content: flex-end;        height: 42px;
		        display: flex;
		        align-items: center;">人民币（大写）</div>
                    <div class="cont_infor border_bottom" style="        border-bottom: 2px solid black;
		                box-sizing: border-box;        height: 42px;
		        display: flex;
		        align-items: center;flex: 1;">
                        <span class="margin_right" style="margin-right: 20px;">{{printInfor.moneyUpper }}</span>
                    </div>
                    <div class="cont_item3_li_div" style="        height: 42px;
		                display: flex;
		                align-items: center;display: flex;
		        width: 200px;">
                        <p>
                            ￥：
                        </p>
                        <p class="money" style="margin-left:10px;        background: rgba(130, 123, 139, 0.5);
		                    height: 100%;
		                    flex: 1;
		                    line-height: 42px;
		                    padding-left: 2px;">
                            {{printInfor.money }}
                        </p>
                    </div>
                </div>
                <div class="cont_item3_li" style="        height: 42px;
		            display: flex;
		            align-items: center;">
                    <div class="title" style="margin-right: 10px;
		                min-width: 112px;
		                display: flex;
		                justify-content: flex-end;        height: 42px;
		        display: flex;
		        align-items: center;">收 款 事 由：</div>
                    <div class="cont_infor border_bottom" style="        border-bottom: 2px solid black;
		                box-sizing: border-box;        height: 42px;
		        display: flex;
		        align-items: center;flex: 1;">
                        <span class="margin_right" style="margin-right: 20px;">{{printInfor.options }}</span>
                    </div>
                </div>
                <div class="cont_item3_li cont_item3_li_bottom" style="        height: 42px;
		            display: flex;
		            align-items: center;justify-content: flex-end;">
                    <span style="        display: inline-block;
		                margin: 0 5px;">入账时间：</span>
                    <span style="        display: inline-block;
		                margin: 0 5px;">{{printInfor.year }}</span>
                    <span style="        display: inline-block;
		                margin: 0 5px;">年</span>
                    <span style="        display: inline-block;
		                margin: 0 5px;">{{printInfor.month }}</span>
                    <span style="        display: inline-block;
		                margin: 0 5px;">月</span>
                    <span style="        display: inline-block;
		                margin: 0 5px;">{{printInfor.day }}</span>
                    <span style="        display: inline-block;
		                margin: 0 5px;">日</span>
                </div>
            </div>
            <div class="cont_bottom" style="        display: flex;
		        margin-top: 10px;
		        justify-content: space-between;
		        margin-left: 12px;">
                <div class="title" style="margin-right: 10px;
		            min-width: 112px;
		            display: flex;
		            justify-content: flex-end;">单 位 盖 章：</div>
                <div>
                    <span style="        display: inline-block;
		                margin-right: 54px;">记账：张亚妮</span>
                    <span style="        display: inline-block;
		                margin-right: 54px;">收纳：贾燕飞</span>
                    <span style="        display: inline-block;
		                margin-right: 54px;">经办：</span>
                </div>

            </div>
        </div>
        <div id="btn_container" align="center" style="margin-top:20px;">
            <input type="button" id="print_btn" class="button" value="打印收据" @click="printContext" /> &nbsp;
            <input type="button" id="back_btn" value="返回" @click="goBack" />
        </div>
    </div>
</section>
</template>

<script>
export default {
    data(){
        return{
            printInfor:this.$route.query.printInfor
        }
    },
    methods:{
        printContext () {
            this.$print(this.$refs.print)
        },
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>

<style>

</style>
