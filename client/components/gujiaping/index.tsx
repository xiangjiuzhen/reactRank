import React from "react";
import '../../style/gujiaping.css'
interface propsParams{
    width?:string
    height?:string
    bg?:string
}
export const GuComponent:React.FC<propsParams> = (props:propsParams)=>{
    let width = props.width? props.width:'100px'
    let height = props.height? props.height:'100px'
    let bg = props.bg? props.bg:'#ccc'
    return (
        <div className="stx-skeleton shan" style={{'width':width,'height':height}}>
            <div className="block" style={{'backgroundColor':'#002300'}}>
                1234567
            </div>
        </div>
    )
}
{/* <template>
  <div class="xtx-skeleton shan" :style="{width:width,height:height}">
    <!-- 1 盒子-->
    <div class="block" :style="{backgroundColor:bg}"></div>
    <!-- 2 闪效果 xtx-skeleton 伪元素 --->
  </div>
</template>
<script>
export default {
  name: 'XtxSkeleton',
  props: {   // 自定义的属性用props接收
    width: { type: String, default: '100px' },
    height: { type: String, default: '100px' },
    bg: { type: String, default: '#ccc' }
  }
}
</script>
<style scoped lang="less">
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
.shan {
  &::after {
    content: "";
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
</style> */}