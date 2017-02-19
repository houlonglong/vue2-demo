var vm =new Vue({
	el:"#app",
	data:{
		productList : [],
		totalMoney:0,
		checkAllFlag:false,
		showModal:false,
		curProduct:null
		
	},
	filters:{
		formatMoney:function(val){
			return '¥ ' + val.toFixed(2)
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			 vm.cartView()
		})
	},
	methods:{
		cartView:function(){
			console.log(this.delFlag)
			var _self = this;
			this.$http.get("data/cartData.json").then(function(response){
				_self.productList = response.body.result.list
				//_self.totalMoney = response.body.result.totalMoney
			
			})
		},
		changeMoney:function(product,way){
			if(way > 0){
				product.productQuentity++
			}else{
				product.productQuentity--
				if(product.productQuentity < 1){
					product.productQuentity = 1
				}	
			}
			this.calcTotalPrice()
		},
		selectedProduct:function(item){
			if(typeof item.checked == "undefined"){
				//Vue.set(product,"checked",true);
				this.$set(item,"checked",true);
		
			}else{
				item.checked = !item.checked;
			}
			this.calcTotalPrice()
		},
		checkAll:function(){
			this.checkAllFlag = !this.checkAllFlag;
			var that = this
			if(this.checkAllFlag){
				this.productList.forEach(function(item,index){
					if(typeof item.checked == "undefined" ||item.checked == false ){
						that.$set(item,"checked",that.checkAllFlag);
						console.log()
					}
						
				})	
			}else{
				this.productList.forEach(function(item,index){
					item.checked = false
				})	
			}
			that.calcTotalPrice()
		},
		deselectAll:function(Flag){
			this.checkAllFlag = Flag;
			var that = this;
			this.productList.forEach(function(item,index){
					if(typeof item.checked == "undefined" ||item.checked == false ){
						that.$set(item,"checked",that.checkAllFlag);
					}else{
						item.checked = that.checkAllFlag
					}
				})
			this.calcTotalPrice()	
		},
		calcTotalPrice:function(){
			var that = this;
			that.totalMoney = 0
			this.productList.forEach(function(item,index){
				if(item.checked){
					that.totalMoney += item.productPrice * item.productQuentity
				}
			})
		},
		delProduct:function(){
			var index =   this.productList.indexOf(this.curProduct)
			this.productList.splice(index,1);
			this.showModal = false;
		},
		delConfirm:function(item){
			this.showModal = true;
			this.curProduct = item;
			
		}
			
	}
})
