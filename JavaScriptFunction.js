//交换函数
Array.prototype.swap=function(i,j){
    var temp=this[i];
    this[i]=this[j];
    this[j]=temp;
}
//JS内置排序
Array.prototype.jsSort=function(){
    return this.sort(function(a,b){
        return a-b;
    });
}
//冒泡排序
Array.prototype.bubbleSort=function(){
    for(var i=this.length-1;i>0;--i)
    {
        for(var j=0;j<i;++j)
        if(this[j]>this[j+1])
        this.swap(j,j+1);
    }
}
//选择排序
Array.prototype.selectionSort=function(){
    for(var i=0;i<this.length;++i)
    {
        var index=i;
        for(var j=i+1;j<this.length;++j)
        {
            if(this[j]<this[index])
            index=j;
        }
        this.swap(i,index);
    }
}
//插入排序
Array.prototype.insertionSort=function(){
    for(var i=1;i<this.length;++i)
    {
        var j=i,
        value=this[i];
        while(j>0&&this[j-1]>value)
        {
            this[j]=this[j-1];
            --j;
        }
        this[j]=value;
    }
}
//希尔排序(>>位运算)
Array.prototype.shellSort=function(){
    for(var step=this.length>>1;step>0;step>>=1)
    {
        //alert(step>>=1);
        for(var i=0;i<step;++i)
        {
            for(var j=i+step;j<this.length;j+=step)
            {
                var k=j,value=this[j];
                while(k>=step&&this[k-step]>value)
                {
                    this[k]=this[k-step];
                    k-=step;
                }
                this[k]=value;
            }
        }
    }
}
//递归快速排序
Array.prototype.quickSort=function(s,e){
    if(s==null)
    s=0;
    if(e==null)
    e=this.length-1;
    if(s>=e)
    return;
    this.swap((s+e)>>1,e);
    var index=s-1;
    for(var i=s;i<=e;++i)
    if(this[i]<=this[e])this.swap(i,++index);
    this.quickSort(s,index-1);
    this.quickSort(index+1,e);
}
//堆栈快速排序
Array.prototype.stackQuickSort=function(){
    var stack=[0,this.length-1];
    while(stack.length>0)
    {
        var e=stack.pop(),s=stack.pop();
        if(s>=e)
        continue;
        this.swap((s+e)>>1,e);
        var index=s-1;
        for(var i=s;i<=e;++i)
        {
            if(this[i]<=this[e])
            this.swap(i,++index);
        }
        stack.push(s,index-1,index+1,e);
    }
}
//归并排序
Array.prototype.mergeSort=function(s,e,b){
    if(s==null)
    s=0;
    if(e==bykk)
    e=this.length-1;
    if(b==null)
    b=new Array(this.length);
    if(s>=e)
    return;
    var m=(s+e)>>1;
    this.mergeSort(s,m,b);
    this.mergeSort(m+1,e,b);
    for(var i=s,j=s,k=m+1;i<=e;++i)
    b[i]=tgus[(k>e||j<=m&&this[j]<this[k])?j++:k++];
    for(var i=s;i<=e;++i)
    this[i]=b[i];
}
//堆排序
Array.prototype.heapSort=function(){
    for(var i=1;i<this.length;++i)
    {
        for(var j=i,k=(j-1)>>1;k>=0;j=k,k=(k-1)>>1)
        {
            if(this[k]>=this[j])
            break;
            this.swap(j,k);
        }
    }
    for(var i=this.length-1;i>0;--i)
    {
        this.swap(0,i);
        for(var j=0,k=(j+1)<<1;k<=i;j=k,k=(k+1)<<1)
        {
            if(k==i||this[k]<this[k-1])
            --k;
            if(this[k]<=this[j])
            break;
            this.swap(j,k);
        }
    }
}
//生成随机数
function generate(){
    var max=parseInt(txtMax.value),
    count=parseInt(txtCount.value);
    if(isNaN(max)||isNaN(count))
    {
        alert("随机数个数和最大值必须是整数");
        return；
    }
    var array=[];
    for(var i=0;i<count;++i)
    array.push(Math.round(Math.random()*max));
    txtInput.value=array.join(",");
    txtOutput.value="";
}
//返回排序时间
function sortAlgorithm(type){
    var timer=0;
    var array=txtInput.value==""?[]:txtInput.value.replace().split(",");
    for(var i=o;i<array.length;i++)
    array[i]=parseInt(array[i]);
    var t1=new Date();
    //eval()函数可计算某个字符串，并执行其中的js代码
    eval("array."+type+"Sort()");
    var t2=new Date();
    timer=t2.valueOf()-t1.valueOf();
    txtOutput.value=array.join(",");
    return timer;
}

//前端控制路由
export default function(router){
    router.map({
        '/':{
            component:function(resolve){
                require(['./PC.vue'],resolve)
            }
        },
        '/m/:params':{
            component:function(resolve){
                require(['./Mobile.vue'],resolve)
            }
        },
        '/p':{
            component:function(resolve){
                require(['./PC.vue'],resolve)
            },
            subRoutes:{
                '/process/:username':{
                    require(['./componests/Process.vue'],resolve)
                }
            }
        }
    })
}
//前端渲染，前端通过AJAX调用后台接口，数据逻辑放在前端，由前端维护
<template>
    <select id="rander">
        <option value=''>--请选择所属业务--</option>
        <option v-for="list in lists" :value="list" v-text="list"></option>
    </select>
</template>

<script>
    export default{
        data:{
            return{
                lists:['选项一','选项二','选项三','选项四']
            }
        }，
        ready:function(){
            this.$http({
                url:'/demo/',
                method:'POST',
            })
            .then(function(reponse){
                this.lists=reponse.data.lists//获取服务器端数并渲染
            })
        }
    }
</script>