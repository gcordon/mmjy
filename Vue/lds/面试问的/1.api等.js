vue2     和  vue3  的生命周期
beforeCreate    setup   组件创建前执行
created         setup   组件创建后执行
beforeMount     onBeforeMount   组件挂载到dom节点上之前执行
mounted         onMounted       组件挂载到dom节点完成后执行
beforeUpdate    onBeforeUdpate  组件更新完成之前执行
updated         onUpdated       组件更新完成之后执行
beforeDestroy	onBeforeUnmount	组件卸载之前执行
destroyed	    onUnmounted	组件卸载完成后执行
errorCaptured	onErrorCaptured	当捕获一个来自子孙组件的异常时激活钩子函数